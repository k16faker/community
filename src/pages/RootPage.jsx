import { Outlet } from 'react-router-dom'

import React from 'react'
import Header from '../components/header/Header'

const RootPage = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default RootPage