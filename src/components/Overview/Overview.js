import React from 'react'
import { useEffect } from 'react'

function Overview({ city }) {
  useEffect(() => {
    loadOverview(city).then(data => {
      const overviewText = document.getElementById('overviewText')
      overviewText.innerHTML = data.text
    })
  }, [])
  return (
    <div className='w-full m-5 font-medium'>
      <div className='p-2 text-2xl border-solid border-black border-2 '>
        概況文
      </div>
      <div id="overviewText" className='m-3'>
      </div>
    </div>
  )
}

const loadOverview = async (city) => {
  const url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/130000.json`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export default Overview