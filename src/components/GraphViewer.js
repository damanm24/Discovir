import React, { Component } from "react";
import DataHandler from "../utils/DataHandler";
import * as d3 from "d3";
import SpotifyAPI from "../utils/SpotifyAPI";

class GraphViewer extends Component {
  constructor() {
    super();
    this.state = {
      graphData: null
    };
  }

  async componentWillMount() {
    const dragStart = d => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const drag = d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragEnd = d => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };
    var ticked = function() {
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x + 25;
        })
        .attr("y2", function(d) {
          return d.target.y + 25;
        });

      node
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        });
    };
    let graph = await DataHandler.getGraphData();
    graph = await DataHandler.formatGraph(graph);
    const width = window.innerWidth;
    const height = window.innerHeight;

    var tooltip = d3
      .select(".App")
      .append("div")
      .attr("class", "tooltip");
    var svg = d3
      .select(".App")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    var simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(function(d) {
            return d.id;
          })
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg
      .append("g")
      .style("stroke", "#aaa")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line");

    var node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("g")
      .attr("height", 200)
      .attr("width", 200)
      .append("image")
      .attr("href", function(d) {
        return d.svg;
      })
      .attr("height", 40)
      .attr("width", 40)
      .call(
        d3
          .drag()
          .on("start", dragStart)
          .on("drag", drag)
          .on("end", dragEnd)
      )
      .on("mouseover", function(d) {
        return tooltip.style("visibility", "visible").text(d.name);
      })
      .on("mousemove", function() {
        return (
          tooltip
            // eslint-disable-next-line no-restricted-globals
            .style("top", event.pageY - 30 + "px")
            // eslint-disable-next-line no-restricted-globals
            .style("left", event.pageX + "px")
        );
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);
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
    return null;
  }
}

export default GraphViewer;
