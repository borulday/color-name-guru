/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

 /**
  * TODOs: 
  * - Add color name presentation options (camelCase, snake_case...etc)
  * 
  */

const SPACE = 2;

import { OPTION_NAMES } from "./constants";
import { alternateColor, getResourceContainer, getResources } from "./utils";

function colors(context) {
    var useLinkedStyleguides = context.getOption(OPTION_NAMES.USE_LINKED_STYLEGUIDES);
    var { container, type } = getResourceContainer(context);
    var allColors = getResources(container, type, useLinkedStyleguides, "colors");

    const output = JSON.stringify({
        source: type,
        content: allColors.map(function(color) {
            return alternateColor(container.type, color);
        })
    }, null, SPACE);
    
    return {
        code: output,
        language: "json"
    };
}

/**
 * 
 * Deprecated Methods
 */

function styleguideColors(context, colors) {
    const alternateColors = colors.map(function(color) {
        return alternateColor(context.project.type, color);
    });

    return {
        code: JSON.stringify(alternateColors, null, SPACE),
        language: "json"
    };
}

function comment(context, text) {
    return '// Color Name Suggestions\n' +
           '// No need to change if the name suggestion starts with an emoji';
}

export default {
    colors,
    styleguideColors,
    comment
};