import React from 'react'
import { useEffect } from 'react'

function Overview({ city }) {
  useEffect(() => {
    loadOverview(city).then(data => {
      const overviewText = document.getElementById('overviewText')
      const textArray = data.text.split('\n')
      for (const text of textArray) {
        if (text === '') {
          overviewText.innerHTML += `<div class='mb-2 border-solid border-b-4 w-full'></div>`;
        } else {
          overviewText.innerHTML += `<div>${text}</div>`;
        }
      }
    })
  }, [])
  return (
    <div className='w-full m-5 font-medium'>
      <div className='p-2 text-2xl border-solid border-black border-2 '>
        短期予報概況文
      </div>
      <div id="overviewText" className='m-3'>
      </div>
    </div>
  )
}

const loadOverview = async (city) => {
  const url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${ city }.json`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export default Overview