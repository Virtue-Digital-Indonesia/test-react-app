import React, { useState, useEffect, useRef } from 'react'

// PDF PRINT
import ReactToPrint from 'react-to-print'

// QR CODE
import QRCode from 'qrcode'

// STYLES
import './App.scss'

function App() {
  const [ imageSourceList, setImageSource ] = useState(null)

  const firstSectionRef = useRef()
  const secondSectionRef = useRef()
  const thirdSectionRef = useRef()
  const forthSectionRef = useRef()

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
      <div
        className='section'
        ref={firstSectionRef}
      >
        {imageSourceList && <img src={imageSourceList[0]} alt=''/>}
        <p>{`Text: "${textList[0]}"`}</p>
      </div>

      {/* EXPORT BUTTON */}
      <ReactToPrint
        trigger={() =>
          <div className='export-button'>
            Export
          </div>
        }
        content={() => firstSectionRef.current}
      />

      {/* SECOND SECTION */}
      <div 
        className='section flex'
        ref={secondSectionRef}
      >
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
      <ReactToPrint
        trigger={() =>
          <div className='export-button'>
            Export
          </div>
        }
        content={() => secondSectionRef.current}
      />

      {/* THIRD SECTION */}
      <div 
        className='section flex'
        ref={thirdSectionRef}
      >
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
      <ReactToPrint
        trigger={() =>
          <div className='export-button'>
            Export
          </div>
        }
        content={() => thirdSectionRef.current}
      />

      {/* FORTH SECTION */}
      <div 
        className='section flex'
        ref={forthSectionRef}
      >
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
      <ReactToPrint
        trigger={() =>
          <div className='export-button'>
            Export
          </div>
        }
        content={() => forthSectionRef.current}
      />
    </div>
  )
}

export default App;
