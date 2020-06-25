export default class DesignResource {
  public name: string;
  public description: string;
  public url: string;

  constructor(name: string, description: string, url: string) {
    this.name = name;
    this.description = description;
    this.url = url;
  }
}
