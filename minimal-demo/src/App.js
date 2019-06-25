import React, { Component } from 'react';
import './App.css';
import RMGL from 'react-mst-grid-layout';
import GridElementDeadSimple from './elements/GridElementDeadSimple'


// Register our grid element implementation with a name
RMGL.GridElementSuper.register("simple", GridElementDeadSimple);


class App extends Component {
  
  // A handle on the default grid in mstGrids class
  grid = RMGL.mstGrids.getGrid("defaultGrid");
  
  componentWillMount(){

    // Setting up layout and initial subscription data to enable adding the grid
    // i is the component index, the rest of the params are react-grid-layout standard
    let layoutMap = { i: '0', x: 0, y: 0, w: 4, h: 3};
    this.grid.addMstGridItem( "simple", layoutMap, {data: "initial data" });


  }


  
  render() {
    return (
      <div className="App">
        <header style={{height:'6em'}}>
          <p>The simplest possible demo of react-mst-grid-layout</p>
        </header>


        <RMGL.MstGridLayout  // The grid component
          compactType="vertical" // default : none
          breakpoint="lg" // default : 'lg' = 12 columns
          rowHeight={30} // default : 30
          gridStyle={{ backgroundColor: 'LightSteelBlue' }}
        />





      </div>
    );
  }
}

// Wiring a publish channel (1) to our grid item (1)
RMGL.PubSubAPI.subscribe("defaultGrid",1, 1 );

export default App;
