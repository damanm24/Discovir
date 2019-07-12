import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Home from "./components/Home/home";
import GraphViewer from "./components/GraphViewer";
import SpotifyAPI from "./utils/SpotifyAPI";

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    accessToken: state.accessToken
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.login();
    if (params.access_token) {
      SpotifyAPI.setAccessToken(params.access_token);
      this.updateAccessToken(params.access_token);
    }
  }

  login = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  updateAccessToken = token => {
    this.props.dispatch({ type: "UPDATE ACCESS-TOKEN", value: token });
  };

  render() {
    if (!this.props.loggedIn) return <Home>Not logged in</Home>;
    else return <GraphViewer></GraphViewer>;
  }
}

export default connect(mapStateToProps)(App);
