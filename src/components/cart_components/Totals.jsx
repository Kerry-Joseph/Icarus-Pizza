import { useEffect, useState } from "react"

export default function Totals({parsedCart }) {

  const [subtotal, setSubtotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)

  const tax = Math.round((subtotal * .0269) * 100)/100
  const subtotalWithTax = (Math.round(tax * 100)/100) + subtotal
  const subtotalTaxAndDeliveryFee = Math.round((subtotalWithTax + deliveryFee) * 100)/100

  const getSubtotal = () => {
    setSubtotal(0)
    parsedCart.forEach(item => {
      setSubtotal(prev => prev + item.price)
    })
  }

  useEffect(() => {
    getSubtotal()
  }, [parsedCart])
  

  return (
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
  )
}