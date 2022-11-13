import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Menu from './main_components/Menu'
import Cart from './main_components/Cart'
import Rewards from './main_components/Rewards'
import Deals from './main_components/Deals'
import Home from './main_components/Home'
import SelectedDeal from './main_components/SelectedDeal'

import '../index.scss'

export default function Main() {

  // STATES ---
  const [menuData, setMenuData] = useState(null)
  const [dealsData, setDealsData] = useState(null)

  const { REACT_APP_API_MENU_URL, REACT_APP_API_DEALS_URL } = process.env

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

  const fetchDeals = async() => {
    try {
      const res = await fetch(REACT_APP_API_DEALS_URL)
      const data = await res.json()
      setDealsData(data)
    } catch(err) {
      console.log('failed to fetch deals')      
    }
  }



  useEffect(() => {
    fetchMenu()
    fetchDeals()
  },[])



  // LOADED RETURN ---
  const loaded = () => {
    return (
      <main className='main'>
        <Routes>
          <Route path='/' element={
            <Home 
              menuData = {menuData} />
          }/>
          
          <Route path='/menu' element={
            <Menu />
          }/>

          <Route path='/deals' element={
            <Deals 
              deals = {dealsData}/>
          }/>

          <Route path='/rewards'   element={
            <Rewards />
          }/>

          <Route path='/cart' element={
            <Cart />
          }/>

          <Route path='deals/:dealName' element={
            <SelectedDeal 
              deals = {dealsData} 
              menu = {menuData}/>
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
        {dealsData && menuData ? loaded() : loading()}
      </>
    )

}