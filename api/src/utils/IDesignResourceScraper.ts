import DesignResourceCategory from "models/design-resources/DesignResourceCategory";

export default interface DesignResourceScraper {
  getCategories: () => Promise<Array<DesignResourceCategory>>;
}
