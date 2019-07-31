import User from '../models/User';
import Artist from '../models/Artist';
import * as edge from '../helpers/queries/query.createEdges';
import * as node from '../helpers/queries/query.createNodes';
import * as recommendations from '../helpers/queries/query.recommendations';

export const addUserListeningHistory = async (req, res) => {
  // Parse and format data for database transactions
  const user = new User(req.body.user);
  const genreMap = new Map();

  const artistsArray = req.body.artists.items.map(artist => {
    artist.genres.forEach(genre => {
      if (genreMap.has(genre)) {
        genreMap.set(genre, genreMap.get(genre) + 1);
      } else {
        genreMap.set(genre, 1);
      }
    });
    return new Artist(artist);
  });

  // Database Interactions
  await node.addGenres(genreMap);
  await node.addUser(user);
  await node.addArtists(artistsArray);
  artistsArray.forEach(async artist => {
    await edge.relateArtistWithGenre(artist);
  });
  const edges = await edge.relateUserWithArtists(user, artistsArray);
  await edge.relateUserWithGenres(user, genreMap);

  // Handle response
  res.json(edges);
};

export const getRecommendations = async (req, res) => {
  const user = new User(req.body.user);
  const similarUsers = await recommendations.findSimilarUsers(user);

  res.json(similarUsers);
};
