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
          My name is Daman Mulye, and you've reached my data collection portal.
          I'm trying to design my own recommendation engine and I need your help
          to do so. If you are inclined to help me out please click the link at
          the bottom of this paragraph entitled, "Log in with spotify". It will
          take you to the official spotify website and ask you to log in so I
          can access information about the music you listen to. Afterwards you
          will be taken to a page that shows a visual representation of the data
          I've collected. If you'd like to know more about the application
          please see below.
        </p>
        <a href="https://polar-waters-86790.herokuapp.com/login">
          Log in with spotify
        </a>

        <p>
          I plan to use this data to see what information is relevant in
          determining new music for you to listen to. The information I store
          can be seen below.
          <ul>
            <li>Username</li>
            <li>Name</li>
            <li>Your most frequently listened to artists.</li>
            <li>50 of your most recently saved tracks in your library</li>
          </ul>
          After I've collected enough data from users I will be able to begin
          developing my recommender system and publish it for anyone and
          everyone to use. Thank you for considering helping me out.
        </p>
      </div>
    );
  }
}

export default connect(convertStateToProps)(Home);
