import './home.scss'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home({ menuData }) {

  console.log(menuData[0].name)

  return (
    <div className='home'>
      <Link to='/menu' className='router-link home__order-now'>
          Order Now
      </Link>
      <Link to='/deals' className='router-link home__featured-deal'>
          <h1>Featurd Deal</h1>
          <h2>Tom's Test Deal</h2>
      </Link>
      <section className='home__popular-items'>
        <h1>Popular Items</h1>
      </section>
    </div>
  )
}