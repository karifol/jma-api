import './App.css';
import { useState, useEffect } from 'react';
import TitleCard from './components/TitleCard.js/TitleCard';
import Overview from './components/Overview/Overview';
import Forecast from './components/Forecast/Forecast';
import OverviewWeekly from './components/OverviewWeekly/OverviewWeekly';

function App() {
  const [city, setCity] = useState("東京");
  const [number, setNumber] = useState(130000);
  const [clicked, setClicked] = useState(true);
  const [cities, setCities] = useState([])
  const [citiesObj, setCitiesObj] = useState({})

  useEffect(() => {
    const loadCities = async () => {
      const url = `https://www.jma.go.jp/bosai/common/const/area.json`
      const res = await fetch(url)
      const data = await res.json()
      const officeObj = data.offices
      const cities = Object.keys(officeObj)
      setCitiesObj(officeObj)
      setCities(cities)
    }
    loadCities()
  }, [])

  const onClick = async () => {
    // const number = cityToNumber(city)
    // setNumber(number)
    setClicked(false)
  }

  return (
    <>
    {clicked ? (
      cities.length == 0 ?
      (<div className="h-screen flex flex-col justify-center items-center"></div> ) :
      (<div className="h-screen flex flex-col justify-center items-center">
      <TitleCard text="気象庁JSON"/>
      <div>地点名を入力してください</div>
      <div>
        {
          <select onChange={(e) => {
            setCity(citiesObj[e.target.value].name);
            setNumber(e.target.value);
          }} className='border-2 border-gray-500 rounded-md p-1 m-1'>
            {
              cities.map(city => {
                return (
                  <option value={city} key={city}>{citiesObj[city].name}</option>
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
        {/* <OverviewWeekly city={number} />
        <Forecast city={number} /> */}
      </div>
    )}
    </>
  );
}

const loadCities = async () => {
  const url = `https://www.jma.go.jp/bosai/common/const/area.json`
  const res = await fetch(url)
  const data = await res.json()
  const officeObj = data.offices
  return officeObj
}

const cityToNumber = (city) => {
  switch (city) {
    case "東京":
      return 130000
    case "大阪":
      return 270000
    case "名古屋":
      return 230000
    case "札幌":
      return 110000
    case "仙台":
      return 400000
    case "広島":
      return 340000
    case "福岡":
      return 400000
    case "那覇":
      return 471010
    default:
      return 130000
  }
}

export default App;
