import namedColors from 'color-name-list';
import nearestColor from 'nearest-color';
import changeCase from 'change-case';

const messageKingdom = [
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

/**
 * Suggest an alternate color
 * @param {String} containerType project/styleguide type on Zeplin
 * @param {Object} color current color information
 * @returns {Object} 
 */
function alternateColor(containerType, color) {
    const colors = {};

    namedColors.forEach(namedColor => {
        colors[namedColor.name] = namedColor.hex;
    });

    const nearestColorInformation = nearestColor.from(colors);
    
    const alternateColor = nearestColorInformation({ r: color.r, g: color.g, b: color.b });
    const alternateColorName = alternateColor.name + (color.a == 1 ? "" : parseInt(color.a * 100));

    let suggestion = "";
    switch (containerType) {
        case "base":
            // TODO: Add as an option.
            suggestion = changeCase.camelCase(alternateColorName);
            break;

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

    if (suggestion.toLowerCase() == color.name.toLowerCase()) { 
        suggestion = messageKingdom[Math.floor(Math.random() * messageKingdom.length)];
    }

    return {
        current: color.name,
        suggestion: suggestion
    };
}

function getLinkedResources(container, type, resource) {
    const isProject = type === "project";
    let resources = [...container[resource]];
    let itContainer = isProject ? container.linkedStyleguide : container.parent;
    while (itContainer) {
        resources = [...resources, ...itContainer[resource]];
        itContainer = itContainer.parent;
    }

    return resources;
}

function getResources(container, type, useLinkedStyleguides, resourceKey) {
    if (useLinkedStyleguides) {
        return getLinkedResources(container, type, resourceKey);
    }

    return container[resourceKey];
}

function getResourceContainer(context) {
    if (context.styleguide) {
        return {
            container: context.styleguide,
            type: "styleguide"
        };
    }

    return {
        container: context.project,
        type: "project"
    };
}

export {
    alternateColor,
    getResources,
    getResourceContainer
};