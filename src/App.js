import './App.css';
import { useState, useEffect } from 'react';
import TitleCard from './components/TitleCard.js/TitleCard';
import Overview from './components/Overview/Overview';
import Forecast from './components/Forecast/Forecast';
import OverviewWeekly from './components/OverviewWeekly/OverviewWeekly';

function App() {
  const [city, setCity] = useState("群馬県");
  const [number, setNumber] = useState(130000);
  const [clicked, setClicked] = useState(true);
  const [cities, setCities] = useState([])
  const [citiesObj, setCitiesObj] = useState({})

  useEffect(() => {
    const loadCities = async () => {
      const url = `https://www.jma.go.jp/bosai/common/const/area.json`
      const data = await fetch(url).then(res => res.json())
      const officeObj = data.offices
      delete officeObj["014030"] // 十勝地方
      delete officeObj["460040"] // 奄美地方
      const cities = Object.keys(officeObj)
      setCitiesObj(officeObj)
      setCities(cities)
    }
    loadCities()
  }, [])

  const onClick = async () => {
    setClicked(false)
  }

  return (
    <>
    {clicked ? (
      cities.length == 0 ?
      (<div className="h-screen flex flex-col justify-center items-center"></div> ) :
      (<div className="h-screen flex flex-col justify-center items-center">
      <TitleCard text="気象庁JSON"/>
      <div>
        {
          <select onChange={(e) => {
            setCity(citiesObj[e.target.value].name);
            setNumber(e.target.value);
          }} className='border-2 border-gray-500 rounded-md p-1 m-1'>
            {
              cities.map(num => {
                return (
                  <option value={num}>{citiesObj[num].name}</option>
                )
              })
            }
          </select>
        }
        <button onClick={() => onClick()} className="border-2 border-gray-500 rounded-md p-1 m-1">検索</button>
      </div>
    </div>)
    ) : (
      <div className="h-screen p-10 flex flex-col items-center">
        <TitleCard text={city} />
        <Overview city={number} />
        {/* <OverviewWeekly city={number} /> */}
        <Forecast city={number} /> 
      </div>
    )}
    </>
  );
}

export default App;
