import React, { Component } from "react";
import "./landing.css";
import { Container } from "@material-ui/core";

export class Landing extends Component {
  constructor() {
    super();
    this.state = {
      counter: 3
    };
  }

  incrementCounter = e => {
    if (e.code === "ArrowRight" && this.state.counter < 3) {
      this.setState({ counter: this.state.counter + 1 });
    } else if (e.code === "ArrowLeft") {
      this.setState({ counter: this.state.counter - 1 });
    }
  };

  componentWillMount() {
    document.addEventListener("keydown", this.incrementCounter.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.incrementCounter.bind(this));
  }

  render() {
    switch (this.state.counter) {
      case 1:
        return (
          <Container maxWidth="sm" className="container">
            <div className="block">
              <h1 className="title">What is it?</h1>
              <p className="description">
                Discovir is a web app designed to analyze your spotify listening
                history and generate recommendations for artists that are
                similar to the ones you listen to.
              </p>
            </div>
          </Container>
        );
      case 2:
        return (
          <Container maxWidth="sm">
            <div className="block">
              <h1 className="title">How does it work?</h1>
              <p className="description">
                The way it works is it creates a network graph of artists you
                listen to and compares that with other users that have signed up
                for the site. We then figure out which other user you are most
                similar to and recommend artists that they have listened to that
                you do not. Other factors that play a role in our
                recommendations include: genres and popularity of the artist.
              </p>
            </div>
          </Container>
        );
      case 3:
        return (
          <Container maxWidth="sm">
            <div className="block">
              <h1 className="title">So what?</h1>
              <p className="description">
                The idea is that over time, and with enough data the
                recommendations our algorithm provides will be more inline with
                your music preferences and give you new music to listen to.
              </p>
              <a href="http://localhost:8080/auth/login">Click to continue</a>
            </div>
          </Container>
        );
      default:
        return (
          <Container maxWidth="sm">
            <div className="block">
              <h1 className="title">Welcome to Discovir!</h1>
            </div>
          </Container>
        );
    }
  }
}
