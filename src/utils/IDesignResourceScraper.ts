import DesignResource from "models/design-resources/DesignResource";
import DesignResourceCategory from "models/design-resources/DesignResourceCategory";

export default interface DesignResourceScraper {
  getCategories: () => Promise<Array<DesignResourceCategory>>;
}
