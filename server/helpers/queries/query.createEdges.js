import { getSession } from "../database.helper";

export const relateUserWithArtists = async (user, artists) => {
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

export const relateUserWithGenres = async (user, genres) => {
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

export const relateArtistWithGenre = async artist => {
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
