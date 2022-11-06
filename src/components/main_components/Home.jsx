import './home.scss'

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='home'>
      <Link to='/menu' className='router-link home__order-now'>
          Order Now
      </Link>
      <Link to='/deals/add' className='router-link home__featured-deal'>
          <h1>Featurd Deal</h1>
          <h2>Tom's Test Deal</h2>
      </Link>
      <section className='home__popular-items'>
        <h1>Popular Items</h1>
      </section>
    </div>
  )
}