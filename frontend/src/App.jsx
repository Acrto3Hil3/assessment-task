import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FrontendApp from './pages/ForntendApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FrontendApp/>
    </>
  )
}

export default App
