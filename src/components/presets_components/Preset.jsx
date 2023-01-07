import { Link } from 'react-router-dom'

export default function Preset ({ preset }) {

    let toppingsArr = []
    const toppingsString = () => {
      toppingsArr = []
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