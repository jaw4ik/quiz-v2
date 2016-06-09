﻿import ko from 'knockout';
import _ from 'underscore';

import router from 'routing/router';
import notify from 'notify';
import courseRepository from 'repositories/courseRepository';
import localizationManager from 'localization/localizationManager';
import waiter from 'utils/waiter';
import TemplateBrief from './templateBrief';
import constants from 'constants';
import app from 'durandal/app';

import bus from './bus.js';

import BrandingTab from './tabs/BrandingTab';
import PresetTab from './tabs/PresetTab';
import FontsTab from './tabs/FontsTab';

import * as getCommand from './commands/getCourseTemplateSettings';
import * as saveCommand  from './commands/saveCourseTemplateSettings';

import popoverService from './popoverService.js';

import textStyleService from './textStyleService.js';

export const EVENT_PRESET_SELECTED = 'preset:selected';

let
    templateMessageTypes = {
        showSettings: 'show-settings',
        freezeEditor: 'freeze-editor',
        unfreezeEditor: 'unfreeze-editor',
        notification: 'notification'
    },

    templateSettingsLoadingTimeout = 2000,
    templateSettingsErrorNotification = localizationManager.localize('templateSettingsError'),

    delay = 100,
    limit = 100;

class Design{
    constructor() {
        this.courseId = '';
        this.previewUrl = ko.observable(null);

        this.template = ko.observable();
        this.loadingTemplate = ko.observable(false);

        this.settingsVisibility = ko.observable(false);
        this.canUnloadSettings = ko.observable(true);
        this.settingsLoadingTimeoutId = null;
        this.settingsVisibilitySubscription = null;
        this.settingsTabs = ko.observableArray([]);

        this.tab = ko.observable();
        this.settings = null;
        this.presetTab = new PresetTab();

        this.brandingTab = new BrandingTab();
        this.fontsTab = new FontsTab();

        this.subscriptions = [];
        this.popovers = popoverService.collection;
        this.textStyleElements = textStyleService.collection;

        this.currentPreset = null;
    }

    activate(courseId) {
        this.settingsVisibility(false);
        this.settingsVisibilitySubscription = this.settingsVisibility.subscribe(() => {
            if (this.settingsLoadingTimeoutId) {
                clearTimeout(this.settingsLoadingTimeoutId);
                this.settingsLoadingTimeoutId = null;
            }
        });
        
        return courseRepository.getById(courseId).then(course => {
            this.courseId = course.id;
            this.previewUrl('/preview/' + courseId);

            this.template(new TemplateBrief(course.template));

            this.subscriptions.push(app.on(constants.messages.course.templateUpdated + courseId).then(template => this.templateUpdated(template)));
            this.subscriptions.push(app.on(constants.messages.course.templateUpdatedByCollaborator).then(course => this.templateUpdatedByCollaborator(course)));
            this.subscriptions.push(app.on(EVENT_PRESET_SELECTED).then(preset => this.presetSelected(preset)));
            this.subscriptions.push(bus.on('all').then(() => this.settingsChanged()));
            this.subscriptions.push(app.on('font:settings-changed').then(() => this.fontSettingsChanged()));
            this.subscriptions.push(app.on('text-color:changed').then(color => this.textColorChanged(color)));
            
            this.updateTabCollection(course.template);

            return this.loadSettings();
        }).catch(reason => {
            router.activeItem.settings.lifecycleData = { redirect: '404' };
            throw reason;
        });
    }

    canDeactivate() {
        this.settingsVisibility(false);

        return waiter.waitFor(this.canUnloadSettings, delay, limit)
            .catch(() => {
                notify.error(templateSettingsErrorNotification);
            })
            .then(() => {
                this.settingsVisibility(true);
                return true;
            });
    }

    deactivate() {
        if (this.settingsVisibilitySubscription) {
            this.settingsVisibilitySubscription.dispose();
        }

        this.subscriptions.forEach(s => s.off());
    }

    templateUpdated(template) {
        if (template.id === this.template().id) {
            return;
        }
        
        this.template().isLoading(true);
        this.loadingTemplate(true);

        return waiter.waitFor(this.canUnloadSettings, delay, limit)
            .catch(() => {
                notify.error(templateSettingsErrorNotification);
            })
            .then(() => {
                this.settingsVisibility(false);
                this.template(new TemplateBrief(template));
                this.loadingTemplate(false);
            })
            .then(() => this.loadSettings())
            .then(() =>  this.updateTabCollection(template));
    }

    templateUpdatedByCollaborator(course) {
        if (course.id !== this.courseId)
            return;

        this.templateUpdated(course.template);
    }

    onGetTemplateMessage(message) {
        if (!message || !message.type) {
            return;
        }

        switch (message.type) {
            case templateMessageTypes.showSettings:
                this.settingsVisibility(true);
                break;
            case templateMessageTypes.freezeEditor:
                this.canUnloadSettings(false);
                break;
            case templateMessageTypes.unfreezeEditor:
                this.canUnloadSettings(true);
                break;
            case templateMessageTypes.notification:
                var data = message.data;

                if (data.success) {
                    data.message ? notify.success(data.message) : notify.saved();
                    this.reloadPreview();
                } else {
                    notify.error(data.message || templateSettingsErrorNotification);
                }
                break;
        }
    }

    reloadPreview() {
        this.previewUrl.valueHasMutated();
    }

    updateTabCollection(template) {
        var collection = _.map(template.settingsUrls.design || [], tab => {
            return {
                name: tab.name,
                isSelected: ko.observable(false),
                title: localizationManager.localize(tab.name),
                url: tab.url,
                type: 'external'
            }
        });

        if (template.supports && template.supports.indexOf('fonts') > -1) {
            collection.push(this.fontsTab);
        }

        if (template.supports && template.supports.indexOf('branding') > -1) {
            collection.unshift(this.brandingTab);
        }

        if (template.presets && template.presets.length) {
            collection.unshift(this.presetTab);
        }

        collection.forEach((tab, index) => {
            if (ko.isWriteableObservable(tab.isSelected)) {
                tab.isSelected(index === 0);
            }
        });
    
        this.tab(collection[0]);
        this.settingsTabs(collection);
    }

    settingsFrameLoaded() {
        this.canUnloadSettings(true);
        this.settingsLoadingTimeoutId = _.delay(this.showSettings.bind(this), templateSettingsLoadingTimeout);
    }

    showSettings() {
        this.settingsVisibility(true);
    }

    changeTab(tab) {
        if (!tab || tab.isSelected()) {
            return;
        }

        this.tab().isSelected(false);
        
        this.tab(tab);
        this.tab().isSelected(true);

        this.settingsVisibility(false);
    }

    presetSelected(preset) {
        this.settings = _.extend({}, this.settings, preset.settings ? JSON.parse(JSON.stringify(preset.settings)) : {});
        this.currentPreset = preset;

        return this.saveSettings();
    }

    loadSettings() {
        return getCommand.getCourseTemplateSettings(this.courseId, this.template().id).then(response => {
            let preset;
            if (Array.isArray(this.template().presets)) {
                preset = _.find(this.template().presets, p => p.title && p.title === (response.extraData && response.extraData.preset));
                preset = preset || _.first(this.template().presets);
            }
            this.currentPreset = preset || null;
            this.settings = response.settings || (preset && preset.settings ? JSON.parse(JSON.stringify(preset.settings)) : {});
        });
    }

    saveSettings() {
        return saveCommand.saveCourseTemplateSettings(this.courseId, this.template().id, this.settings, { preset: this.currentPreset && this.currentPreset.title })
            .then(() => {
                notify.saved();
                this.reloadPreview();
            })
            .catch(() => notify.error());
    }

    settingsChanged() {

        this.settings = this.settings || {};
        this.settings.branding = this.settings.branding || {};

        this.settings.branding.logo = {
            url: this.brandingTab.logo.imageUrl()
        };

        let colorsInFontsTab = _.map(this.fontsTab.generalStyles.colors(), item => { 
            return {
                key: item.key, 
                value: item.value()
            }
        });

        let isChangedInFontsTab = compareArrays(colorsInFontsTab, this.settings.branding.colors);

        if(isChangedInFontsTab){
            _.each(colorsInFontsTab, item => {
                var element = _.find(this.settings.branding.colors, color =>{
                    return color.key === item.key
                });
                element.value = item.value;
            });
        };

        if(!isChangedInFontsTab && this.brandingTab.colors.colors().length){
            this.settings.branding.colors = this.brandingTab.colors.colors().map(c => {
                return {
                    key: c.key,
                    value: c.value()
                }
            });
        
            this.settings.branding.background = {
                header: {
                    brightness: this.brandingTab.background.header.brightness(),
                    color: this.brandingTab.background.header.color() ? this.brandingTab.background.header.color() : null,
                    image: this.brandingTab.background.header.image() ? {
                        url: this.brandingTab.background.header.image(),
                        option: this.brandingTab.background.header.option()
                    } : null
                },
                body: {
                    enabled: this.brandingTab.background.body.enabled(),
                    brightness: this.brandingTab.background.body.brightness(),
                    color: this.brandingTab.background.body.color() ? this.brandingTab.background.body.color() : null,
                    texture: this.brandingTab.background.body.texture() ? this.brandingTab.background.body.texture() : null
                }
            };
        };

        return this.saveSettings();
    }

    fontSettingsChanged(){
        this.settings.fonts = _.flatten([this.fontsTab.generalStyles.mainFont, this.fontsTab.contentStyles.elements()]).map(f =>{
            return {
                key: f.key,
                fontFamily: f.fontFamily ? f.fontFamily() : null,
                fontWeight: f.fontWeight ? f.fontWeight() : null,
                size: f.size ? f.size() : null,
                color: f.color ? f.color() : null,
                textBackgroundColor: f.textBackgroundColor ? f.textBackgroundColor() : null,
                fontStyle: f.fontStyle ? f.fontStyle() : null,
                textDecoration: f.textDecoration ? f.textDecoration() : null,
                isGeneralSelected: f.isGeneralSelected ? f.isGeneralSelected() : null,
                isGeneralColorSelected: f.isGeneralColorSelected ? f.isGeneralColorSelected() : null,
            }
        });

        return this.saveSettings();
    }

    textColorChanged(color){
        _.each(this.settings.fonts,f => {
            if(f.isGeneralColorSelected &&f.key != 'links'){
                f.color = color;
            }
        });
        let textColor = _.find(this.settings.branding.colors, c => {
            return c.key === '@text-color'
        });
        textColor.value = color;
        return this.saveSettings();
    }
}

function compareArrays (array1, array2){
    var arr1 = _.map(array1, function(item){
        return item.key + item.value; 
    });
    var arr2 = _.map(array2, function(item){
        return item.key + item.value; 
    });
    var res = _.intersection(arr1, arr2);
    return res.length != arr1.length;
}

export default new Design();