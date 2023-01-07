import '../../style/pages/home.scss'
// --------------
import { Link } from 'react-router-dom'
// --------------
import MenuItem from '../components/menu_item_components/MenuItem'

export default function Home({ menuData, dealsData }) {
  return (
    <div className='home'>

      <Link to='/menu' className='router-link home__order-now'>
          Order Now
      </Link>

      <Link to='/deals/Barry B BBQ' className='router-link home__featured-deal' style={{background: `url(${dealsData[1].img})`}}>
          <h1>Featured Deal</h1>
          <h2>Barry B BBQ</h2>
          <p>Three 10pc Honey BBQ Wings, three Sides, and a bottle of water</p>
      </Link>

      <section className='home_popular-items-section'>

        <h1 className='popular-items__title'>
          Popular Items
        </h1>

        <div className='popular-items__content'>
          <MenuItem       
            item = {menuData[0]} />
          <MenuItem 
            item = {menuData[1]} />
          <MenuItem 
            item = {menuData[11]} />
          <MenuItem             
            item = {menuData[3]} />
          <MenuItem             
            item = {menuData[4]} />
        </div>

      </section>

    </div>
  )
}