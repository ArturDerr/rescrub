import React from 'react'
import { Login } from './pages/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Registration } from './pages/registration/registration'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
