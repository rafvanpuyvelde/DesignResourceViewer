import redis from "redis";
import fetch from "node-fetch";
import showdown from "showdown";
import htmlParser from "parse5";
import express, { Request, Response, NextFunction } from "express";

import DesignResourceCategory from "./models/design-resource-category";
import DesignResource from "./models/design-resource";

const port = 5000;
const redisPort = 6379;

const client = redis.createClient({ port: redisPort });

const app = express();

// Gets the markdown file from the design resources url
const getMarkdownFileFromUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;

    const response = await fetch(
      `https://raw.githack.com/bradtraversy/design-resources-for-developers/master/readme.md`
    );

    const data = await response.json();
    const repos = data?.public?.repos;

    // Set data to Redis
    client.setex(username, 3600, repos);
    res.send({ some: "json" });
  } catch (error) {
    console.log(error);
    res.status;
  }
};

const convertMarkdownToHtml = (markdown: string): string => {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdown);
};

const getHtmlBodyElementsFromMarkdown = (
  markdown: string
): NodeListOf<ChildNode> => {
  const html = convertMarkdownToHtml(markdown);
  const document = htmlParser.parse(html) as HTMLDocument;
  return document.childNodes[0].childNodes[1].childNodes;
};

const getDesignResourceCategories = (
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
        getDesignResourceCategory(element, bodyElements, nodeIndex)
      );
    }
  }

  return categories;
};

const getDesignResourceCategory = (
  element: { childNodes: { value: any }[] },
  bodyElements: string | any[] | NodeListOf<ChildNode>,
  nodeIndex: number
): DesignResourceCategory => {
  const categoryName = element.childNodes[0].value;
  const description =
    bodyElements[nodeIndex + 2].childNodes[1].childNodes[0].value;
  const resources = getDesignResourcesFromParagraph(
    bodyElements[nodeIndex + 4]
  );
  return new DesignResourceCategory(categoryName, description, resources);
};

const getDesignResourcesFromParagraph = (paragraphNode: {
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
      const description = cleanResourceDescription(
        paragraphNode.childNodes[paragraphChildIndex + 1].value
      );
      const url = node.attrs[0].value;

      resources.push(new DesignResource(name, description, url));
    }
  }

  return resources;
};

const cleanResourceDescription = (description: string): string => {
  const regexp = new RegExp("w+/g");
  const matches = [...description.matchAll(regexp)];
  return matches.join(" ");
};

console.log("test");

getMarkdownFileFromUrl(designResourcesURL)
  .then((md: string) => {
    const result = Array<string>();

    const bodyElements = getHtmlBodyElementsFromMarkdown(md);

    const categories: Array<DesignResourceCategory> = getDesignResourceCategories(
      bodyElements
    );

    console.log(categories);
  })
  .catch((err) => console.log(`Something went wrong, ${err}`));
