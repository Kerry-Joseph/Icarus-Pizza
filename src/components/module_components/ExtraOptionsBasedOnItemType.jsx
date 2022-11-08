import { useState } from "react"

export default function ExtraOptionsBasedOnItemType({ item, setItemPrice, setSizeState }) {

  const [activeButton, setActiveButton] = useState({sm:false, md:true, lg:false})

  const highlightSmall = () => activeButton.sm ? {background: "#EAC435", color: '#B80C09'} : {}
  const highlightMedium = () => activeButton.md ? {background: "#EAC435", color: '#B80C09'} : {}
  const highlightLarge = () => activeButton.lg ? {background: "#EAC435", color: '#B80C09'} : {}

  const activeSmall = () => {
    setActiveButton({
      sm: true,
      md: false,
      lg: false,
    })
  }
  const activeMedium = () => {
    setActiveButton({
      sm: false,
      md: true,
      lg: false,
    })
  }
  const activeLarge = () => {
    setActiveButton({
      sm: false,
      md: false,
      lg: true,
    })
  }

  const type = item.itemType

  const itemPriceForLarge = () => {
    if(type === 'pizza'){
      setItemPrice(item.price + 2)
      setSizeState('Large')
    } else {
      setItemPrice(item.price + 1)
      setSizeState('10 Piece')
    }
  }
  const itemPriceForSmall = () => {
    if(type === 'pizza'){
      setItemPrice(item.price - 2)
      setSizeState('Small')
    } else {
      setItemPrice(item.price - 1)
      setSizeState('4 Piece')
    }
  }
  const itemPriceForMedium = () => {
    if(type === 'pizza'){
      setItemPrice(item.price)
      setSizeState('Medium')
    } else {
      setItemPrice(item.price)
      setSizeState('6 Piece')
    }
  }

  

  if(type === 'pizza'){
    return (
      <div className='order-options--size-buttons'>
        <button onClick={() => {activeSmall(); itemPriceForSmall()}} style={highlightSmall()}>
          SM
        </button>
        <button onClick={() => {activeMedium(); itemPriceForMedium()}} style={highlightMedium()}>
          MD
        </button>
        <button onClick={() => {activeLarge(); itemPriceForLarge()}} style={highlightLarge()}>
          LG
        </button>
      </div>
    )
  } else if(type === 'wings'){
    return (
      <div className='order-options--size-buttons'>
        <button onClick={() => {activeSmall(); itemPriceForSmall()}} style={highlightSmall()}>
          4pc
        </button>
        <button onClick={() => {activeMedium(); itemPriceForMedium()}} style={highlightMedium()}>
          6pc
        </button>
        <button onClick={() => {activeLarge(); itemPriceForLarge()}}  style={highlightLarge()}>
          10pc
        </button>
      </div>
    )
  } else {
    return
  }
}