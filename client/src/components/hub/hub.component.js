import React from "react";
import {
  getGraphData,
  addUserListeningHistory,
  formatGraph
} from "../../services/database.service";
import {
  getUserProfile
} from "../../services/spotify.service";
import Graph from "../graph/graph.component";
import Tutorial from "../tutorial/tutorial.component";
import Sidebar from "../sidebar/sidebar.component";
import "./hub.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";

export class Hub extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      modal_open: false,
      graph: null
    };
  }

  handleClose = () => {
    this.setState({ modal_open: false });
  };

  async componentDidMount() {
    let user = await getUserProfile();
    let graph = await getGraphData(user.id);
    graph = await formatGraph(graph);
    this.setState({ loading: false, graph: graph, modal_open: true });
  }

  render() {
    if (this.state.loading || !this.state.graph) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div className="hub" id="hub">
          <Modal
            artia-labelledby="tutorial-title"
            aria-describedby="tutorial-content"
            open={this.state.modal_open}
            onClose={this.handleClose}
          >
            <Tutorial />
          </Modal>
          <div className="graphContainer" id="graphContainer">
            <Graph graphData={this.state.graph} />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      );
    }
  }
}
