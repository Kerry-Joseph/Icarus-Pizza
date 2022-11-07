import './home.scss'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import MenuItem from '../module_components/MenuItem'

export default function Home({ menuData }) {



  return (
    <div className='home'>
      <Link to='/menu' className='router-link home__order-now'>
          Order Now
      </Link>
      <Link to='/deals' className='router-link home__featured-deal'>
          <h1>Featurd Deal</h1>
          <h2>Tom's Test Deal</h2>
      </Link>
      <section className='popular-items'>
        <h1 className='popular-items__title'>
          Popular Items
        </h1>
        <div className='popular-items__content'>
          <MenuItem 
            item = {menuData[0]} />
          <MenuItem 
            item = {menuData[1]} />
          <MenuItem 
            item = {menuData[2]} />
          <MenuItem 
            item = {menuData[3]} />
          <MenuItem 
            item = {menuData[4]} />
          
        </div>
      </section>
    </div>
  )
}