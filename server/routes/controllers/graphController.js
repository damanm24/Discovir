let User = require("../models/User");
let Artist = require("../models/Artist");

let dbUtil = require("../../db/dbUtils");

exports.addUserListening = async (req, res) => {
  const user = new User(req.body.user);
  const genreMap = new Map();
  let artistsArray = req.body.artists.items.map(artist => {
    artist.genres.forEach((genre) => {
        if (genreMap.has(genre)) {
            genreMap.set(genre, genreMap.get(genre) + 1);
        } else {
            genreMap.set(genre, 1);
        }
    });
    return new Artist(artist);
  });
  await dbUtil.addGenres(genreMap);
  await dbUtil.addUser(user);
  await dbUtil.addArtists(artistsArray);
  artistsArray.forEach(async (artist) => {
      return await dbUtil.relateArtistToGenre(artist);
  })
  const edges = await dbUtil.createRelationships(user, artistsArray);
  await dbUtil.createPreferences(user, genreMap);
  res.json(edges);
};
