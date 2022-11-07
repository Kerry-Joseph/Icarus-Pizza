import './menuItem.scss'

import { useState } from 'react'

import ExtraOptionsBasedOnItemType from './ExtraOptionsBasedOnItemType'

export default function MenuItem({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0)

  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => itemQuantity === 10 ? true : false

  const openOrderOptions = () => {
    if(itemQuantity === 0){
      setItemQuantity(1)
    } else {
      return
    }
  }
  
  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} onClick={openOrderOptions}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button className='order-options--add-to-cart'>
          add to cart
        </button>
        <div className='order-options--quantity-buttons'>
          <button onClick={() => setItemQuantity(prev => prev + 1)} disabled={maximumQuantity()}>
            +
          </button>
          <p>{itemQuantity}</p>
          <button onClick={() => setItemQuantity(prev => prev - 1)} disabled={minimumQunatity()}>
            -
          </button>
        </div>
        <ExtraOptionsBasedOnItemType item={item} />
      </div>
    </div>
  )
}
