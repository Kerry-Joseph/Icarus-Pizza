import '../../../style/small_components/menu-item.scss'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ExtraOptionsBasedOnItemType from './ExtraOptionsBasedOnItemType'

export default function MenuItem({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0)
  const [dynamicItemPrice, setDynamicItemPrice] = useState(item.price)
  const [sizeState, setSizeState] = useState(item.itemType === 'pizza' ? 'Medium' : '6 Piece')
  const [orderedState, setOrderedState] = useState(false)

  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => itemQuantity === 10 ? true : false

  const openOrderOptions = () => {
    if(itemQuantity === 0){
      setItemQuantity(1)
    } else {
      return
    }
  }


  const addToCart = () => {
    if(localStorage.cart === ''){
      localStorage.cart = JSON.stringify([{
        type : item.itemType,
        name : item.name,
        size : (item.itemType === 'pizza' || item.itemType === 'wings' ? sizeState : undefined),
        quantity : itemQuantity,
        price : Math.round((dynamicItemPrice * itemQuantity) * 100)/100,
        id : Math.random()
       }])
       setOrderedState(true)
    } else {
      localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
        type : item.itemType,
        name : item.name,
        size : (item.itemType === 'pizza' || item.itemType === 'wings' ? sizeState : undefined),
        quantity : itemQuantity,
        price : Math.round((dynamicItemPrice * itemQuantity) * 100)/100,
        id : Math.random()
      }])
      setOrderedState(true)
    }
  }



  // adds 0s to price string if needed
  const [itemPrice, setItemPrice] = useState(item.price)
  const splitPrice = itemPrice.toString().includes(".") ? itemPrice.toString().split('.') : false
  
  useEffect(()=> {
    setItemPrice(() => {
      if(!itemPrice.toString().includes(".")){
        return `${itemPrice}.00`
      } else if(splitPrice[1].length === 1){
          return [splitPrice[0], `${splitPrice[1]}0`].join('.')
        } else {
          return itemPrice
        }
      })
    }, [itemPrice, splitPrice])

    

  // components ------
  
  function NotOrdered() {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button className='order-options--add-to-cart' onClick={addToCart}>
          Add To Cart
        </button>
        <span className='menu-item__price-in-options'>{Math.round((dynamicItemPrice * itemQuantity) * 100)/100}$</span>
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
          setDynamicItemPrice={setDynamicItemPrice} 
          setSizeState={setSizeState}/>
      </div>
    )
  }



  function Ordered() {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button onClick={() => {setOrderedState(false); setItemQuantity(0)}} id='order-options-added--button'>X</button>
        <h1 className='order-options-added--text'>ADDED TO CART</h1>
        <Link to='/cart' className='order-options-added--link'>
          Go to cart
        </Link>
      </div>
    )
  }


  return (
    <div className={`menu-item menu-item--${item.name.replaceAll(' ', '-')}`} onClick={openOrderOptions} style={itemQuantity > 0 ? {cursor: 'auto', backgroundImage: `url(${item.img})`} : {backgroundImage: `url(${item.img})`}}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <span className='menu-item__price'>{itemPrice}$</span>
      {!orderedState ? NotOrdered() : Ordered()}
    </div>
  )
}
