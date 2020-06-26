import axios from "axios";
import * as React from "react";
import "./DesignResources.scss";
import DesignResourceCategory from "../types/DesignResourceCategory";

interface IProps {}

interface IState {
  resources: Array<DesignResourceCategory>;
}

export default class DesignResources extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = { resources: [] };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/resources`)
      .then((res) => {
        const resources: Array<DesignResourceCategory> = res.data;
        this.setState({ resources });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ul>
        {this.state.resources.map((resource) => (
          <li key={resource.name}>{resource.name}</li>
        ))}
      </ul>
    );
  }
}
