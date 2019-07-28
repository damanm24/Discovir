import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();


export const setAccessToken = (token) => {
    spotifyWebApi.setAccessToken(token);
}

export const getUserProfile = async () => {
    return await spotifyWebApi.getMe();
}

export const getUserListeningHistory = async () => {
    const options = {
        time_range: "short_term",
        limit: 50
    };
    let short_term = await spotifyWebApi.getMyTopArtists(options);
    options.time_range = "medium_term";
    let medium_term = await spotifyWebApi.getMyTopArtists(options);
    let data = await condenseData(short_term, medium_term);
    return {items: Array.from(data)}
}

const condenseData = async (short_term, medium_term) => {
    let item_map = new Map();
    let condenser = function(artist) {
        item_map.set(artist.id, artist);
    }
    short_term.items.forEach(condenser);
    medium_term.items.forEach(condenser);
    return item_map.values();
}