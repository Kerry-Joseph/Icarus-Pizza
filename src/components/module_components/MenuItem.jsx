import './menuItem.scss'

import { useEffect, useState } from 'react'

import ExtraOptionsBasedOnItemType from './ExtraOptionsBasedOnItemType'

export default function MenuItem({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemPrice, setItemPrice] = useState(item.price)
  const [sizeState, setSizeState] = useState(item.itemType === 'pizza' ? 'Medium' : '6 Piece')

  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => itemQuantity === 10 ? true : false

  const openOrderOptions = () => {
    if(itemQuantity === 0){
      setItemQuantity(1)
    } else {
      return
    }
  }

  
  // const parsed = JSON.parse(localStorage.cart)
  
  // // const addToCart = () => {
  // //   localStorage.cart = JSON.stringify([[{
  // //     type: item.itemType,
  // //     name: item.name,
  // //     size: sizeState,
  // //     quantity: itemQuantity,
  // //     price: itemPrice,
  // //   }]])
  // //   console.log(parsed)
  // // }

  // const addToCart = () => {
  //   if(item.itemType === 'pizza' || item.itemType === 'wings'){
  //     localStorage.cart = JSON.stringify( [[...JSON.parse(localStorage.cart), [{
  //       type: item.itemType,
  //       name: item.name,
  //       size: sizeState,
  //       quantity: itemQuantity,
  //       price: itemPrice,
  //     }]]])
  //     console.log(parsed)
  //   } else {
  //     localStorage.cart = JSON.stringify( [[...JSON.parse(localStorage.cart), [{
  //       type: item.itemType,
  //       name: item.name,
  //       quantity: itemQuantity,
  //       price: itemPrice,
  //     }]]])
  //     console.log(parsed)
  //   }
  // }

  // useEffect(() => {
  //   localStorage.cart = ''
  //   console.log(localStorage.cart)
  // })

  
  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} onClick={openOrderOptions}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button className='order-options--add-to-cart' >
          add to cart
        </button>
        <div className='order-options--quantity-buttons'>
          <button onClick={() => (setItemQuantity(prev => prev + 1))} disabled={maximumQuantity()}>
            +
          </button>
          <p>{itemQuantity}</p>
          <button onClick={() => setItemQuantity(prev => prev - 1)} disabled={minimumQunatity()}>
            -
          </button>
        </div>
        <ExtraOptionsBasedOnItemType 
          item={item} 
          setItemPrice={setItemPrice} 
          setSizeState={setSizeState}/>
      </div>
    </div>
  )
}
