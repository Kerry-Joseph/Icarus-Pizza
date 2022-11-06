import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Deals from './main_components/Deals'
import Menu from './main_components/Menu'
import Cart from './main_components/Cart'
import Rewards from './main_components/Rewards'
import Home from './main_components/Home'

import '../index.scss'

export default function Main() {

  // STATES ---
  const [menuData, setMenuData] = useState(null)


  const { REACT_APP_API_MENU_URL } = process.env

  // API ---
  const fetchMenu = async() => {
    try {
      const res = await fetch(REACT_APP_API_MENU_URL)
      const data = await res.json()
      setMenuData(data)
    } catch (err) {
      console.log('failed to fetch menu')
    }
  }

  useEffect(() => {
    fetchMenu()
  },[])


  // LOADED RETURN ---
  const loaded = () => {
    return (
      <main className='main'>
        <Routes>
          <Route path='/' element={
            <Home menuData = {menuData} />
          }/>
          <Route path='/menu' element={
            <Menu />
          }/>
          <Route path='/deals' element={
            <Deals />
          }/>
          <Route path='/rewards' element={
            <Rewards />
          }/>
          <Route path='/cart' element={
            <Cart />
          }/>
        </Routes>
      </main>
    )  
  }

  const loading = () => {
    return (
     <main>
      loading...
     </main>
    )
  }

  return (
      <>
        {menuData ? loaded() : loading()}
      </>
    )

}