/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

var SPACE = 2

import namedColors from 'color-name-list';
import nearestColor from 'nearest-color';
import changeCase from 'change-case';

function styleguideColors(context, colors) {
    var alternateColors = colors.map(function(color) {
        return alternateColor(context.project.type, color);
    });

    return {
        code: JSON.stringify(alternateColors, null, SPACE),
        language: "json"
    };
}

function comment(context, text) {
    return "// Color Name Suggestions";
}

export default {
    styleguideColors,
    comment
};

function alternateColor(projectType, color) {
    let colors = {};

    namedColors.forEach(namedColor => {
        colors[namedColor.name] = namedColor.hex;
    });

    let nearestColorInformation = nearestColor.from(colors);
    
    let alternateColor = nearestColorInformation({ r: color.r, g: color.g, b: color.b });
    let alternateColorName = alternateColor.name + (color.a == 1 ? "" : color.a * 100);

    let suggestion = "";
    if ( alternateColorName.toLowerCase() == color.name.toLowerCase() ) { 
        suggestion = "Already perfect! 🥇";
    } else {
        switch (projectType) {
            case "ios":
            case "osx":
                suggestion = changeCase.camelCase(alternateColorName);
                break;

            case "web":
                suggestion = changeCase.paramCase(alternateColorName);
                break;

            case "android":
                suggestion = changeCase.snakeCase(alternateColorName);
                break;

            default:
                suggestion = "";
        }
    }

    return {
        current: color.name,
        suggestion: suggestion
    };
}
