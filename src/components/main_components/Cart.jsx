import { useEffect, useState } from "react" 

export default function Cart() {
  const parsedCart = localStorage.cart ? JSON.parse(localStorage.cart) : []

  const [subtotal, setSubtotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)

  

 

  const deleteItem = (id) => {
    const cartWithoutDeletedItem = JSON.parse(localStorage.cart).filter(item => item.id !== id)
    localStorage.cart = JSON.stringify(cartWithoutDeletedItem)
  }


  const Order = (item) => {
    if(item.type === 'deal'){
      return(
        <div key={item.id}>
          <h1>{item.name} Deal</h1>
          <p>{item.content.join(', ')}</p>
          <p>{item.price}</p>
          <button onClick={() => localStorage.cart = ''}>clear</button>
          <button onClick={() => deleteItem(item.id)}>delete</button>
        </div>
      )
    }
    if(item.type === 'pizza' || item.type === 'wings'){
      return(
        <div key={item.id}>
          <h1><span>{item.size} |</span> {item.name}</h1>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
          <button onClick={() => localStorage.cart = ''}>clear</button>
          <button onClick={() => deleteItem(item.id)}>delete</button>
        </div>
      )
    } else {
      return (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
          <button onClick={() => localStorage.cart = ''}>clear</button>
          <button onClick={() => deleteItem(item.id)}>delete</button>
        </div>
      )
    }
  }

  const Orders = () => {  
    return parsedCart.map(item => (
      Order(item)
    ))
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

  return (
    <div>
      <button onClick={() => {deliveryFee ? setDeliveryFee(0) : setDeliveryFee(4.99)}}>Switch Delivery</button>
      <h2>
        subtotal
        ${subtotal}
      </h2>
      <h2>
        tax
        ${tax}
      </h2>
      <h2>
        subtotal and tax 
        ${subtotalWithTax}
      </h2>
      <h2>
        delivery fee
        ${deliveryFee}
      </h2>
      <h2>
        subtotal and tax and delivery fee
        ${subtotalTaxAndDeliveryFee}
      </h2>
      <Orders />
    </div>
  )
}