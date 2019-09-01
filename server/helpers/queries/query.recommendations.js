/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import { getSession } from '../database.helper';
import User from '../../models/User';

const findSimilarUsers = async user => {
  const query = `
    MATCH (p1:User {id: "${user.id}"})-[]->(artist1)
    WITH p1, collect(id(artist1)) as p1Artists
    MATCH (p2:User)-[]->(artist2) where p1 <> p2
    with p1, p1Artists, p2, collect(id(artist2)) as p2Artists
    return p1 AS from, p2 as to, algo.similarity.jaccard(p1Artists, p2Artists) as similarity order by similarity desc limit 5
    `;
  const session = getSession();
  return session
    .run(query)
    .then(result => {
      session.close();
      return result.records.map(record => {
        const data = JSON.parse(JSON.stringify(record));
        const similarUser = new User(data._fields[1].properties);
        similarUser.similarity = data._fields[2];
        return similarUser;
      });
    })
    .catch(error => {
      session.close();
      throw error;
    });
};

const findDisjoint = async (user, otherUser) => {
  const query = `
    MATCH (p1:User {id: "${otherUser.id}"})-[]->(a:Artist)
    WITH a
    MATCH (p2:User {id: "${user.id}"})-[]->(:Artist)
    WHERE NOT EXISTS((p2)-[]->(a))
    MATCH (a)-[:RELATED_TO]->(g:Genre)<-[:LIKES]-(p2)
    WITH a as filteredArtists
    MATCH (filteredArtists)-[:RELATED_TO]->(g1:Genre)
    WITH filteredArtists, collect(id(g1)) as ids
    RETURN ids
  `
}

export {findSimilarUsers, getNewArtists};
