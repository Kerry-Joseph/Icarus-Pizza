import './home.scss'

import { Link } from 'react-router-dom'

import MenuItem from '../module_components/MenuItem'

export default function Home({ menuData }) {

  return (
    <div className='home'>

      <Link to='/menu' className='router-link home__order-now'>
          Order Now
      </Link>

      <Link to='/deals' className='router-link home__featured-deal'>
          <h1>Featured Deal</h1>
          <h2>Tom's Test Deal</h2>
      </Link>

      <section className='home_popular-items-section'>
        <h1 className='popular-items__title'>
          Popular Items
        </h1>
        <div className='popular-items__content'>
          <MenuItem 
            className = "home-item-1"
            item = {menuData[0]} />
          <MenuItem 
            id = "home-item-2"
            item = {menuData[1]} />
          <MenuItem 
            id = "home-item-3"
            item = {menuData[2]} />
          <MenuItem 
            id = "home-item-4"
            item = {menuData[3]} />
          <MenuItem 
            id = "home-item-5"
            item = {menuData[4]} />
        </div>
      </section>
    </div>
  )
}