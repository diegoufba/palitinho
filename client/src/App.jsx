import { useState } from 'react'
import './App.css'
import Join from './components/Join/Join'
import Game from './components/Game/Game'
// import Chat from './components/Chat/Chat'

function App() {
  const [chatVisibility, setchatVisibility] = useState(false)
  const [socket,setSocket] = useState(null)

  return (
    <>
      {chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setchatVisibility={setchatVisibility} />}
      {/* {chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setchatVisibility={setchatVisibility} />} */}
    </>
  )
}

export default App
