import { useState } from "react"
import { Link } from "react-router-dom"

import './presets.scss'

export default function Presets({ presets }) {

  const [filter, setFilter] = useState({text:''})

  
  const filteredPresets = presets.filter(preset => preset.name.toLowerCase().includes(filter.text))


  const handleChange = e => {
    setFilter(prev => ({
        ...prev, text: [e.target.value]
    }))
  }


  // COMPONENTS ----

  const AllPresets = () => {
    return filteredPresets.map(preset => (
    <PresetDiv preset={preset} key={Math.random()}/>
    ))
  }






  const PresetDiv = ({ preset }) => {

    let toppingsArr = []
    const toppingsString = () => {
  
      const object = preset.toppings
  
      for(const topping in object){
        if(object[topping] > 1){
          toppingsArr.push(`${topping} x${object[topping]}`)
        } else if(object[topping] > 0) {
          toppingsArr.push(`${topping}`)
        }
      }
  
      return toppingsArr.join(', ')
    }

    const addPresetToCart = () => {
      if(localStorage.cart === ''){
        localStorage.cart = JSON.stringify([{
          type : 'preset',
          name : preset.name,
          price : preset.price,
          content : `Size: ${preset.size} | Crust: ${preset.crust} | ${toppingsArr.length > 0 ? `Toppings: ${toppingsString()}` : 'Toppings: none'}`,
          id : Math.random()
         }])
      } else {
        localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
          type : 'preset',
          name : preset.name,
          price : preset.price,
          content : `Size: ${preset.size} | Crust: ${preset.crust} | ${toppingsArr.length > 0 ? `Toppings: ${toppingsString()}` : 'Toppings: none'}`,
          id : Math.random()
        }])
      }
    }
    
    return (
      <Link to="/cart" onClick={addPresetToCart}>
        <h1>{preset.name}</h1>
        <p>Size: {preset.size}</p>
        <p>Crust: {preset.crust}</p>
        <p>Toppings: {toppingsString()}</p>
      </Link>
    )
  }

  


  
  return (
    <main style={{display: 'flex', flexDirection: 'column'}}>
      <form>
        <input type="text" value={filter.text} onChange={handleChange} />
      </form>
      <AllPresets />
    </main>
  )
}