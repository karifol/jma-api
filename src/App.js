import './App.css';
import { useState } from 'react';
import TitleCard from './components/TitleCard.js/TitleCard';
import Overview from './components/Overview/Overview';
import Forecast from './components/Forecast/Forecast';

function App() {
  const [city, setCity] = useState('東京');
  const [clicked, setClicked] = useState(true);
  return (
    <>
    {clicked ? (
      <div className="h-screen flex flex-col justify-center items-center">
      <TitleCard text="気象庁API"/>
      <div>地点名を入力してください</div>
      <div>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='border-2 border-gray-500 rounded-md p-1 m-1'/>
        <button onClick={() => {setClicked(false)}} className="border-2 border-gray-500 rounded-md p-1 m-1">検索</button>
      </div>
    </div>
    ) : (
      <div className="h-screen p-10 flex flex-col items-center">
        <TitleCard text={city} />
        <Overview city={city} />
        <Forecast city={city} />
      </div>
    )}
    </>
  );
}

export default App;
