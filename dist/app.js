"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const showdown_1 = __importDefault(require("showdown"));
const parse5_1 = __importDefault(require("parse5"));
const design_resource_1 = __importDefault(require("./models/design-resource"));
const design_resource_category_1 = __importDefault(require("./models/design-resource-category"));
const designResourcesURL = "https://raw.githack.com/bradtraversy/design-resources-for-developers/master/readme.md";
let getMarkdownFileFromUrl = async (url) => {
    return await axios_1.default.get(url)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        console.log(error);
    });
};
let convertMarkdownToHtml = (markdown) => {
    let converter = new showdown_1.default.Converter();
    return converter.makeHtml(markdown);
};
let getHtmlBodyElementsFromMarkdown = (markdown) => {
    const html = convertMarkdownToHtml(markdown);
    const document = parse5_1.default.parse(html);
    return document.childNodes[0].childNodes[1].childNodes;
};
let getDesignResourceCategories = (bodyElements) => {
    let categories = new Array();
    for (let nodeIndex = 0; nodeIndex < bodyElements.length; nodeIndex++) {
        const element = bodyElements[nodeIndex];
        if (element.nodeName === "h2" &&
            element.attrs[0].value !== "tableofcontents") {
            categories.push(getDesignResourceCategory(element, bodyElements, nodeIndex));
        }
    }
    return categories;
};
let getDesignResourceCategory = (element, bodyElements, nodeIndex) => {
    let categoryName = element.childNodes[0].value;
    let description = bodyElements[nodeIndex + 2].childNodes[1].childNodes[0].value;
    let resources = getDesignResourcesFromParagraph(bodyElements[nodeIndex + 4]);
    return new design_resource_category_1.default(categoryName, description, resources);
};
let getDesignResourcesFromParagraph = (paragraphNode) => {
    let resources = new Array();
    for (let paragraphChildIndex = 1; paragraphChildIndex < paragraphNode.childNodes.length; paragraphChildIndex += 2) {
        const node = paragraphNode.childNodes[paragraphChildIndex];
        if (node.nodeName === "a") {
            let name = node.childNodes[0].value;
            let description = cleanResourceDescription(paragraphNode.childNodes[paragraphChildIndex + 1].value);
            let url = node.attrs[0].value;
            resources.push(new design_resource_1.default(name, description, url));
        }
    }
    return resources;
};
let cleanResourceDescription = (description) => {
    let regexp = new RegExp("w+/g");
    let matches = [...description.matchAll(regexp)];
    return matches.join(" ");
};
console.log("test");
getMarkdownFileFromUrl(designResourcesURL)
    .then((md) => {
    const result = Array();
    const bodyElements = getHtmlBodyElementsFromMarkdown(md);
    let categories = getDesignResourceCategories(bodyElements);
    console.log(categories);
})
    .catch((err) => console.log(`Something went wrong, ${err}`));
