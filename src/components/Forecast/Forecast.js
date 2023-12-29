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
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>週間気温</div>
  `;
  html += `<table class='ml-5'>`
  html += `
    <tr>
      <th></th>`
  const areas = obj["areas"]
  for (const area of areas) {
    const areaName = area["area"]["name"]
    html += `<th class='px-5'>${areaName}</th>`
  }
  html += `</tr>`
  for (let i = 0; i < 7; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [_year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `<tr class='border-b-2'><td class='text-xl py-2 px-5'>${dateStr}</td>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const tempMaxRaw = area["tempsMax"][i]
      const tempMinRaw = area["tempsMin"][i]
      const tempMax = tempMaxRaw ? `${tempMaxRaw}` : "-"
      const tempMin = tempMinRaw ? `${tempMinRaw}` : "-"
      html += `
      <td class='items-center'>
        <div class='justify-center items-center'>
          <div class='flex items-center content-center justify-center'>
            <div class='text-xl text-center'>${tempMax}</div>
            <div>℃</div>
          </div>
          <div class='flex items-center content-center justify-center'>
            <div class='text-xl'>${tempMin}</div>
            <div>℃</div>
          </div>
        </div>
      </td>`
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
  html += `<table class='ml-5'>`
  html += `
    <tr>
      <th></th>`
  const areas = obj["areas"]
  for (const area of areas) {
    const areaName = area["area"]["name"]
    html += `<th class='px-5'>${areaName}</th>`
  }
  html += `</tr>`
  for (let i = 0; i < 7; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [_year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `<tr class='border-b-2'><td class='text-xl py-2 px-5'>${dateStr}</td>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const popRaw = area["pops"][i]
      const pop = popRaw ? `${popRaw}％` : "-"
      const weather = area["weatherCodes"][i]
      const reliabilityRaw = area["reliabilities"][i]
      const reliability = reliabilityRaw  ? `${reliabilityRaw}` : "-";
      html += `
      <td class='text-center'>
        <div class='justify-center	items-center'>
          <div>${weather}</div>
          <div>${pop}</div>
          <div>${reliability}</div>
        </div>
      </td>`
    }

    html += `</tr>`
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
  html += `<table class='ml-5'>`
  html += `
    <tr>
      <th></th>
  `
  const areas = obj["areas"]
  for (const area of areas) {
    const areaName = area["area"]["name"]
    html += `<th class='px-5'>${areaName}</th>`
  }
  html += `</tr>`
  for (let i = 0; i < 5; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [year, month, day] = date.split('-')
    const hour = timeDifine.split('T')[1].split(':')[0]
    const dateStr = `${month}月${day}日${hour}時`
    html += `
      <tr class='border-b-2'>
        <td class='text-xl py-2 px-5'>${dateStr}</td>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const areaName = area["area"]["name"]
      const pop = area["pops"][i]
      html += `
      <td class='text-center'>
        <div class='flex justify-center	items-center'>
          <div class='text-xl'>${pop}</div>
          <div>％</div>
        </div>
      </td>`
    }
    html += `</tr>`
  }
  html += `</table>`
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
  html += `<table class='ml-5'>`
  html += `
    <tr>
      <th></th>`
  const areas = obj["areas"]
  for (const area of areas) {
    const areaName = area["area"]["name"]
    html += `<th class='px-5'>${areaName}</th>`
  }
  html += `</tr>`
  for (let i = 0; i < 2; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [_year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `
      <tr class='border-b-2'>
        <td class='text-xl py-2 px-5'>${dateStr}</td>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const areaName = area["area"]["name"]
      const temp = area["temps"][i]
      html += `
      <td class='text-center'>
        <div class='flex justify-center	items-center'>
          <div class='text-xl'> ${temp}</div>
          <div>℃</div>
        </div>
      </td>`
    }
    html += `</tr>`
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}

/**
 * 直近3日間の予報
 * @param {*} obj
 */
const forecast3days = async (obj) => {
  console.log(obj)
  const timeDifines = obj["timeDefines"]
  let html = `
    <div class='my-5'>
      <div class='text-2xl mb-2 border-double border-b-4'>3日予報</div>
  `;
  html += `<table class='ml-5'>`
  html += `
    <tr>
      <th></th> `
  const areas = obj["areas"]
  for (const area of areas) {
    const areaName = area["area"]["name"]
    html += `<th class='px-5'>${areaName}</th>`
  }
  html += `</tr>`
  for (let i = 0; i < 3; i++) {
    const timeDifine = timeDifines[i]
    const date = timeDifine.split('T')[0]
    const [year, month, day] = date.split('-')
    const dateStr = `${month}月${day}日`
    html += `
      <tr class='border-b-2'>
        <td class='text-xl py-2 px-5'>${dateStr}</td>`
    // areas
    const areas = obj["areas"]
    for (const area of areas) {
      const areaName = area["area"]["name"]
      const weather = area["weathers"][i]
      html += `
      <td class='text-center'>
        <div class='flex justify-center	items-center'>
          <div>${weather}</div>
        </div>
      </td>`
    }

    html += `</tr>`
  }
  html += `</div>`
  document.getElementById('overviewContent').innerHTML += html
}

export default Forecast