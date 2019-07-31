import axios from 'axios'

export const getGraphData = async () => {
    //http://localhost:7474/db/data/
    const response = await axios.post("https://hobby-phccgenlakdagbkekfmdoidl.dbs.graphenedb.com:24780/db/data/transaction/commit", {
        "statements": [{
            "statement": "MATCH path = (u1:User)-[r1:LISTENS_TO]->(artist:Artist)<-[:LISTENS_TO]-(u2:User) where u1<>u2 RETURN path",
            "resultDataContents": ["graph"]
        }]
    }, {
        headers: {
            Authorization: 'Basic QWRtaW46Yi44MlFWbUdTVzZHdTcuOWpSMVQ4enZmWmRCOVZDZA==',
            'content-type': 'application/json'
        }
    });
    console.log(response.data);
    return response.data;
}

export const addUserListeningHistory = async (user, history) => {
    //http://localhost:8080
    const response = await axios.post("https://polar-waters-86790.herokuapp.com/graph/addUserHistory", {
        user: user,
        artists: history
    });
    return response.data;
}

export const formatGraph = async (graphData) => {
    var nodes = [],
        links = [];
    let nodeSet = new Set();
    graphData.results[0].data.forEach((row) => {
        row.graph.nodes.forEach((node) => {
            if (!nodeSet.has(node.id)) {
                nodeSet.add(node.id);
                var newNode = {
                    id: node.id,
                    svg:node.properties.image,
                    label: node.labels[0],
                    size: 400,
                    name: node.properties.name,
                    lookup: node.properties.id
                };
                nodes.push(newNode);
            }
        });
        row.graph.relationships.forEach((relationship) => {
            var edge = {
                source: relationship.startNode,
                target: relationship.endNode,
                type: relationship.type
            }
            links.push(edge);
        });
    });
    return {
        nodes: nodes,
        links: links
    };
}