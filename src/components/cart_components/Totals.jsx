import { useState } from "react"

export default function Totals({ parsedCart }) {

  const [deliveryFee, setDeliveryFee] = useState(0)

  
  const getSubtotal = () => {
    let subtotal = 0
    parsedCart.forEach(item => {
      subtotal += item.price
    })
    
    subtotal = Math.round((subtotal) * 100)/100
    
    // adds 0s to price string if needed
    const splitSubtotal = subtotal.toString().includes(".") ? subtotal.toString().split('.') : false

    if(!subtotal.toString().includes(".")){
      return `${subtotal}.00`
    } else if(splitSubtotal[1].length === 1){
      return [splitSubtotal[0], `${splitSubtotal[1]}0`].join('.')
    } else {
      return subtotal
    }
  }


  const tax = Math.round((getSubtotal() * .0269) * 100)/100
  const subWithTax = (Math.round(tax * 100)/100) + getSubtotal()
  const completeTotal = Math.round((subWithTax + deliveryFee) * 100)/100
  
  

  const getTotal = (total) => {
    // adds 0s to price string if needed
    const splitTotal = total.toString().includes(".") ? total.toString().split('.') : false
    
    if(!total.toString().includes(".")){
      return `${total}.00`
    } else if(splitTotal[1].length === 1){
      return [splitTotal[0], `${splitTotal[1]}0`].join('.')
    } else {
      return total
    }

  }
  

  return (
    <div className="cart__total">
        <button 
        onClick={() => {deliveryFee ? setDeliveryFee(0) : setDeliveryFee(4.99)}}
        className='cart__delivery-button'
        style={deliveryFee ? {backgroundColor: 'lightgreen'} : {}}>

          {deliveryFee ? 'Delivery' : 'Switch to delivery'}

        </button>
        
        <h2>
          Subtotal: <span> ${getSubtotal()} </span>
        </h2>
        
        <h2>
          Tax: <span> ${getTotal(tax)} </span>
        </h2>

        <h2 style={deliveryFee ? {} : {display: 'none'}}>
          Delivery Fee: <span> ${deliveryFee} </span>
        </h2>

        <h2 className="cart__total--complete">
          Total: <span> ${getTotal(completeTotal)} </span>
        </h2>

        <button className="cart__checkout-button">
          Checkout
        </button>
      </div>
  )
}