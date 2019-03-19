import React, {
    Component
} from 'react';
import './Splash.css';



class Splash extends Component {
    render() {
        return ( 
        <div class = "background" > 
            <a href = "http://localhost:8080/login" >
                <div className = "loginButton" >
                    <div className = "text loginText" > Sign in with Spotify 
                    </div> 
                </div> 
            </a> 
        </div>
        );
    }
}

export default (Splash);