import React, { Component } from 'react';
import './App.css';
import RMGL from 'react-mst-grid-layout';
import GridElementDeadSimple from './elements/GridElementDeadSimple'

// Register our grid element implementation with a name
RMGL.GridElementSuper.register("simple", GridElementDeadSimple);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Publishing mock data to the grid
  handleSubmit(event){
    RMGL.PubSubAPI.publish(1, {some : "awesome", other : "we can" });
    setTimeout(function() {RMGL.PubSubAPI.publish(0, {some : "publish", other : "more" })}, 1000);
    setTimeout(function() {RMGL.PubSubAPI.publish(1, {some : "data", other : "all the time" })}, 2000);
    setTimeout(function() {RMGL.PubSubAPI.publish(0, {some : "to", other : "publishing channel" })}, 3000);
    setTimeout(function() {RMGL.PubSubAPI.publish(1, {some : "just keep", other : "feeding" })}, 4000);
    setTimeout(function() {RMGL.PubSubAPI.publish(0, {some : "like", other : "so" })}, 5000);
    setTimeout(function() {RMGL.PubSubAPI.publish(1, {some : "with", other : "data" })}, 6000);
    setTimeout(function() {RMGL.PubSubAPI.publish(0, {some : "and", other : "with" })}, 7000);
    setTimeout(function() {RMGL.PubSubAPI.publish(1, {some : "more", other : "data" })}, 8000);
  }
  
  // A handle on the default grid
  grid = RMGL.mstGrids.getGrid("defaultGrid");
  
  componentWillMount(){
    // Setting up layouts and initial subscription data
    // i is the component index, the rest of the params are react-grid-layout standard
    let layoutMap = { i: '0', x: 0, y: 0, w: 5, h: 5};
    this.grid.addMstGridItem( "simple", layoutMap, {some : "initial data", other : "more data" });
    layoutMap = { i: '1', x: 5, y: 0, w: 5, h: 5};
    this.grid.addMstGridItem( "simple", layoutMap, {some : "and even", other : "more data" });
  }

  render() {
    return (
      <div className="App">
        <header style={{height:'6em'}}>
          <p>The simplest possible demo of <a href="https://github.com/svenberglund/react-mst-grid-layout"><code>react-mst-grid-layout</code></a></p>
        </header>
        <RMGL.MstGridLayout  // The grid component
          compactType="vertical" // default : none
          breakpoint="lg" // default : 'lg' = 12 columns
          rowHeight={30} // default : 30
          gridStyle={{ backgroundColor: 'LightSteelBlue' }}
        />
        <br/>
        <form>
        <input type="button" value="Publish data!" onClick={this.handleSubmit}/>      
        </form>
      </div>
    );
  }
}

// Wiring publish channels to our grid items
RMGL.PubSubAPI.subscribe("defaultGrid",0, 0 );
RMGL.PubSubAPI.subscribe("defaultGrid",1, 1 );

export default App;
