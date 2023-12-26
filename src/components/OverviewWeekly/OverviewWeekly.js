import React from 'react'
import { useEffect } from 'react'

function OverviewWeekly({ city }) {
  useEffect(() => {
    loadForecast(city)
  }, [])
  return (
    <div className='w-full m-5 font-medium '>
      <div className='p-2 text-2xl border-solid border-black border-2 '>
        週間予報概況文
      </div>
      <div id="overviewWeekly" className='m-3'>
      </div>
    </div>
  )
}

const loadForecast = async (city) => {
  const url = `https://www.jma.go.jp/bosai/forecast/data/overview_week/${ city }.json`
  const res = await fetch(url)
    .then(res => res.json())
    .then(data => {
      const overviewWeekly = document.getElementById('overviewWeekly')
      const textArray = data.text.split('\n')
      for (const text of textArray) {
        console.log(text)
        if (text === '') {
          overviewWeekly.innerHTML += `<div class='mb-2 border-solid border-b-4 w-full'></div>`;
        } else {
          overviewWeekly.innerHTML += `<div>${text}</div>`;
        }
      }
      
    })
  return res
}

export default OverviewWeekly