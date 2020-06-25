import htmlParser from "parse5";
import showdown from "showdown";
import fetch, { Response } from "node-fetch";
import IDesignResourceScraper from "./IDesignResourceScraper";
import DesignResource from "../models/design-resources/DesignResource";
import DesignResourceCategory from "../models/design-resources/DesignResourceCategory";

const designResourceUrl = `https://raw.githack.com/bradtraversy/design-resources-for-developers/master/readme.md`;

export default class DesignResourceScraper implements IDesignResourceScraper {
  public async getCategories(): Promise<Array<DesignResourceCategory>> {
    let categories = new Array<DesignResourceCategory>();

    await this.getMarkdownFileFromUrl()
      .then((markdown: string | undefined) => {
        if (markdown != null) {
          const bodyElements = this.getHtmlBodyElementsFromMarkdown(markdown);
          categories = this.getDesignResourceCategories(bodyElements);
        } else {
          throw Error("Couldn't fetch design-resources source ...");
        }
      })
      .catch((error) => console.log(`Something went wrong, ${error}`));

    return categories;
  }

  // Gets the markdown file from the design resources url
  private getMarkdownFileFromUrl = async (): Promise<string | undefined> => {
    try {
      const response: Response = await fetch(designResourceUrl);
      return response.ok ? response.text() : undefined;
    } catch (error) {
      console.log(error);
    }

    return undefined;
  };

  private convertMarkdownToHtml = (markdown: string): string => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  };

  private getHtmlBodyElementsFromMarkdown = (
    markdown: string
  ): NodeListOf<ChildNode> => {
    const html = this.convertMarkdownToHtml(markdown);
    const document = htmlParser.parse(html) as HTMLDocument;
    return document.childNodes[0].childNodes[1].childNodes;
  };

  private getDesignResourceCategories = (
    bodyElements: string | any[] | NodeListOf<ChildNode>
  ): Array<DesignResourceCategory> => {
    const categories = new Array<DesignResourceCategory>();

    for (let nodeIndex = 0; nodeIndex < bodyElements.length; nodeIndex++) {
      const element = bodyElements[nodeIndex];

      if (
        element.nodeName === "h2" &&
        element.attrs[0].value !== "tableofcontents"
      ) {
        categories.push(
          this.getDesignResourceCategory(element, bodyElements, nodeIndex)
        );
      }
    }

    return categories;
  };

  private getDesignResourceCategory = (
    element: { childNodes: { value: any }[] },
    bodyElements: string | any[] | NodeListOf<ChildNode>,
    nodeIndex: number
  ): DesignResourceCategory => {
    const categoryName = element.childNodes[0].value;
    const description =
      bodyElements[nodeIndex + 2].childNodes[1].childNodes[0].value;
    const resources = this.getDesignResourcesFromParagraph(
      bodyElements[nodeIndex + 4]
    );
    return new DesignResourceCategory(categoryName, description, resources);
  };

  private getDesignResourcesFromParagraph = (paragraphNode: {
    childNodes: string | any[];
  }): Array<DesignResource> => {
    const resources = new Array<DesignResource>();

    for (
      let paragraphChildIndex = 1;
      paragraphChildIndex < paragraphNode.childNodes.length;
      paragraphChildIndex += 2
    ) {
      const node = paragraphNode.childNodes[paragraphChildIndex];

      if (node.nodeName === "a") {
        const name = node.childNodes[0].value;
        const description = this.cleanResourceDescription(
          paragraphNode.childNodes[paragraphChildIndex + 1].value
        );
        const url = node.attrs[0].value;

        resources.push(new DesignResource(name, description, url));
      }
    }

    return resources;
  };

  private cleanResourceDescription = (description: string): string => {
    const regexp = /\w+/g;

    const matches = [...description.matchAll(regexp)];

    return matches.join(" ");
  };
}
