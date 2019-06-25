import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();


const setAccessToken = (token) => {
    spotifyWebApi.setAccessToken(token);
}

const getUserProfile = async () => {
    return await spotifyWebApi.getMe();
}

const getUserListeningHistory = async () => {
    const options = {
        time_range: "short_term",
        limit: 15
    };
    return await spotifyWebApi.getMyTopArtists(options);
}

export default {
    setAccessToken,
    getUserProfile,
    getUserListeningHistory
}