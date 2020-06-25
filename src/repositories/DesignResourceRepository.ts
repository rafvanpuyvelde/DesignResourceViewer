import IDesignResourceRepository from "./IDesignResourceRepository";
import DesignResourceCategory from "models/design-resources/DesignResourceCategory";

export default class DesignResourceRepository
  implements IDesignResourceRepository {
  public async getResources(): Promise<Array<DesignResourceCategory>> {
    console.log("test - get resources");
    throw new Error("Method not implemented.");
  }
}
