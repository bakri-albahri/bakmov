import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import App from './App'
import Preview from './Preview'

const GitHub = () => {
  return (
    <>
        <Routes>
            <Route path='/bakmov' element={<Preview />}>
                <Route path='/' element={<App />} />
            </Route>
        </Routes>
    </>
  )
}

export default GitHub