/*
* Embed Media Dialog based on http://www.fluidbyte.net/embed-youtube-vimeo-etc-into-ckeditor
*
* Plugin name:      mediaembed
* Menu button name: MediaEmbed
*
* Youtube Editor Icon
* http://paulrobertlloyd.com/
*
* @author Fabian Vogelsteller [frozeman.de]
* @version 0.5
*/

CKEDITOR.plugins.mediaembed = {
    
    icons: 'mediaembed', // %REMOVE_LINE_CORE%
    hidpi: true, // %REMOVE_LINE_CORE%
    
    lang: 'en',

    init: function (editor) {
        var
            me = this,
            lang = editor.lang.mediaembed;

        CKEDITOR.dialog.add('MediaEmbedDialog', function (instance) {
            return {
                title: lang.embedMedia,
                minWidth: 550,
                minHeight: 200,
                contents:
                      [
                         {
                             id: 'iframe',
                             expand: true,
                             elements: [{
                                 id: 'embedArea',
                                 type: 'textarea',
                                 label: lang.pasteEmbedCodeHere,
                                 'autofocus': 'autofocus',
                                 setup: function (element) {
                                 },
                                 commit: function (element) {
                                 }
                             }]
                         }
                      ],
                onOk: function () {
                    var div = instance.document.createElement('div');
                    div.setHtml(this.getContentElement('iframe', 'embedArea').getValue());
                    instance.insertElement(div);
                }
            };
        });

        editor.addCommand('MediaEmbed', new CKEDITOR.dialogCommand('MediaEmbedDialog',
            {
                allowedContent: 'iframe[*]',
                requiredContent: 'iframe[*]'
            }
        ));

        editor.ui.addButton('MediaEmbed',
        {
            label: lang.embedMedia,
            command: 'MediaEmbed',
            toolbar: 'mediaembed'
        });
    }
};

CKEDITOR.plugins.add('mediaembed', CKEDITOR.plugins.mediaembed);
