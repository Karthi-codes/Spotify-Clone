import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Display from './Components/Display'
import { useContext } from 'react'
import { PlayerContext } from './Context/Playercontext'

function App() {

  const {audioref,track}=useContext(PlayerContext);// this line is used to sends the music and its type to the next file

  return (
    <div className='h-screen bg-black'>

      <div className="h-[90%] flex">
        <Sidebar/>
        <Display/>
      </div>
        <Player/>
      <audio ref={audioref} src={track.file} preload='auto'></audio>
      
      
    </div>
  )
}

export default App
