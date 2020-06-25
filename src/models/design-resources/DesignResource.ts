export default class DesignResource {
  private _name: string;
  private _description: string;
  private _url: string;

  constructor(name: string, description: string, url: string) {
    this._name = name;
    this._description = description;
    this._url = url;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get url(): string {
    return this._url;
  }
}
