import './nav.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Nav() {

  const [cartQuantity, setCartQuantity] = useState(0)

  useEffect(() => {
    if(localStorage.cart === ''){
      setCartQuantity(0)
    } else {
      setCartQuantity(JSON.parse(localStorage.cart).length)
    }
  }, [cartQuantity])

  const showDropdown = () => {
    const dropdown = document.querySelector('.nav-dropdown')
    if(dropdown.style.display === 'none'){
      dropdown.style.display = 'block'
    } else {
      dropdown.style.display = 'none'
    }
  }


  // dropdown menu ---
  const Dropdown = () => {
    return (
      <ul className='nav-dropdown'>
        <Link className='router-link' to='/'>
          <li>Home</li>
        </Link>
        <Link className='router-link' to='/menu'>
          <li>Menu</li>
        </Link>
        <Link className='router-link' to='/deals'>
          <li>Deals</li>
        </Link>
        <Link className='router-link' to=''>
          <li>Rewards</li>
        </Link>
        <Link className='router-link' to='cart'>
          <li className='nav-dropdown--cart'>
            {cartQuantity === 0 ? 'cart' :  cartQuantity}
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart" />
          </li>
        </Link>
        <li className='nav-dropdown--find-local'>
          Find Local Icarus
          <img src="https://static.thenounproject.com/png/23179-200.png" alt="map dropper" />
        </li>
      </ul>
    )
  }

  
  return (
    <div className='outer-nav'>
      <nav className="nav">
        <img className='nav__logo' src="https://i.imgur.com/jTsNvXg.png" alt='icarus pizzs logo'/>
        <h1>Icarus Pizza</h1>
        <button className='nav__dropdown-button' onClick={showDropdown}>
          <img src="https://cdn-icons-png.flaticon.com/512/58/58497.png" alt="dropdown button" />
        </button>
        <Dropdown />
      </nav>
    </div>
  )
}