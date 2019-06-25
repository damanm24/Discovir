import axios from 'axios';

const getGraphData = async () => {
    const response = await axios.post("http://localhost:7474/db/data/transaction/commit", {
        "statements": [{
            "statement": "MATCH path = (n)-[r]->(m) RETURN path",
            "resultDataContents": ["graph"]
        }]
    }, {
        headers: {
            Authorization: 'Basic YWRtaW46MTIzNA==',
            'content-type': 'application/json'
        }
    });
    return response.data;
}

const addUserListeningHistory = async (user, history) => {
    const response = await axios.post("http://localhost:8080/graph/addUserHistory", {
        user: user,
        artists: history
    });
    return response.data;
}

const formatGraph = async (graphData) => {
    var nodes = [],
        links = [];
    let nodeSet = new Set();
    graphData.results[0].data.forEach((row) => {
        row.graph.nodes.forEach((node) => {
            if (!nodeSet.has(node.id)) {
                nodeSet.add(node.id);
                var newNode = {
                    id: node.id,
                    label: node.labels[0],
                    title: node.properties.name
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

export default {
    getGraphData,
    formatGraph,
    addUserListeningHistory
};