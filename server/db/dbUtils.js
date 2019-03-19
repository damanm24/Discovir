"use strict";
const neo4j = require('neo4j-driver').v1;
const uri = "bolt://localhost"
const user = "test"
const password = "1234"
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const getSession = () => {
    return driver.session();
}

exports.addUser = async (user) => {
    return await getSession().run('MERGE (u:User {id: $id, name: $name}) SET u.id = $id SET u.name = $name RETURN u', user);
}

exports.addArtists = async (artists) => {
    const artistsList = {
        props: JSON.parse(JSON.stringify(artists))
    }
    return await getSession()
        .run('FOREACH (entry in $props | ' +
            'MERGE(artist:Artist {id: entry.id}) ' +
            'SET artist = entry)', artistsList)

}

exports.createRelationships = async (user, artists) => {
    const props = {
        id: user.id,
        artistList: JSON.parse(JSON.stringify(artists))
    }
    return await getSession().run('MERGE (user:User {id: $id}) ' +
        'FOREACH (a IN $artistList | ' +
        'MERGE (artist:Artist {id: a.id}) ' +
        'SET artist = a ' +
        'MERGE (user)-[:LISTENS_TO]->(artist))', props);
}