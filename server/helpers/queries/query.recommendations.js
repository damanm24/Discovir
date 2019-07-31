import { getSession } from "../database.helper";
import User from "../../models/User";

export const findSimilarUsers = async user => {
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
        let data = JSON.parse(JSON.stringify(record));
        let similarUser = new User(data._fields[1].properties);
        similarUser.similarity = data._fields[2]
        return similarUser;
      });
    })
    .catch(error => {
      session.close();
      throw error;
    });
};


