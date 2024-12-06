  import React from 'react'
  import './App.css'
  import Register from './Register'
  import Login from './Login'
  import Home from './Home'
import { Route, Routes } from 'react-router-dom'
  
  const App = () => {
    return (

      <main className='App'>
        
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
       
      </main>
    )
  }
  
  export default App
  