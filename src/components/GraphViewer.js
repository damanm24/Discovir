import React, {
    Component
} from 'react';
import DataHandler from '../utils/DataHandler';
import * as d3 from 'd3';
import SpotifyAPI from '../utils/SpotifyAPI';

class GraphViewer extends Component {

    constructor() {
        super();
        this.state = {
            graphData: null,
        };
    }

    async componentWillMount() {
      var ticked = function() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        node
             .attr("r", 24)
             .style("fill", function (d) {
                 if (d.label === "Artist") {
                     return "Green";
                 } else {
                     return "Red";
                 }
             })
             .style("stroke", "#424242")
             .style("stroke-width", "1px")
             .attr("cx", function (d) { return d.x+5; })
             .attr("cy", function(d) { return d.y-3; });
      }
        let graph = await DataHandler.getGraphData();
        graph = await DataHandler.formatGraph(graph);
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        var tooltip = d3.select("body")
        .append("div")
        .attr('class', 'tooltip');
        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force('charge', d3.forceManyBody()
            .strength(-1000)
            .theta(0.8)
            .distanceMax(500))
            .force("center", d3.forceCenter(width / 2, height / 2));

        var link = svg.append("g")
            .style("stroke", "#aaa")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line");

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 4) // we define "mouseover" handler, here we change tooltip
            // visibility to "visible" and add appropriate test
            
            .on("mouseover", function(d) {
              return tooltip.style("visibility", "visible").text(d.title);
            })
            
            // we move tooltip during of "mousemove"
            
            .on("mousemove", function() {
              // eslint-disable-next-line no-restricted-globals
              return tooltip.style("top", (event.pageY - 30) + "px")
                // eslint-disable-next-line no-restricted-globals
                .style("left", event.pageX + "px");
            })
            
            // we hide our tooltip on "mouseout"
            
            .on("mouseout", function() {
              return tooltip.style("visibility", "hidden");
            });

            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(graph.links);
    }

    async componentDidMount() {
        let user = await SpotifyAPI.getUserProfile();
        let history = await SpotifyAPI.getUserListeningHistory();
        let test = await DataHandler.addUserListeningHistory(user, history);
        let graph = await DataHandler.getGraphData();
        graph = await DataHandler.formatGraph(graph);
        console.log(JSON.stringify(graph));
        this.setState({
             graphData: graph
        });
    }

    render() {

        return (null);
    }
}

export default GraphViewer;