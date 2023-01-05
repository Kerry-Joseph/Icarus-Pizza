import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Menu from '../pages/Menu'
import Cart from '../pages/Cart'
import Rewards from '../pages/Rewards'
import Deals from '../pages/Deals'
import Home from '../pages/Home'
import SelectedDeal from '../deal_components/SelectedDeal'
import CreatePizza from '../pages/CreatePizza'
import Presets from '../pages/Presets'

import '../../index.scss'


import { useCallback } from 'react'

export default function Main() {

  // STATES ---
  const [menuData, setMenuData] = useState(null)
  const [dealsData, setDealsData] = useState(null)
  const [presetsData, setPresetsData] = useState(null)

  const { REACT_APP_MENU_URL, REACT_APP_DEALS_URL, REACT_APP_CREATE_PRESET_URL, REACT_APP_PRESETS_URL } = process.env

  // API ---
  const fetchMenu = useCallback(async() => {
    try {
      const res = await fetch(REACT_APP_MENU_URL)
      const data = await res.json()
      setMenuData(data)
    } catch (err) {
      console.log('failed to fetch menu')
    }
  }, [REACT_APP_MENU_URL])

  const fetchDeals = useCallback(async() => {
    try {
      const res = await fetch(REACT_APP_DEALS_URL)
      const data = await res.json()
      setDealsData(data)
    } catch(err) {
      console.log('failed to fetch deals')      
    }
  }, [REACT_APP_DEALS_URL])

  const fetchPresets = useCallback(async() => {
    try {
      const res = await fetch(REACT_APP_PRESETS_URL)
      const data = await res.json()
      setPresetsData(data)
    } catch(err) {
      console.log('failed to fetch presets')      
    }
  }, [REACT_APP_PRESETS_URL])

  const createPreset = async(preset) => {
    try {
      await fetch(REACT_APP_CREATE_PRESET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(preset), 
      })
    } catch(err) {
      console.log('failed to make post request for preset')
    }
  }



  useEffect(() => {
    fetchMenu()
    fetchDeals()
    fetchPresets()
  },[fetchMenu, fetchDeals, fetchPresets])



  // LOADED RETURN ---
  const loaded = () => {
    return (
      <main className='main'>
        <Routes>
          <Route path='/' element={
            <Home 
              menuData = {menuData}
              dealsData = {dealsData} />
          }/>
          
          <Route path='/menu' element={
            <Menu 
              menu = {menuData}/>
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
          
          <Route path='/create-pizza' element={
            <CreatePizza 
              createPreset = {createPreset}/>
          }/>

          <Route path='/pizza-presets' element={
            <Presets
              presets = {presetsData}/>
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
        {dealsData && menuData && presetsData ? loaded() : loading()}
      </>
    )

}