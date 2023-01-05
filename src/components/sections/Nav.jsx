import '../../style/sections/nav.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Nav() {

  const [cartQuantity, setCartQuantity] = useState(0)

  useEffect(() => {
    if(!localStorage.cart || localStorage.cart === ''){
      setCartQuantity(0)
      localStorage.cart = ''
    } else {
      setCartQuantity(JSON.parse(localStorage.cart).length)
    }
  }, [cartQuantity])

  let dropdown = useRef(null)
  
  const showDropdown = () => {
    if(dropdown.current.style.display === 'none' || !dropdown.current.style.display){
      dropdown.current.style.display = 'block'
    } else {
      dropdown.current.style.display = 'none'
    }
  }


  // dropdown menu ---
  const Dropdown = () => {
    return (
      <ul className='nav-dropdown' ref={dropdown}>
        <Link className='nav-link' to='/'>
          <li>Home</li>
        </Link>
        <Link className='nav-link' to='/menu'>
          <li>Menu</li>
        </Link>
        <Link className='nav-link' to='/deals'>
          <li>Deals</li>
        </Link>
        <Link className='nav-link' to=''>
          <li>Rewards</li>
        </Link>
        <Link className='nav-link' to='cart'> 
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
        <Link to='/'><h1>Icarus Pizza</h1></Link>
        <button className='nav__dropdown-button' onClick={showDropdown}>
          <img src="https://cdn-icons-png.flaticon.com/512/58/58497.png" alt="dropdown button" />
        </button>
        <Dropdown />
      </nav>
    </div>
  )
}