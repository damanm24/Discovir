import React, { Component } from 'react';
import * as d3 from 'd3';
import { graphService } from '../../services/graph.service';
import './graph.css';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: this.props.graphData,
    };
  }

  
  async componentDidMount() {
    this.drawGraph();
    // TODO: Swap this function with the above one.
    // let user = await SpotifyAPI.getUserProfile();
    // let history = await SpotifyAPI.getUserListeningHistory();
    // await DataHandler.addUserListeningHistory(user, history);
  }

  drawGraph() {
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
        .attr('x1', function(d) {
          return d.source.x;
        })
        .attr('y1', function(d) {
          return d.source.y;
        })
        .attr('x2', function(d) {
          return d.target.x + 12;
        })
        .attr('y2', function(d) {
          return d.target.y + 12;
        });
      node
        .attr('x', function(d) {
          return d.label === 'User' ? d.x - 20 : d.x;
        })
        .attr('y', function(d) {
          return d.label === 'User' ? d.y - 20 : d.y;
        });
    };

    const width = window.innerWidth * 0.7;
    const height = window.innerHeight * 0.7;

    var tooltip = d3
      .select('#root')
      .append('div')
      .attr('class', 'tooltip');

    var svg = this.svg;

    // add zoom capabilities
    var zoom_handler = d3.zoom().on('zoom', zoom_actions);

    zoom_handler(svg);

    var g = svg.append('g');

    function zoom_actions() {
      g.attr('transform', d3.event.transform);
    }

    var simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3
          .forceLink()
          .id(function(d) {
            return d.id;
          })
          .distance(75)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    var link = g
      .append('g')
      .style('stroke', '#aaa')
      .selectAll('line')
      .data(this.state.graph.links)
      .enter()
      .append('line');

    var node = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.state.graph.nodes)
      .enter()
      .append('g')
      .attr('id', d => {
        return d.label;
      })
      .attr('height', 200)
      .attr('width', 200)
      .append('image')
      .attr('href', function(d) {
        if (d.svg) {
          return d.svg;
        } else {
          return 'https://i.imgur.com/CkMTStp.png';
        }
      })
      .attr('id', d => {
        if (d.svg) {
          return 'artist';
        } else {
          return 'user';
        }
      })
      .attr('height', 35)
      .attr('width', 35)
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('mouseover', function(d) {
        return tooltip.style('visibility', 'visible').text(d.name);
      })
      .on('mousemove', function() {
        return (
          tooltip
            // eslint-disable-next-line no-restricted-globals
            .style('top', event.pageY - 30 + 'px')
            // eslint-disable-next-line no-restricted-globals
            .style('left', event.pageX + 'px')
        );
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      })
      .on('dblclick', dblclick)
      .on('click', d => {
        this.sendData(d);
      });

    simulation.nodes(this.state.graph.nodes).on('tick', ticked);

    simulation.force('link').links(this.state.graph.links);
  }

  sendData(node) {
    graphService.sendData(node);
  }


  render() {
    return <svg width="100%" height="100%" ref={element => (this.svg = d3.select(element))} />;
  }
}

export default Graph;
