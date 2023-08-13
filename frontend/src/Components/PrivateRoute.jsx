import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './Header'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {

    const { userInfo } = useSelector((state) => state.auth)

  return (
    userInfo ? 
    <>
        <Header  isAdmin={userInfo.isAdmin} userLogged={userInfo}/>
        <Outlet />
    </> :
    <Navigate to={'/'} replace/>
  )
}
