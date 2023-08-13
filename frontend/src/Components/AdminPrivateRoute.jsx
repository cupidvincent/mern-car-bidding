import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './Header'
import { Outlet, Navigate } from 'react-router-dom'

export default function AdminPrivateRoute() {

    const { userInfo } = useSelector((state) => state.auth)

  return (
    userInfo && userInfo.isAdmin ? 
    <>
        <Header  isAdmin={true} userLogged={userInfo}/>
        <Outlet />
    </> :
    <Navigate to={'/'} replace/>
  )
}
