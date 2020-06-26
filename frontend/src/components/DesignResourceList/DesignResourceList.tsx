import React from "react";
import DesignResourceCategory from "../../types/DesignResourceCategory";
import DesignResourceCard from "../DesignResourceCard/DesignResourceCard";

interface IProps {
  listCategory: DesignResourceCategory;
}

interface IState {}

export default class DesignResourceList extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = { listCategory: null };
  }

  render() {
    return (
      <div className="wrapper-design-resource-list">
        <h2>{this.props.listCategory.name}</h2>
        <ul>
          {this.props.listCategory.resources.map((resource) => (
            <DesignResourceCard key={resource.name} resource={resource} />
          ))}
        </ul>
      </div>
    );
  }
}
