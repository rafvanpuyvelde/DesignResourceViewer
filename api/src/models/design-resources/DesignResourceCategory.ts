import DesignResource from "./DesignResource";

export default class DesignResourceCategory {
  public name: string;
  public description: string;
  public resources: Array<DesignResource>;

  constructor(
    name: string,
    description: string,
    resources: Array<DesignResource>
  ) {
    this.name = name;
    this.description = description;
    this.resources = resources;
  }
}
