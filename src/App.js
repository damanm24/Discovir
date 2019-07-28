import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { setAccessToken } from './services/spotify.service'
import { Landing } from "./components/landing/landing.component";
import { Hub } from "./components/hub/hub.component";
import "./App.css";

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged_in: false,
      access_token: null
    };
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

  componentWillMount = async () => {
    const params = this.login();
    if (params.access_token) {
      this.setState({ logged_in: true, access_token: params.access_token });
      setAccessToken(params.access_token);
    }
  };

  render() {
    let page;

    if (this.state.logged_in) {
      page = <Hub></Hub>
    } else {
      page = <Landing></Landing>
    }

    return (
      <React.Fragment>
        <CssBaseline />
        {page}
      </React.Fragment>
    );
  }
}

export default App;
