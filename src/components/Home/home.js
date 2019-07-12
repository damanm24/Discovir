import React, { Component } from "react";
import "./home.css";
import { connect } from "react-redux";

const convertStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    accessToken: state.accessToken
  };
};

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>
          My name is Daman Mulye, and this is a sample project I've created to
          help me collect some data on an assignment I am working on. The goal
          of the assignment is for me to design a system to recommend something
          to you, the user. But before I get to the actual meat of the
          assignment, I need to collect some data about you. If you decide to
          help me out (for which I would be very grateful for), please log into
          your Spotify account for me. None of your sensitive data is saved.
          After logging in you will be taken to a page that will show you
          exactly what data I'm collecting about you and the other people that
          have clicked on the link. I believe in complete transparency when it
          it comes to data collection so you can find a list below of all the
          data points I am using.
        </p>
        <ul>
          <li>Username</li>
          <li>Name</li>
          <li>Your most frequently listened to artists.</li>
          <li>50 of your most recently saved tracks in your library</li>
        </ul>
        <p>
          These data points will help me establish your preferences in music.
          After I've collected enough data from people I can then begin to
          deploy my recommendation engine. And there will be a full functioning
          app.
        </p>
        <a href="https://polar-waters-86790.herokuapp.com/login">Log in with spotify</a>
      </div>
    );
  }
}

export default connect(convertStateToProps)(Home);
