let User = require('../models/User');
let Artist = require('../models/Artist');

let dbUtil = require('../../db/dbUtils');

exports.addUserListening = async (req, res) => {
    const user = new User(req.body.user);
    let artistsArray = req.body.artists.items.map((artist) => new Artist(artist));
    const userNode = await dbUtil.addUser(user);
    const artistNodes = await dbUtil.addArtists(artistsArray);
    const edges = await dbUtil.createRelationships(user, artistsArray); 
    res.json(edges);
};

exports.getGraph = async (req, res) => {
    const graphData = await dbUtil.getGraph();
    res.json(graphData);
}