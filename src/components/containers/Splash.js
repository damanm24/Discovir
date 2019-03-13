import React, { Component } from 'react';
import './Splash.css';



class Splash extends Component {
    render() {
        return (
            <div class="background">
            {/* Change /login to localhost:5000/login when running local */}
                <a href="http://localhost:8080/login">
                    <div className="loginButton">
                        <div className="text loginText">Sign in with Spotify</div>
                    </div>
                </a>
            </div>
        );
    }
}

export default (Splash);
