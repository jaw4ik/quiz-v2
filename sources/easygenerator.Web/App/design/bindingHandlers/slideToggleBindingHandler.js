﻿import ko from 'knockout';
import animate from 'velocity-animate';

ko.bindingHandlers.slideToggle = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        const value = valueAccessor();
        
        const expanded = ko.unwrap(value);
        const duration = 300;

        var callback = allBindings.get('slideToggleCallback') || () => {};

        const wrapper = ko.observable(expanded);

        element.style.display = expanded ? 'block' : 'none';

        const subscription = value.subscribe(newValue => {
            if (newValue) {
                $(element).velocity("finish");
                animate(element, 'slideDown', {
                    duration: duration,
                    begin: () => wrapper(true),
                    complete: () => callback()
                });
            } else {
                $(element).velocity("finish");
                animate(element, 'slideUp', {
                    duration: duration,
                    complete: () => wrapper(false)
                });
            }
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            subscription.dispose();
        });

        return ko.bindingHandlers.if.init(element, () => wrapper, allBindings, viewModel, bindingContext);
    }
};