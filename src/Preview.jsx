import React from 'react'
import { Outlet } from 'react-router'

const Preview = () => {
  return (
    <div>
        {<Outlet />}
    </div>
  )
}

export default Preview