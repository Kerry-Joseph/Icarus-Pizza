import { useState } from "react"

export default function ExtraOptionsBasedOnItemType({ item }) {

  const [activeButton, setActiveButton] = useState({sm:false, md:false, lg:false})

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

  if(type === 'pizza' || type === 'beverage'){
    return (
      <div className='order-options--size-buttons'>
        <button onClick={activeSmall} style={highlightSmall()}>
          SM
        </button>
        <button onClick={activeMedium} style={highlightMedium()}>
          MD
        </button>
        <button onClick={activeLarge} style={highlightLarge()}>
          LG
        </button>
      </div>
    )
  } else if(type === 'wings'){
    return (
      <div className='order-options--size-buttons'>
        <button onClick={activeSmall} style={highlightSmall()}>
          4pc
        </button>
        <button onClick={activeMedium} style={highlightMedium()}>
          6pc
        </button>
        <button onClick={activeLarge} style={highlightLarge()}>
          10pc
        </button>
      </div>
    )
  } else {
    return
  }
}