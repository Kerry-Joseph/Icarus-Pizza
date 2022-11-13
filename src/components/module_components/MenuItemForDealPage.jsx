import './menuItem.scss'

import { useState } from 'react'

import ExtraOptionsBasedOnItemType from './ExtraOptionsBasedOnItemType'

export default function MenuItemForDealPage({ item, setReqState, reqState, dealContent}) {
  const [itemQuantity, setItemQuantity] = useState(0)
  const [sizeState, setSizeState] = useState(item.itemType === 'pizza' || item.itemType === 'wings' ? (item.itemType === 'wings' ? '6 piece' : 'Medium') : '')
  const [orderedState, setOrderedState] = useState(false)

  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => reqState.quantity === 0 ? true : false


  const openItemOptions = () => {
    if(itemQuantity === 0 && reqState.quantity > 0){
      setItemQuantity(1)
      setReqState(prev => (
        {...prev, quantity : prev.quantity - 1 }
      ))
    } else {
      return
    }
  }

  
  const addDealToCart = () => {
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



  const NotAddedToDealCart = () => {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button className='order-options--add-to-cart' onClick={addDealToCart}>
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
          setSizeState={setSizeState}/>
      </div>
    )
  }



  const AddedToDealCart = () => {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <h1 style={{color : 'white'}}>ADDED!!</h1>
      </div>
    )
  }



  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} onClick={openItemOptions}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      {!orderedState ? NotAddedToDealCart() : AddedToDealCart()}
    </div>
  )
}
