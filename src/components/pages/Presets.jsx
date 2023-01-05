import { useState } from "react"
import { Link } from "react-router-dom"

import '../../style/pages/presets.scss'

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
      <Link to="/cart" onClick={addPresetToCart} className='preset-component'>
        <h1>{preset.name}</h1>
        <p><span>Size:</span> {preset.size}</p>
        <p><span>Crust:</span> {preset.crust}</p>
        <p><span>Toppings:</span> {toppingsString() === '' ? 'None' : toppingsString()}</p>
      </Link>
    )
  }

  


  
  return (
    <main className="presets-page">
      <form className='presets-search-form'>
        <input type="text" value={filter.text} onChange={handleChange} placeholder='Search Preset...'/>
      </form>
      <div className="presets-container">
        <AllPresets />
      </div>
    </main>
  )
}