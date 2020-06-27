import React from "react";
import DesignResource from "../../types/DesignResource";
import FavIcon from "../FavIcon/FavIcon";

interface IProps {
  resource: DesignResource;
}

interface IState {
  resourceFavIconPath: string;
}

export default class DesignResourceCard extends React.PureComponent<
  IProps,
  IState
> {
  render() {
    return (
      <div className="wrapper-resource-card">
        <FavIcon
          src={this.props.resource.favIconPath}
          alt={this.props.resource.name + "'s favicon"}
        />

        <div className="wrapper-resource-details">
          <p>{this.props.resource.name}</p>
          <span>{this.props.resource.description}</span>
        </div>
      </div>
    );
  }
}
