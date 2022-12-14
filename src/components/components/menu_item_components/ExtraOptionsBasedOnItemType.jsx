import { useEffect, useState } from "react"

export default function ExtraOptionsBasedOnItemType({ item, setDynamicItemPrice, setSizeState, reqState }) {

  const [activeButton, setActiveButton] = useState({sm:false, md:true, lg:false})



  const highlightSmall = () => activeButton.sm ? {background: "#EAC435", color: '#B80C09'} : {}
  const highlightMedium = () => activeButton.md ? {background: "#EAC435", color: '#B80C09'} : {}
  const highlightLarge = () => activeButton.lg ? {background: "#EAC435", color: '#B80C09'} : {}



  useEffect(() => {
    if(reqState !== undefined)
      if(reqState.size){
        if(reqState.size === 'small'){
          setActiveButton({
            sm: true,
            md: false,
            lg: false,
          })
        } else if(reqState.size === 'medium'){
          setActiveButton({
            sm: false,
            md: true,
            lg: false,
          })
        } else if(reqState.size === 'large'){
          setActiveButton({
            sm: false,
            md: false,
            lg: true,
          })
        }
      } 
  }, [reqState])


  const sizeRequirement = (size) => {
    if(reqState !== undefined)
      if(size !== reqState.size){
        return true
      } else return false
  } 
  



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


  
  // type shorthand ------------------
  const type = item.itemType
  // ---------------------------------

  const itemPriceForLarge = () => {
    if(type === 'pizza'){
      setDynamicItemPrice(item.price + 2)
      setSizeState('Large')
    } else {
      setDynamicItemPrice(item.price + 1)
      setSizeState('10 Piece')
    }
  }
  const itemPriceForSmall = () => {
    if(type === 'pizza'){
      setDynamicItemPrice(item.price - 2)
      setSizeState('Small')
    } else {
      setDynamicItemPrice(item.price - 1)
      setSizeState('4 Piece')
    }
  }
  const itemPriceForMedium = () => {
    if(type === 'pizza'){
      setDynamicItemPrice(item.price)
      setSizeState('Medium')
    } else {
      setDynamicItemPrice(item.price)
      setSizeState('6 Piece')
    }
  }

  

  if(type === 'pizza'){
    return (
      <div className='order-options--size-buttons'>
        <button onClick={() => {activeSmall(); itemPriceForSmall()}} style={highlightSmall()} disabled={sizeRequirement('small')}>
          SM
        </button>
        <button onClick={() => {activeMedium(); itemPriceForMedium()}} style={highlightMedium()} disabled={sizeRequirement('medium')}>
          MD
        </button>
        <button onClick={() => {activeLarge(); itemPriceForLarge()}} style={highlightLarge()} disabled={sizeRequirement('large')}>
          LG
        </button>
      </div>
    )
  } else if(type === 'wings'){
    return (
      <div className='order-options--size-buttons'>
        <button onClick={() => {activeSmall(); itemPriceForSmall()}} style={highlightSmall()} disabled={sizeRequirement('small')}>
          4pc
        </button>
        <button onClick={() => {activeMedium(); itemPriceForMedium()}} style={highlightMedium()} disabled={sizeRequirement('medium')}>
          6pc
        </button>
        <button onClick={() => {activeLarge(); itemPriceForLarge()}}  style={highlightLarge()} disabled={sizeRequirement('large')}>
          10pc
        </button>
      </div>
    )
  } else {
    return
  }
}