﻿import ko from 'knockout';

import service from './../popoverService.js';
import { Popover } from './../popoverService.js';

ko.bindingHandlers.popover  = {
    init: (element, valueAccessor) => {
        var value = valueAccessor();

        var placement = $(element).attr('data-popover-placement');

        let registration = new Popover(ko.unwrap(value), element, placement);

        let subscription = null; 
        if (ko.isObservable(value.isVisible)) {
            subscription = value.isVisible.subscribe(newValue => {
                if (newValue) {
                    service.attach(registration);
                } else {
                    service.detach(registration);
                }
            });
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            service.detach(registration);
            if (subscription) {
                subscription.dispose();
            }
        });
    }
}