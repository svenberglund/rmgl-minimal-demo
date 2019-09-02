import React, { Component } from 'react';
import './App.css';
import RMGL from 'react-mst-grid-layout';
import GridElementDeadSimple from './elements/GridElementDeadSimple'

// Register our grid element implementation with a name
GridElementDeadSimple.register("simple", GridElementDeadSimple);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  data =[{some : "publish", other : "more" },
  {some : "data", more : "all the time" },
  {some : "to", other : "publishing channel"}, 
  {some : "just keep", more : "feeding" }, 
  {some : "like", other : "so" },
  {some : "with", more : "data" },
  {some : "and", other : "with" },
  {some : "more", more : "data" },
  ];

  getPromise = () => new Promise((resolve, reject) => {
    setTimeout(resolve,250)
  })


  // Publishing data data to the grid on channels 0 and 1
  handleSubmit(event){
    RMGL.PubSubAPI.publish(1, {some : "Awesome!", other : "Now we can" });
    var myPromise = this.getPromise();
    for(let i=0; i<40; i++){
      myPromise = myPromise.then(
        () => {
          RMGL.PubSubAPI.publish(i%2, this.data[i%8]);
          return this.getPromise() // a neat little trick for chaining. 
        }
      )
    }
  }
  
  // A handle on the default grid
  grid = RMGL.mstGrids.getGrid("defaultGrid");
  
  componentWillMount(){
    // Setting up layouts and initial subscription data
    // i is the component index, the rest of the params are react-grid-layout standard
    let layoutMap = { i: '0', x: 0, y: 0, w: 5, h: 5};
    this.grid.addMstGridItem( "simple", layoutMap, {some : "initial data", other : "more data" });
    layoutMap = { i: '1', x: 5, y: 0, w: 5, h: 5};
    this.grid.addMstGridItem( "simple", layoutMap, {some : "and even", more : "more data" });
  }

  render() {
    return (
      <div className="App">
        <header style={{height:'6em'}}>
          <p>This is a simplistic demo of <a href="https://github.com/svenberglund/react-mst-grid-layout"><code><strong>react-mst-grid-layout</strong></code></a>.<br/>
            It is mostly ment as a <a href="https://github.com/svenberglund/rmgl-minimal-demo">getting-started code-example</a>.<br/> 
            For the full capabilities of this framework take a look
            at the <a href="https://svenberglund.github.io/react-mst-grid-layout/">full blown demo</a>.
            
          </p>
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
