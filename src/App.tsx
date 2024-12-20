import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar from './components/navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
}

export default App
