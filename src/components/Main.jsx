import { Routes, Route } from 'react-router-dom'

import Deals from './main_components/Deals'
import Menu from './main_components/Menu'
import Cart from './main_components/Cart'
import Rewards from './main_components/Rewards'
import Home from './main_components/Home'

import '../index.scss'

export default function Main() {
  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={
          <Home />
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