import React from "react";

import { graphService } from "../../services/graph.service";

export class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: []
    };
  }

  componentDidMount = async () => {
    this.subscription = graphService.getData().subscribe(data => {
      if (data) {
        this.setState({ clicked: data });
        console.log(this.state);
      }
    });
  };

  componentWillUnmount = async () => {
    this.subscription.unsubscribe();
  };

  render() {
    let name = "";
    let img = "";
    if (this.state.clicked !== 0) {
      if (this.state.clicked.length === 1) {
        name = this.state.clicked[0].name;
        img = this.state.clicked[0].svg;
      } else {
        name = this.state.clicked[1].name;
        img = this.state.clicked[1].svg;
      }
    }
    return (
      <div>
        <img src={img} max-height="250px" />
        <h1>{name}</h1>
      </div>
    );
  }
}
