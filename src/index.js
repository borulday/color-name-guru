/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

var SPACE = 2
var messageKingdom = [
    "🕺 Holly dance!", 
    "💃 Holly dance!", 
    "🤩 What a name!", 
    "🎸 You rock!", 
    "🤘 You rock!", 
    "🎳 Strike!", 
    "🙌 Perfect name!", 
    "🥇 Golden medal!", 
    "🎯 Hit the Bull's eye",
    "👆 That works!",
    "🧠 Brilliant choice!"
];

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
    return '// Color Name Suggestions\n' +
           '// No need to change if name suggestion starts with an emoji';
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
        suggestion = messageKingdom[Math.floor(Math.random() * messageKingdom.length)];
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
