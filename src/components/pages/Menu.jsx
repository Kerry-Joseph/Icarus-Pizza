import { Link } from 'react-router-dom'

import MenuItem from '../small_components/MenuItem'

import '../../style/pages/menu.scss'

export default function Menu({ menu }) {

  
  const MenuSection = ({ type }) => {
    const itemsForSection = menu.filter(item => item.itemType === type)
  
    return itemsForSection.map(item => (
      <MenuItem 
        key = {item._id}
        item = {item}/>
    ))
  }
  


  return (
    <main className='menu'>
      <h2 className='menu-title'>Menu</h2>
      <Link to='/create-pizza' className='menu__create-pizza'>
        <h1>Create Personal Pizza</h1>
      </Link>
      <Link to='/pizza-presets' className='menu__choose-preset'>
        <h1>Choose Pizza Preset</h1>
      </Link>
      <div>
        <h3>Pizzas</h3>
        <MenuSection 
          type = 'pizza'/>
      </div>
      <div>
        <h3>Wings</h3>
        <MenuSection 
          type = 'wings'/>
      </div>
      <div>
        <h3>Bread</h3>
        <MenuSection 
          type = 'bread'/>
      </div>
      <div>
        <h3>Desserts</h3>
        <MenuSection 
          type = 'dessert'/>
      </div>
      <div>
        <h3>Beverages</h3>
        <MenuSection 
          type = 'beverage'/>
      </div>
      <div>
        <h3>Sides</h3>
        <MenuSection 
          type = 'side'/>
      </div>
      <h1 className='menu__go-to-cart'>
        <Link to='/cart' >
            Go to cart
        </Link>
      </h1>
    </main>
  )
}