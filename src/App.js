import React, { useState, useEffect } from 'react'

import QRCode from 'qrcode'

// STYLES
import './App.scss'

function App() {
  const [ imageSourceList, setImageSource ] = useState(null)

  const textList = [
    // FIRST EXPORT
    'Hello world 0',
    // SECOND EXPORT
    'Hello world 1', 'Hello world 2',
    // THIRD EXPORT
    'Hello world 3', 'Hello world 4',
    'Hello world 5', 'Hello world 6',
  ]

  const generateQR = async (text, index) => {
    try {
      const url = await QRCode.toDataURL(text)
      console.log(`index: ${index}, url: ${url}`)
      return url
    } catch (err) {
      console.log(`index: ${index}, error: ${err}`)
      return err
    }
  }

  const generateImageList = async (list) => {
    let output = []
    for(let i = 0; i < list.length; i++) {
      const item = list[i]
      const url = await generateQR(item, i)
      output.push(url)
    }
    setImageSource(output)
  }

  useEffect(() => {
    generateImageList(textList)
  }, [])

  return (
    <div className='root'>
      <div>
        {imageSourceList && <img src={imageSourceList[0]} alt=''/>}
        <p>{textList[0]}</p>
        <div className='export-button'>
          Export
        </div>
      </div>
    </div>
  )
}

export default App;
