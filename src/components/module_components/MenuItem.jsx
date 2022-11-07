import './menuItem.scss'

import { useEffect, useState } from 'react'

export default function MenuItem({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0)

  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => itemQuantity === 10 ? true : false

  const ExtraOptionsBasedOnItemType = () => {
    const type = item.itemType
    if(type === 'pizza' || type === 'beverage'){
      return (
        <div>
          <button>sm</button>
          <button>md</button>
          <button>lg</button>
        </div>
      )
    } else if(type === 'wings'){
      return (
        <div>
          <button>4pc</button>
          <button>6pc</button>
          <button>10pc</button>
        </div>
      )
    } else {
      return
    }
  }
  
  useEffect(() => {
    console.log(item.itemType)
  }, [])

  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} >
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <div className='menu-item__order-options'>
        <ExtraOptionsBasedOnItemType />
        <div>
          <button onClick={() => setItemQuantity(prev => prev + 1)} disabled={maximumQuantity()}>
            +
          </button>
          <button onClick={() => setItemQuantity(prev => prev - 1)} disabled={minimumQunatity()}>
            -
          </button>
        </div>
        <p>{itemQuantity}</p>
        <button>add to cart</button>
      </div>
    </div>
  )
}
