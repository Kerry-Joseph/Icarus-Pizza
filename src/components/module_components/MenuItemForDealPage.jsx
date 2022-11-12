import './menuItem.scss'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import ExtraOptionsBasedOnItemType from './ExtraOptionsBasedOnItemType'

export default function MenuItemForDealPage({ item, setReqState, reqState, dealContent}) {
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemPrice, setItemPrice] = useState(item.price)
  const [sizeState, setSizeState] = useState(item.itemType === 'pizza' || item.itemType === 'wings' ? item.itemType === 'wings' ? '6 piece' : 'Medium' : '')
  const [orderedState, setOrderedState] = useState(false)

  
  
  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => reqState.quantity === 0 ? true : false

  const openOrderOptions = () => {
    if(itemQuantity === 0 && reqState.quantity > 0){
      setItemQuantity(1)
      setReqState(prev => (
        {...prev, quantity : prev.quantity - 1 }
      ))
    } else {
      return
    }
  }

  
  const addToCart = () => {
    if(reqState.quantity === 0){
      dealContent.push(`${sizeState ? `${sizeState} ` : ''}${item.name}${itemQuantity > 1 ? ` x${itemQuantity}` : ''}`)
      setOrderedState(true)
    } else {
      return
    }
  }

  const reqIncrease = () => {
    setReqState(prev => (
      {...prev, quantity : prev.quantity - 1 }
    ))
  }

  const reqDecrease = () => {
    setReqState(prev => (
      {...prev, quantity : prev.quantity + 1 }
    ))
  }



  const NotOrdered = () => {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button className='order-options--add-to-cart' onClick={addToCart}>
          add to cart
        </button>
        <div className='order-options--quantity-buttons'>
          <button onClick={() => {setItemQuantity(prev => prev + 1); reqIncrease()} } disabled={maximumQuantity()}>
            +
          </button>
          <p>{itemQuantity}</p>
          <button onClick={() => {setItemQuantity(prev => prev - 1); reqDecrease()}} disabled={minimumQunatity()}>
            -
          </button>
        </div>
        <ExtraOptionsBasedOnItemType 
          item={item} 
          setItemPrice={setItemPrice} 
          setSizeState={setSizeState}/>
      </div>
    )
  }



  const Ordered = () => {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <h1 style={{color : 'white'}}>ADDED!!</h1>
      </div>
    )
  }



  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} onClick={openOrderOptions}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      {!orderedState ? NotOrdered() : Ordered()}
    </div>
  )
}
