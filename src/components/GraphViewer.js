import React, { Component } from "react";
import DataHandler from "../utils/DataHandler";
import * as d3 from "d3";
import { connect } from "react-redux";
import SpotifyAPI from "../utils/SpotifyAPI";
import "./test.png";

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    accessToken: state.accessToken
  };
};

class GraphViewer extends Component {
  constructor() {
    super();
    this.state = {
      graphData: null
    };
  }

  async componentWillMount() {
    function dblclick(d) {
      d.fx = null;
      d.fy = null;
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      // Allows NODE FIXING
      // d.fx = null;
      // d.fy = null;
    }

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
          return d.label === "User" ? d.x - 20 : d.x;
        })
        .attr("y", function(d) {
          return d.label === "User" ? d.y - 20 : d.y;
        });
    };
    let graph = await DataHandler.getGraphData();
    graph = await DataHandler.formatGraph(graph);
    const width = window.innerWidth;
    const height = window.innerHeight;

    var tooltip = d3
      .select("#root")
      .append("div")
      .attr("class", "tooltip");
    var svg = d3
      .select("#root")
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
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-1500))
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
      .attr("id", d => {
        return d.label;
      })
      .attr("height", 200)
      .attr("width", 200)
      .append("image")
      .attr("href", function(d) {
        if (d.svg) {
          return d.svg;
        } else {
          return "https://i.imgur.com/CkMTStp.png";
        }
      })
      .attr("id", d => {
        if (d.svg) {
          return "artist";
        } else {
          return "user";
        }
      })
      .attr("height", 40)
      .attr("width", 40)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
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
      })
      .on("dblclick", dblclick);
       
    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);
  }

  async componentDidMount() {
    SpotifyAPI.setAccessToken(this.props.accessToken);
    let user = await SpotifyAPI.getUserProfile();
    let history = await SpotifyAPI.getUserListeningHistory();
    await DataHandler.addUserListeningHistory(user, history);
    let graph = await DataHandler.getGraphData();
    graph = await DataHandler.formatGraph(graph);
    this.setState({
      graphData: graph
    });
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps)(GraphViewer);
