import { useEffect, useState } from "react" 

import '../../style/pages/cart.scss'

export default function Cart() {
  const parsedCart = localStorage.cart ? JSON.parse(localStorage.cart) : []

  const [subtotal, setSubtotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)

  

  const deleteItem = (id) => {
    const cartWithoutDeletedItem = JSON.parse(localStorage.cart).filter(item => item.id !== id)
    localStorage.cart = JSON.stringify(cartWithoutDeletedItem)
  }


  
  
  
  
  const getSubtotal = () => {
    setSubtotal(0)
    parsedCart.forEach(item => {
      setSubtotal(prev => prev + item.price)
    })
  }

  useEffect(() => {
    getSubtotal()
  }, [parsedCart])
  
  const tax = Math.round((subtotal * .0269) * 100)/100
  const subtotalWithTax = (Math.round(tax * 100)/100) + subtotal
  const subtotalTaxAndDeliveryFee = Math.round((subtotalWithTax + deliveryFee) * 100)/100

  
  
  // COMPONENTS ---- 
  
  const Orders = () => {  
    return parsedCart.map(item => (
      Order(item)
    ))
  }


  const Order = (item) => {
    if(item.type === 'preset'){
      return (
        <div key={item.id} className='cart__order'>
          <h1>{item.name} | Pizza Preset</h1>
          <p>{item.content}</p>
          <p className="order__price">{item.price}$</p>
          <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
        </div>
      )
    } else if(item.type === 'personal pizza'){
      return (
        <div key={item.id} className='cart__order'>
          <h1>Personal Pizza</h1>
          <p>{item.content}</p>
          <p className="order__price">{item.price}$</p>
          <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
        </div>
      )
    } else if(item.type === 'deal'){
      return(
        <div key={item.id} className='cart__order'>
          <h1>{item.name} Deal</h1>
          <p>{item.content.join(', ')}</p>
          <p className="order__price">{item.price}$</p>          
          <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
        </div>
      )
    } else if(item.type === 'pizza' || item.type === 'wings'){
      return(
        <div key={item.id} className='cart__order'>
          <h1><span>{item.size}</span> {item.name}{item.quantity > 1 ? `, x${item.quantity}` : ''}</h1>
          <p className="order__price">{item.price}$</p>
          <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
        </div>
      )
    } else {
      return (
        <div key={item.id} className='cart__order'>
          <h1>{item.name}{item.quantity > 1 ? `, x${item.quantity}` : ''}</h1>
          <p className="order__price">{item.price}$</p>
          <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
        </div>
      )
    }
  }



  return (
    <div className="cart">
      <button onClick={() => {localStorage.cart = ''; window.location.reload()}} className='cart__clear-cart-button'>
        Clear Cart
      </button>

      <div className="cart__orders-container">
        {localStorage.cart === '' ? 'Your cart is empty' : <Orders />}
      </div>
      <div className="cart__total">
        <button 
          onClick={() => {deliveryFee ? setDeliveryFee(0) : setDeliveryFee(4.99)}}
          className='cart__delivery-button'
          style={deliveryFee ? {backgroundColor: 'lightgreen'} : {}}>
          {deliveryFee ? 'Delivery' : 'Switch to delivery'}
        </button>
        <h2>
          Subtotal:
          <span>
            ${Math.round((subtotal) * 100)/100} 
          </span>
        </h2>
        <h2>
          Tax:
          <span>
            ${tax}
          </span>
        </h2>
        <h2 style={deliveryFee ? {} : {display: 'none'}}>
          Delivery Fee:
          <span>
            ${deliveryFee}
          </span>
        </h2>
        <h2 className="cart__total--complete">
          Total:
          <span>
            ${subtotalTaxAndDeliveryFee}
          </span>
        </h2>
        <button className="cart__checkout-button">Checkout</button>
      </div>
    </div>
  )
}