import React from 'react'
import { useEffect } from 'react'

function Overview({ city }) {
  // useEffect(() => {
  //   loadOverview(city).then(data => {
  //     console.log(data)
  //     const overviewText = document.getElementById('overviewText')
  //     overviewText.innerHTML = data.text
  //   })
  // }, [])
  return (
    <div className='w-full m-5 border-solid border-black border-2 rounded-lg font-medium'>
      <div className='p-2 bg-slate-500 text-white text-2xl rounded-t-lg'>
        概況文
      </div>
      <div id="overviewText" className='m-3'>
        本州付近は高気圧に覆われています。一方、伊豆諸島付近は気圧の谷となっています。 　東京地方は、おおむね晴れています。 　２４日は、高気圧に覆われるため、晴れるでしょう。 　２５日も、高気圧に覆われるため、おおむね晴れる見込みです。 【関東甲信地方】 　関東甲信地方は、晴れや曇りとなっています。 　２４日は、高気圧に覆われますが、気圧の谷や湿った空気の影響を受ける見込みです。このため、晴れや曇りで、伊豆諸島では雨の降る所があるでしょう。長野県北部では寒気の影響で夜は雪や雨の降る所がある見込みです。 　２５日は、高気圧に覆われますが、気圧の谷や湿った空気の影響を受ける見込みです。このため、晴れや曇りで、伊豆諸島では雨の降る所があるでしょう。関東地方北部と長野県北部では、寒気の影響で朝晩は雪や雨の降る所がある見込みです。 　関東地方と伊豆諸島の海上では、２４日は波がやや高く、２５日は波が高い見込みです。船舶は高波に注意してください。
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