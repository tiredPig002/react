import './App.css';
import { useState } from "react";
import data from "./assets/data.json"
import Item from "./components/GalleryItem.js";
import CheckBox from './components/CheckBox.js';
import Radio from './components/Radio.js'

function App() {
  // sort type 
  const [sortType, setSortType] = useState("Name");

  // aggregate stuff
  const [fav, setFav] = useState([]);
  const [showFav, setShowFav] = useState(false);
  const [aggregate, setAggr] = useState(0);

  // filters
  const [propFilter, setPropFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  

  function favButton(item){
    if (fav.includes(item)){
      return <button onClick={()=>removeFromFav(item)}>Remove From References</button>;
    } else {
      return <button onClick={()=>addToFav(item)}>Add To Refereces</button>;
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

  function selectSort(t) {
  // const selectSortType = eventKey => {
    setSortType(t);
  }

  function sortData() {
    switch(sortType){
      case "Name": return data.sort((a, b) => a.name.localeCompare(b.name));
      case "Cost": return data.sort((a,b)=> a.cost > b.cost? 1: -1);
      case "Rarity": return data.sort((a,b)=> a.rarity > b.rarity? 1: -1);
    }
  }

  function selectPropertyFilter(t) {
  // const selectPropertyFilter = eventKey => {
    if (!propFilter.includes(t)){
      setPropFilter([...propFilter, t]);
    } else {
      setPropFilter([...propFilter].filter(i => i !== t));
    }
  }

  const matchesPropertyFilter = item => {
    if (propFilter.every(f => item.properties.includes(f))) {
      return true;
    } else {
      return false;
    }
  }

  function selectTypeFilter(t) {
    if (!typeFilter.includes(t)){
      setTypeFilter([...typeFilter, t]);
    } else {
      setTypeFilter([...typeFilter].filter(i => i !== t));
    }
  }

  const matchesTypeFilter = item => {
    if (typeFilter.includes(item.type)) {
      return true;
    } else {
      return false;
    }
  }

  const filterData = list => {
    if(typeFilter.length == 0) {
      return list.filter(matchesPropertyFilter);
    } else {
      return list.filter(matchesPropertyFilter).filter(matchesTypeFilter);
    }
  }

  function selectShowFav(){
  // const selectShowFav = eventKey => {
    setShowFav(!showFav);
  }

  const checkFavorites = list => {
    if (showFav) {
      return list.filter(i => fav.includes(i));
    } else {
      return list;
    }
  }

  function reset(){
    setSortType("Name");
    setPropFilter([]);
    setTypeFilter([]);
    setFav([]);
    setShowFav(false);
    setAggr(0);
    document.getElementById('side-bar-form').reset();
  }
  function display() {
    const sortedData = sortData();
    const filteredData = filterData(sortedData);
    const displayedData = checkFavorites(filteredData);
    return displayedData.map((item, index) => 
      <Item key={index} item={item} addButton={favButton}/>
    )
  }

  return (
    <div className="App">
      <h1> DnD Magic Items Reference Sorter </h1>
      <div className='main-grid'>
        {/* side menu */}
        <div className='side-bar'>
        <form id="side-bar-form">
            <legend>Sort By</legend>
              <Radio key="a1" value="Name" form="sortBy" toSort={selectSort} d={true}/>
              <Radio key="a2" value="Cost" form="sortBy" toSort={selectSort} d={false}/>
              <Radio key="a3" value="Rarity" form="sortBy" toSort={selectSort} d={false}/>
            <br/>
            <legend>Properties</legend>
              <CheckBox key="b1" value="Healing" form="filter" toFilter={selectPropertyFilter}/>
              <CheckBox key="b2" value="Utility" form="filter" toFilter={selectPropertyFilter}/>
              <CheckBox key="b3" value="Consumable" form="filter" toFilter={selectPropertyFilter}/>
              <CheckBox key="b4" value="Attunement" form="filter" toFilter={selectPropertyFilter}/>
            <br/>
            <legend>Type</legend>
              <CheckBox key="c1" value="Potion" form="filter2" toFilter={selectTypeFilter}/>
              <CheckBox key="c2" value="Oil" form="filter2" toFilter={selectTypeFilter}/>
              <CheckBox key="c3" value="Weapon" form="filter2" toFilter={selectTypeFilter}/>
              <CheckBox key="c4" value="Magical Artifact" form="filter2" toFilter={selectTypeFilter}/>
            <br/>
            <legend>Other</legend>
              <CheckBox key="d1" value="References" form="other" toFilter={selectShowFav}/>
          </form>
          <div>
            <b>Total Cost:</b> {aggregate} gp
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
