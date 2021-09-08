import React, { useState } from 'react'

import QRCode from 'qrcode'

function App() {
  const [ imageSource, setImageSource ] = useState(null)

  const text = 'hello world!'

  QRCode.toDataURL(text)
  .then(url => {
    console.log(url)
    setImageSource(url)
  })
  .catch(err => {
    console.error(err)
  })

  return (
    <div>
      <div>
        {imageSource && <img src={imageSource} alt=''/>}
      </div>
      {text}
    </div>
  )
}

export default App;
