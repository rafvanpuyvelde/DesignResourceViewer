import React from "react";

interface IProps {
  src: string;
  alt: string;
}

interface IState {}

export default class FavIcon extends React.PureComponent<IProps, IState> {
  render() {
    return (
      <div className="wrapper-favicon">
        <img src={this.props.src} alt={this.props.alt}></img>
      </div>
    );
  }
}
