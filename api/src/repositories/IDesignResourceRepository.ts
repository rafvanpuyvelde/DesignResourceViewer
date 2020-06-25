import DesignResourceCategory from "models/design-resources/DesignResourceCategory";

export default interface IDesignResourceRepository {
  getResources: () => Promise<Array<DesignResourceCategory>>;
}
