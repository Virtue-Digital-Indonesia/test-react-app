import React, { useState, useEffect } from 'react'

import QRCode from 'qrcode'

// STYLES
import './App.scss'

function App() {
  const [ imageSourceList, setImageSource ] = useState(null)

  const textList = [
    // FIRST SECTION
    'Hello world 0',
    // SECOND SECTION
    'Hello world 1', 'Hello world 2',
    // THIRD SECTION
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

      {/* FIRST SECTION */}
      <div className='section'>
        {imageSourceList && <img src={imageSourceList[0]} alt=''/>}
        <p>{`Text: "${textList[0]}"`}</p>
      </div>

      {/* EXPORT BUTTON */}
      <div className='export-button'>
        Export
      </div>

      {/* SECOND SECTION */}
      <div className='section flex'>
        {/* FIRST ITEM */}
        {imageSourceList && imageSourceList.map((item, index) => {
          if(index === 1 || index === 2) {
            return(
              <div key={index}>
                <img src={item} alt=''/>
                <p>{`Text: "${textList[index]}"`}</p>
              </div>
            )
          }
        })}
      </div>

      {/* EXPORT BUTTON */}
      <div className='export-button'>
        Export
      </div>

      {/* THIRD SECTION */}
      <div className='section flex'>
        {imageSourceList && imageSourceList.map((item, index) => {
          if(index > 2) {
            return(
              <div key={index}>
                <img src={item} alt=''/>
                <p>{`Text: "${textList[index]}"`}</p>
              </div>
            )
          }
        })}
      </div>

      {/* EXPORT BUTTON */}
      <div className='export-button'>
        Export
      </div>

      {/* FORTH SECTION */}
      <div className='section flex'>
        {imageSourceList && imageSourceList.map((item, index) => {
          if(index >= 0 && index <= 3) {
            return(
              <div key={index}>
                <img src={item} alt=''/>
                <p>{`Text: "${textList[index]}"`}</p>
              </div>
            )
          }
        })}
      </div>
      <div className='section flex'>
        {imageSourceList && imageSourceList.map((item, index) => {
          if(index >= 4 && index <= 6) {
            return(
              <div key={index}>
                <img src={item} alt=''/>
                <p>{`Text: "${textList[index]}"`}</p>
              </div>
            )
          }
        })}
      </div>

      {/* EXPORT BUTTON */}
      <div className='export-button'>
        Export
      </div>
    </div>
  )
}

export default App;
