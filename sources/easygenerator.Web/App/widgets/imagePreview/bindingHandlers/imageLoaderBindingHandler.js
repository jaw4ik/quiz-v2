﻿define(['durandal/composition'], function (composition) {
    var image = new Image();
    image.className = 'image';
    image.style.display = 'none';
    image.style.width = 'auto'; //Fix for IE
    image.style.height = 'auto';
    ko.bindingHandlers.imageLoader = {
        init: function (element, valueAccessor) {
            var $element = $(element),
                data = valueAccessor() || {},
                isLoaded = data.isLoaded,
                useParentSize = data.useParentSize;

            var resizeHandler = $(window).on('resize', function () {
                if (isLoaded()) {
                    updatePreviewImageSize($element, useParentSize);
                }
            });

            var orientationChangeHandler = $(window).on("orientationchange", function () {
                if (isLoaded()) {
                    updatePreviewImageSize($element, useParentSize);
                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(window).unbind('resize', resizeHandler);
                $(window).unbind('orientationchange', orientationChangeHandler);
            });

            $element.append(image);
        },
        update: function (element, valueAccessor) {
            var $element = $(element),
                data = valueAccessor() || {},
                isLoaded = data.isLoaded,
                imageUrl = data.imageUrl(),
                useParentSize = data.useParentSize;

            $(image).hide();
            isLoaded(false);

            var browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            if (useParentSize) {
                browserWidth = Math.max($element.width() || 0);
                browserHeight = Math.max($element.height() || 0);
            }

            
            var maxSize = browserWidth > browserHeight ? browserWidth : browserHeight;
            var resizedImageUrl = imageUrl + '?height=' + maxSize + '&width=' + maxSize;
            image.onload = function () {
                if (data.imageUrl() === imageUrl) {
                    updatePreviewImageSize($element, useParentSize);
                    isLoaded(true);
                    $(image).fadeIn();
                }
            }
            image.src = resizedImageUrl;
        }
    }

    function updatePreviewImageSize($element, useParentSize) {
        var browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 46; // 46 - padding for close button
        var browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 46;

        if (useParentSize) {
            browserWidth = Math.max($element.width() || 0);
            browserHeight = Math.max($element.height() || 0);
        }

        $('.image', $element).css('maxWidth', browserWidth - 46 + 'px').css('maxHeight', browserHeight - 46 + 'px');
    }

    composition.addBindingHandler('imageLoader');
});
