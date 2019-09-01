import React from "react";
import "./sidebar.css"
import { graphService } from "../../services/graph.service";

class Sidebar extends React.Component {
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

  templateElement(element) {
    return (
      <div>
        <img src={element.svg} className="image" />
        <h2>{element.name}</h2>
      </div>
    );
  }

  render() {
    let toRender = [];
    if (this.state.clicked.length === 1) {
      toRender.push(this.templateElement(this.state.clicked[0]));
    } else if (this.state.clicked.length === 2) {
      if (this.state.clicked[0].label === this.state.clicked[1].label) {
        toRender.push(this.templateElement(this.state.clicked[0]));
      }
      toRender.push(this.templateElement(this.state.clicked[1]));
    }
    return <div>{toRender}</div>;
  }
}

export default Sidebar
