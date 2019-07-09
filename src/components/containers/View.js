//The class that renders the viewport for the app
import React from 'react';
import Splash from './Splash';
import GraphViewer from '../GraphViewer';
import spotifyUtils from "../../utils/SpotifyAPI";

class View extends React.Component {

    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            uri: params.uri ? params.uri : null,
            loggedIn: params.access_token ? true : false,
        };
        if (params.access_token) {
            spotifyUtils.setAccessToken(params.access_token);
            this.state.uri = params.uri
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        // eslint-disable-next-line
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    render() {
        return (<div> 
            {!this.state.loggedIn ? (<Splash></Splash>) 
            : 
            (<GraphViewer></GraphViewer> )}
            </div>
        );
    }
}

export default (View);