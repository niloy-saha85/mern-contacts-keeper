import React from 'react'
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Layout from "./layouts/Layout";
import Login from './login/Login';

const Main = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<RequireAuth />} >
        <Route path='/*' element={<Layout />} />
      </Route>
    </Routes>
  )
}

export default Main;