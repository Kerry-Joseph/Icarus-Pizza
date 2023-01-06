import '../../style/pages/cart.scss'
// ---------------
import Orders from "../cart_components/Orders"
import Totals from "../cart_components/Totals"

export default function Cart() {

  const parsedCart = localStorage.cart ? JSON.parse(localStorage.cart) : []

  return (
    <div className="cart">
      <button onClick={() => {localStorage.cart = ''; window.location.reload()}} className='cart__clear-cart-button'>
        Clear Cart
      </button>

      <div className="cart__orders-container">
        {localStorage.cart === '' ? 'Your cart is empty' : <Orders parsedCart={parsedCart}/>}
      </div>

      <Totals parsedCart={parsedCart} />
      
    </div>
  )
}