import DesignResource from "./design-resource";

export default class DesignResourceCategory {
  private _name: string;
  private _description: string;
  private _resources: Array<DesignResource>;

  constructor(
    name: string,
    description: string,
    resources: Array<DesignResource>
  ) {
    this._name = name;
    this._description = description;
    this._resources = resources;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get resources(): Array<DesignResource> {
    return this._resources;
  }
}
