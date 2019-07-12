let Genre = require("../routes/models/Genre");
const neo4j = require("neo4j-driver").v1;
const uri = "bolt://hobby-phccgenlakdagbkekfmdoidl.dbs.graphenedb.com:24787";
const user = "Admin";
const password = "b.82QVmGSW6Gu7.9jR1T8zvfZdB9VCd";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const getSession = () => {
  return driver.session();
};

exports.addUser = async user => {
  return await getSession().run(
    "MERGE (u:User {id: $id, name: $name}) SET u.id = $id SET u.name = $name RETURN u",
    user
  );
};

exports.addArtists = async artists => {
  const artistsList = {
    props: JSON.parse(JSON.stringify(artists))
  };
  return await getSession().run(
    "FOREACH (entry in $props | " +
      "MERGE(artist:Artist {id: entry.id}) " +
      "SET artist = entry)",
    artistsList
  );
};

exports.addGenres = async genres => {
  let genresArray = [];
  genres.forEach((value, key) => genresArray.push(new Genre(key, value)));
  const genreList = {
    props: JSON.parse(JSON.stringify(genresArray))
  };
  console.log(genreList);
  return await getSession().run(
    "FOREACH (entry in $props | " +
      "MERGE(genre:Genre {name: entry.name}) " +
      "SET genre = entry)",
    genreList
  );
};

exports.createRelationships = async (user, artists) => {
  const props = {
    id: user.id,
    artistList: JSON.parse(JSON.stringify(artists))
  };
  return await getSession().run(
    "MERGE (user:User {id: $id}) " +
      "FOREACH (a IN $artistList | " +
      "MERGE (artist:Artist {id: a.id}) " +
      "SET artist = a " +
      "MERGE (user)-[:LISTENS_TO]->(artist))",
    props
  );
};

exports.createPreferences = async (user, genres) => {
  let genresArray = [];
  genres.forEach((value, key) => genresArray.push(new Genre(key, value)));
  const props = {
    id: user.id,
    genreList: JSON.parse(JSON.stringify(genresArray))
  };
  return await getSession().run(
    "UNWIND $genreList as g " +
      "MATCH (genre:Genre {name: g.name}) with g, genre " +
      "MATCH (user:User {id: $id}) with g, genre, user " +
      "MERGE (user)-[r:LIKES]->(genre) " +
      "SET r.weight = g.weight",
    props
  );
};

exports.relateArtistToGenre = async artist => {
    let genresArray = [];
    artist.genres.forEach((genre) => {
        genresArray.push({name: genre});
    })
  const props = {
    id: artist.id,
    genreList: JSON.parse(JSON.stringify(genresArray))
  };
  return await getSession().run(
    "UNWIND $genreList as g " +
      "MATCH (genre:Genre {name: g.name}) with g, genre " +
      "MATCH (artist:Artist {id: $id}) with g, genre, artist " +
      "MERGE (artist)-[:RELATED_TO]->(genre) ",
    props
  );
};
