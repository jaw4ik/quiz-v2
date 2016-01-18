﻿import BrandingTab from './BrandingTab.js';

import Background from './sections/Backgrounds.js';
import Logo from './sections/Logo.js';
import Interface from './sections/Interface.js';

describe('Branding tab', () => {

    describe('name:', () => {

        it('should be defined', () => {
            let tab = new BrandingTab();
            expect(tab.name).toEqual('branding');
        });

    });

    describe('title:', () => {

        it('should be defined', () => {
            let tab = new BrandingTab();
            expect(tab.name).toEqual('branding');
        });

    });

    describe('type:', () => {

        it('should be \'default\'', () => {
            let tab = new BrandingTab();
            expect(tab.type).toEqual('default');
        });

    });

    describe('isSelected:', () => {

        it('should be observable', () => {
            let tab = new BrandingTab();
            expect(tab.isSelected).toBeObservable();
        });

    });

    describe('logo:', () => {

        it('should be defined', () => {
            let tab = new BrandingTab();
            expect(tab.logo).toBeInstanceOf(Logo);
        });

    });

    describe('background:', () => {

        it('should be defined', () => {
            let tab = new BrandingTab();
            expect(tab.background).toBeInstanceOf(Background);
        });

    });

    describe('colors:', () => {

        it('should be defined', () => {
            let tab = new BrandingTab();
            expect(tab.colors).toBeInstanceOf(Interface);
        });

    });

    describe('expand:', () => {

        it('should expand section', () => {
            let tab = new BrandingTab();
            tab.logo.expanded(false);
            tab.expand(tab.logo);
            expect(tab.logo.expanded()).toBeTruthy();
        });

        it('should collapse other sections', () => {
            let tab = new BrandingTab();
            tab.colors.expanded(true);
            tab.expand(tab.logo);
            expect(tab.colors.expanded()).toBeFalsy();
        });

    });

    describe('activate:', () => {

        it('should activate logo', done => {
            let tab = new BrandingTab();
            let settings = { branding: { logo: {} } };
            let defaults = { branding: { logo: {} } };

            spyOn(tab.logo, 'activate');
            
            tab.activate(settings, defaults).then(() => {
                expect(tab.logo.activate).toHaveBeenCalledWith(settings.branding.logo, defaults.branding.logo);
                done();
            });
        });

        it('should activate background', done => {
            let tab = new BrandingTab();
            let settings = { branding: { background: {} } };
            let defaults = { branding: { background: {} } };

            spyOn(tab.background, 'activate');

            tab.activate(settings, defaults).then(() => {
                expect(tab.background.activate).toHaveBeenCalledWith(settings.branding.background, defaults.branding.background);
                done();
            });
        });

        it('should activate colors', done => {
            let tab = new BrandingTab();
            let settings = { branding: { colors: {} } };
            let defaults = { branding: { colors: {} } };

            spyOn(tab.colors, 'activate');

            tab.activate(settings, defaults).then(() => {
                expect(tab.colors.activate).toHaveBeenCalledWith(settings.branding.colors, defaults.branding.colors);
                done();
            });
        });

    });

});