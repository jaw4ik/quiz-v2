﻿import $ from 'jquery';
import _ from 'underscore';

const cssClasses = {
    editorClass: 'eg-content-editor',
    column: 'column',
    row: 'row'
};
const attributeNames = {
    dataType: 'data-type',
    contentDataType: 'data-content-type'
};

export default class {
    static parse(data) {
        let $content = $(data);
        let contentType = $content.attr(attributeNames.dataType);

        let outputArray = [];
        $content.find(`.${cssClasses.column}`).each((index, column) => {
            let columnArray = [];

            $(column).find(`.${cssClasses.row}`).each((index, row) => {
                let $row = $(row);

                columnArray.push({
                    data: $row.html(),
                    type: $row.attr(attributeNames.contentDataType)
                });
            });

            outputArray.push(columnArray);
        });

        return {
            contentType,
            output: outputArray
        };
    }
    static toHtml(data, type) {
        let $output = $('<div>')
            .addClass(cssClasses.editorClass)
            .attr(attributeNames.dataType, type);

        _.each(data, column => {
            let $column = $('<div>').addClass(cssClasses.column);

            _.each(column, row => {
                let $row = $('<div>')
                    .addClass(cssClasses.row)
                    .attr(attributeNames.contentDataType, row.className)
                    .html(row.data());

                $column.append($row);
            });

            $output.append($column);
        });

        return $output.get(0).outerHTML;
    }
}