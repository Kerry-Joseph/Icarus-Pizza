import '../../style/small_components/menu-item.scss'
// ----------------------
import { useState, useEffect } from 'react'
// ----------------------
import ExtraOptionsBasedOnItemType from '../small_components/ExtraOptionsBasedOnItemType'

// req === REQUIREMENT
export default function MenuItemForDealPage({ item, setReqState, reqState, dealContent, setItemsNeededForDeal, itemsNeededForDeal }) {
  const [itemQuantity, setItemQuantity] = useState(0)
  const [sizeState, setSizeState] = useState(item.itemType === 'pizza' || item.itemType === 'wings' ? (item.itemType === 'wings' ? '6 piece' : 'Medium') : '')
  const [, setItemPrice] = useState(item.price)
  
  // requirement state quantity === how many items are left that users need to choose

  const minimumQunatity = () => itemQuantity === 0 ? true : false
  const maximumQuantity = () => reqState.quantity === 0 ? true : false


  // requirement item type shorthand ------------
  const type = reqState.itemType
  // --------------------------------------------

  

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



  useEffect(() => {
    if(reqState.quantity > 0){
      setItemsNeededForDeal(prev => (
        { ...prev, [type] : false}
      ))
    }
  }, [reqState.quantity])


  const userSelectedItemCartString = `${sizeState ? `${sizeState} ` : ''}${item.name}${itemQuantity > 1 ? ` x${itemQuantity}` : ''}`


  useEffect(() => {
    if(itemsNeededForDeal[type] === true)
      dealContent.push(userSelectedItemCartString)
  }, [itemsNeededForDeal[type]])
  
  

  const addToDealContent = () => {
    if(reqState.quantity === 0){
      setItemsNeededForDeal(prev => (
        { ...prev, [type] : true}
      ))
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


  // compnents ----

  function NotAddedToDealContent() {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <button className='order-options--add-to-cart' onClick={addToDealContent}>
          Confirm
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
          reqState = {reqState}
          setSizeState={setSizeState}
          setItemPrice={setItemPrice}/>
      </div>
    )
  }



  function AddedToDealContent() {
    return (
      <div className='order-options' style={itemQuantity ? {display: 'flex'} : {display: 'none'}}>
        <h1 style={{color : 'white'}}>Confirmed!</h1>
      </div>
    )
  }



  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} onClick={openItemOptions}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      {!itemsNeededForDeal[type] ? NotAddedToDealContent() : AddedToDealContent()}
    </div>
  )
}
