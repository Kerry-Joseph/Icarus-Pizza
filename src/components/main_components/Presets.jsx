import { Link } from "react-router-dom"

export default function Presets({ presets }) {

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
      <Link to="/cart"onClick={addPresetToCart}>
        <h1>{preset.name}</h1>
        <p>Size: {preset.size}</p>
        <p>Crust: {preset.crust}</p>
        <p>Toppings: {toppingsString()}</p>
      </Link>
    )
  }

  const AllPresets = () => {
    return presets.map(preset => (
      <PresetDiv preset={preset} />
    ))
  }

  return (
    <>
      <AllPresets />
    </>
  )
}