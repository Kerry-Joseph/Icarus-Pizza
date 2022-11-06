import './nav.scss'
import { Link } from 'react-router-dom'

export default function Nav() {


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
        <Link className='router-link' to='rewards'>
          <li>Rewards</li>
        </Link>
        <Link className='router-link' to='cart'>
          <li className='nav-dropdown--cart'>
            Cart 
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart image" />
          </li>
        </Link>
        <li className='nav-dropdown--find-local'>
          Find Local Icarus
          <img src="https://static.thenounproject.com/png/23179-200.png" alt="map dropper image" />
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