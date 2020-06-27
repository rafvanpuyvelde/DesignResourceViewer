export default class DesignResource {
  public name: string;
  public description: string;
  public url: string;
  public favIconPath: string;

  constructor(
    name: string,
    description: string,
    url: string,
    favIconPath: string
  ) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.favIconPath = favIconPath;
  }
}
