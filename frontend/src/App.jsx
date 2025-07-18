import { useState } from 'react'
import './App.css'

function App() {
  const [wallet, setWallet] = useState(null)
  const [videos, setVideos] = useState([])
  const [audios, setAudios] = useState([])
  const [images, setImages] = useState([])

  const connectWallet = async () => {
    if (window?.solana?.isPhantom) {
      try {
        const resp = await window.solana.connect()
        setWallet(resp.publicKey.toString())
      } catch (err) {
        console.error('Wallet connection error', err)
      }
    } else {
      alert('Please install Phantom Wallet')
    }
  }

  const handleUpload = (e, type) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (type === 'video') setVideos(prev => [...prev, url])
    if (type === 'audio') setAudios(prev => [...prev, url])
    if (type === 'image') setImages(prev => [...prev, url])
    e.target.value = null
  }

  return (
    <div className="App">
      <header>
        <h1>KingFace</h1>
        {wallet ? (
          <p>Connected: {wallet.slice(0,4)}...{wallet.slice(-4)}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
      <div className="upload-bar">
        <label>
          Upload Video
          <input type="file" accept="video/*" onChange={e => handleUpload(e,'video')} />
        </label>
        <label>
          Upload Audio
          <input type="file" accept="audio/*" onChange={e => handleUpload(e,'audio')} />
        </label>
        <label>
          Upload Image
          <input type="file" accept="image/*" onChange={e => handleUpload(e,'image')} />
        </label>
      </div>
      <div className="columns">
        <div className="column">
          <h2>Videos</h2>
          {videos.map((v,i)=>(
            <video key={i} controls src={v}></video>
          ))}
        </div>
        <div className="column">
          <h2>Audios</h2>
          {audios.map((a,i)=>(
            <audio key={i} controls src={a}></audio>
          ))}
        </div>
        <div className="column">
          <h2>Images</h2>
          {images.map((img,i)=>(
            <img key={i} src={img} alt="upload" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
