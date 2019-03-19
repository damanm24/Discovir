import React, {
    Component
} from 'react';
import './App.css';
//import View from './components/containers/View'
import GraphViewer from './components/GraphViewer';



class App extends Component {
    render() {
        return ( 
        <div className="App"> 
            {/* <View></View> */}
            <GraphViewer> </GraphViewer> 
        </div>
        );
    }
}

export default App;