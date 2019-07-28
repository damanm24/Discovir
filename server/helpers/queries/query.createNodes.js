import { getSession } from "../database.helper";
import Genre from "../../models/Genre";

export const addUser = async user => {
  return await getSession().run(
    "MERGE (u:User {id: $id, name: $name}) SET u.id = $id SET u.name = $name RETURN u",
    user
  );
};

export const addArtists = async artists => {
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

export const addGenres = async (genres) => {
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
