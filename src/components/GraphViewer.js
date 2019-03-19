import React, {
    Component
} from 'react';
import DataHandler from '../utils/DataHandler';
import {Graph} from 'react-d3-graph';

class App extends Component {

    constructor() {
        super();
        this.state = {
            graphData: null,
            config: {
                "automaticRearrangeAfterDropNode": false,
                "collapsible": true,
                "directed": false,
                "focusAnimationDuration": 0.75,
                "focusZoom": 1,
                "height": window.innerHeight,
                "width": window.innerWidth,
                "highlightDegree": 1,
                "highlightOpacity": 0.2,
                "linkHighlightBehavior": true,
                "maxZoom": 8,
                "minZoom": 0.1,
                "nodeHighlightBehavior": true,
                "panAndZoom": true,
                "staticGraph": false,
                "d3": {
                  "alphaTarget": 0.05,
                  "gravity": -100,
                  "linkLength": 100,
                  "linkStrength": 1
                },
                "node": {
                  "color": "#d3d3d3",
                  "fontColor": "black",
                  "fontSize": 12,
                  "fontWeight": "normal",
                  "highlightColor": "red",
                  "highlightFontSize": 12,
                  "highlightFontWeight": "bold",
                  "highlightStrokeColor": "SAME",
                  "highlightStrokeWidth": 1.5,
                  "labelProperty": "title",
                  "mouseCursor": "pointer",
                  "opacity": 1,
                  "renderLabel": true,
                  "size": 450,
                  "strokeColor": "none",
                  "strokeWidth": 1.5,
                  "svg": "",
                  "symbolType": "circle"
                },
                "link": {
                  "color": "#d3d3d3",
                  "fontColor": "black",
                  "fontSize": 8,
                  "fontWeight": "normal",
                  "highlightColor": "blue",
                  "highlightFontSize": 8,
                  "highlightFontWeight": "normal",
                  "labelProperty": "label",
                  "mouseCursor": "pointer",
                  "opacity": 1,
                  "renderLabel": false,
                  "semanticStrokeWidth": false,
                  "strokeWidth": 4
                }
              }
        };
    }

    async componentDidMount() {
        let graph = await DataHandler.getGraphData();
        graph = await DataHandler.formatGraph(graph);
        console.log(JSON.stringify(graph));
        this.setState({
            graphData: graph
        });
    }

    render() {

        return (<div>
            {
                this.state.graphData &&
                (<Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={this.state.graphData}
                config={this.state.config}/> )
            }
            </div>
        );
    }
}

export default App;