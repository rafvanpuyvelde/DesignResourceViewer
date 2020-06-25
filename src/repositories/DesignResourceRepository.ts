import DesignResourceScraper from "../utils/DesignResourceScraper";
import IDesignResourceRepository from "./IDesignResourceRepository";
import IDesignResourceScraper from "../utils/IDesignResourceScraper";
import DesignResourceCategory from "models/design-resources/DesignResourceCategory";

export default class DesignResourceRepository
  implements IDesignResourceRepository {
  private scraper: IDesignResourceScraper;

  constructor() {
    this.scraper = new DesignResourceScraper();
  }

  public async getResources(): Promise<Array<DesignResourceCategory>> {
    console.log("Get resources");
    return this.scraper.getCategories();
  }
}
