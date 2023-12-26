import React from 'react'
import { useEffect, useState } from 'react'

function Forecast({ city }) {
  const [forecast, setForecast] = useState([])
  useEffect(() => {
    loadForecast(city)
  }, [])
  return (
    <div className='w-full m-5 font-medium '>
      <div className='p-2 text-2xl border-solid border-black border-2 '>
        予報
      </div>
      <div id="overviewContent" className='m-3'>
      </div>
    </div>
  )
}

const loadForecast = async (city) => {
  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${ city }.json`
  const res = await fetch(url)
    .then(res => res.json())
    .then(data => {
      forecastNear(data[0])
      forecastWeek(data[1])
    })
  return res
}

const forecastWeek = async (obj) => {
  weeklyWeather(obj["timeSeries"][0])
  weeklyTemp(obj["timeSeries"][1])
}

/**
 * 週間気温
 * @param {*} obj 
 */
const weeklyTemp = (obj) => {
  console.log(obj)
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>週間気温</div>
  `;
  for (let i = 0; i < 7; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [_year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `<div class='text-xl ml-5'>${dateStr}</div>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const max = area["tempsMax"][i]
      const maxUpper = area["tempsMaxUpper"][i]
      const maxLower = area["tempsMaxLower"][i]
      const min = area["tempsMin"][i]
      const minUpper = area["tempsMinUpper"][i]
      const minLower = area["tempsMinLower"][i]
      html += 
        `<div class='ml-10'>最高気温： ${maxLower}℃ < ${max}℃ < ${maxUpper}℃</div>
        <div class='ml-10'>最低気温： ${minLower}℃ < ${min}℃ < ${minUpper}℃</div>`
    }
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}

/**
 * 週間天気
 * @param {*} obj 
 */
const weeklyWeather = (obj) => {
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>週間天気</div>
  `;
  for (let i = 0; i < 7; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `<div class='text-xl ml-5'>${dateStr}</div>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const pop = area["pops"][i]
      const reliability = area["reliabilities"][i]
      const weather = area["weatherCodes"][i]
      html += `<div class='ml-10'>${pop}％ ${reliability} ${weather}</div>`
    }
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}


/**
 * 直近の予報
 * @param {*} obj 
 */
const forecastNear = async (obj) => {
  probability6Hours(obj["timeSeries"][1])
  todayTomorrow(obj["timeSeries"][2])
  forecast3days(obj["timeSeries"][0])
}

/**
 * 直近6時間の降水確率
 * @param {*} obj 
 */
const probability6Hours = (obj) => {
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>6時間降水確率</div>
  `;
  for (let i = 0; i < 5; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [year, month, day] = date.split('-')
    const hour = timeDifine.split('T')[1].split(':')[0]
    const dateStr = `${month}月${day}日${hour}時`
    html += `<div class='text-xl ml-5'>${dateStr}</div>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const areaName = area["area"]["name"]
      const pop = area["pops"][i]
      html += `<div class='ml-10'>${areaName}: ${pop}％</div>`
    }
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}

/**
 * 今日・明日の最高・最低気温
 * @param {*} obj 
 */
const todayTomorrow = (obj) => {
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>今日・明日の最高・最低気温</div>
  `;
  for (let i = 0; i < 2; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [year, month, day] = date.split('-')
    const hour = timeDifine.split('T')[1].split(':')[0]
    const dateStr = `${month}月${day}日${hour}時`
    html += `<div class='text-xl ml-5'>${dateStr}</div>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const areaName = area["area"]["name"]
      const temp = area["temps"][i]
      html += `<div class='ml-10'>${areaName}: ${temp}℃</div>`
    }
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}

/**
 * 直近3日間の予報
 * @param {*} obj
 */
const forecast3days = async (obj) => {
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>3日予報</div>
  `;
  for (let i = 0; i < 3; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `<div class='text-xl ml-5'>${dateStr}</div>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const areaName = area["area"]["name"]
      const weatherCode = area["weatherCodes"][i]
      const weather = area["weathers"][i]
      const wind = area["winds"][i]
      html += `<div class='ml-10'>${areaName}: ${weatherCode} ${weather} ${wind}</div>`
    }
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}

export default Forecast