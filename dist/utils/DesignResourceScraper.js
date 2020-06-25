"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse5_1 = __importDefault(require("parse5"));
const showdown_1 = __importDefault(require("showdown"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const DesignResource_1 = __importDefault(require("models/design-resources/DesignResource"));
const DesignResourceCategory_1 = __importDefault(require("models/design-resources/DesignResourceCategory"));
const designResourceUrl = `https://raw.githack.com/bradtraversy/design-resources-for-developers/master/readme.md`;
class DesignResourceScraper {
    constructor() {
        // Gets the markdown file from the design resources url
        this.getMarkdownFileFromUrl = async () => {
            try {
                const response = await node_fetch_1.default(designResourceUrl);
                return response.ok ? response.json() : undefined;
            }
            catch (error) {
                console.log(error);
            }
            return null;
        };
        this.convertMarkdownToHtml = (markdown) => {
            const converter = new showdown_1.default.Converter();
            return converter.makeHtml(markdown);
        };
        this.getHtmlBodyElementsFromMarkdown = (markdown) => {
            const html = this.convertMarkdownToHtml(markdown);
            const document = parse5_1.default.parse(html);
            return document.childNodes[0].childNodes[1].childNodes;
        };
        this.getDesignResourceCategories = (bodyElements) => {
            const categories = new Array();
            for (let nodeIndex = 0; nodeIndex < bodyElements.length; nodeIndex++) {
                const element = bodyElements[nodeIndex];
                if (element.nodeName === "h2" &&
                    element.attrs[0].value !== "tableofcontents") {
                    categories.push(this.getDesignResourceCategory(element, bodyElements, nodeIndex));
                }
            }
            return categories;
        };
        this.getDesignResourceCategory = (element, bodyElements, nodeIndex) => {
            const categoryName = element.childNodes[0].value;
            const description = bodyElements[nodeIndex + 2].childNodes[1].childNodes[0].value;
            const resources = this.getDesignResourcesFromParagraph(bodyElements[nodeIndex + 4]);
            return new DesignResourceCategory_1.default(categoryName, description, resources);
        };
        this.getDesignResourcesFromParagraph = (paragraphNode) => {
            const resources = new Array();
            for (let paragraphChildIndex = 1; paragraphChildIndex < paragraphNode.childNodes.length; paragraphChildIndex += 2) {
                const node = paragraphNode.childNodes[paragraphChildIndex];
                if (node.nodeName === "a") {
                    const name = node.childNodes[0].value;
                    const description = this.cleanResourceDescription(paragraphNode.childNodes[paragraphChildIndex + 1].value);
                    const url = node.attrs[0].value;
                    resources.push(new DesignResource_1.default(name, description, url));
                }
            }
            return resources;
        };
        this.cleanResourceDescription = (description) => {
            const regexp = new RegExp("w+/g");
            const matches = [...description.matchAll(regexp)];
            return matches.join(" ");
        };
    }
    async getCategories() {
        let categories = new Array();
        await this.getMarkdownFileFromUrl()
            .then((markdown) => {
            if (markdown != null) {
                const bodyElements = this.getHtmlBodyElementsFromMarkdown(markdown);
                categories = this.getDesignResourceCategories(bodyElements);
                console.log(categories);
            }
            else {
                throw Error("Couldn't fetch design-resources source ...");
            }
        })
            .catch((error) => console.log(`Something went wrong, ${error}`));
        return categories;
    }
}
exports.default = DesignResourceScraper;
