import './App.css';
import { useEffect, useState } from "react";
import data from "./assets/data.json"
import Item from "./components/GalleryItem.js"
import CheckItem from "./components/CheckItem.js"
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

function App() {
  const [showing, setShow] = useState([...data]);
  const [fav, setFav] = useState([]);
  const [aggregate, setAggr] = useState(0);
  const [colorFilters, setColors] = useState([]);
  // const [edibleFilter, setEdible] = useState(false);
  // const [favFilter, setFavFilter] = useState(false);
  // useEffect(() => {
  //     console.log(showing, colorFilters);
  // }, [showing, colorFilters])

  function favButton(item){
    if (fav.includes(item)){
      return <button onClick={()=>removeFromFav(item)}>Remove From Favorites</button>
    } else {
      return <button onClick={()=>addToFav(item)}>Add To Favorites</button>
    }
  }

  function addToFav(item){
    setFav([...fav, item]);
    setAggr(aggregate + item.cost);
  }

  function removeFromFav(item){
    setFav([...fav].filter(i => i.name !== item.name));
    setAggr(aggregate - item.cost);
  }


  function sortByName(){
    setShow([...showing].sort((a, b) => a.name.localeCompare(b.name)));
  }

  function sortByValue(){
    setShow([...showing].sort((a,b)=> a.cost < b.cost? 1: -1));
  }

  function addColor(c){
    setColors([...colorFilters, c]);
  }

  function removeColor(c){
    setColors([...colorFilters].filter(f => f !== c))
  }

  function toggleColor(c){
    if (colorFilters.includes(c)){
      removeColor(c);
    } else {
      addColor(c);
    }
    {applyColorFilters()};
  }
  
  function applyColorFilters() {
    // setShow([...unfilteredData]);
    setShow([...data].filter(i => colorFilters.every(c => i.color.includes(c))));
  }

  function reset(){
    setFav([]);
    setAggr(0);
    setShow([...data]);
    document.getElementById('side-bar-form').reset();
  }

  function display() {
    return showing.map((item, index) => 
      <Item key={index} item={item} addButton={favButton}/>
    )
  }

  return (
    <div className="App">
      <h1> Mushroom Foraging Helper! </h1>
      <div className='main-grid'>
        {/* side menu */}
        <div className='side-bar'>
          <form id="side-bar-form">
            <legend>Sort By</legend>
              <div>
                  <input type="radio" id="a1" name="Sort" onChange={sortByName} defaultChecked/>
                  <label for="a1">Name</label><br/>
              </div>
              <div>
                  <input type="radio" id="a2" name="Sort" onChange={sortByValue}/>
                  <label for="a2">Market Value</label><br/>
              </div>
              {/* <RadioItem key="a1" value="Name" form="sortBy" toSort={sortByName}/>
              <RadioItem key="a2" value="Market Value" form="sortBy" toSort={sortByValue}/> */}
            <br/>
            <legend>Color</legend>
              <CheckItem key="b1" value="Brown" form="color" toFilter={toggleColor}/>
              <CheckItem key="b2" value="White" form="color" toFilter={toggleColor}/>
              <CheckItem key="b3" value="Yellow" form="color" toFilter={toggleColor}/>
              <CheckItem key="b4" value="Orange" form="color" toFilter={toggleColor}/>
              <CheckItem key="b5" value="Black" form="color" toFilter={toggleColor}/>
              <CheckItem key="b6" value="Red" form="color" toFilter={toggleColor}/>
            <br/>
            {/* <legend>Is Edible</legend>
              <CheckItem key="c1" value="Is Edible" form="canEat"/>
            <br/> */}
            <legend>Other</legend>
              <CheckItem key="c1" value="Is Edible" form="canEat"/>
              <CheckItem key="c2" value="Favorites" form="other"/>
          </form>
          <div>
            <b>Coolness Points:</b> {aggregate}
          </div>
          <br></br>
          <button onClick={()=>reset()}>Reset</button>
        </div>


        {/* gallery */}
        <div className='gallery'>
          {display()}
        </div>
      </div>
    </div>
  );
}

export default App;
