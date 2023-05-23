import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// ----------------------
import '../../style/pages/create-pizza.scss'
// ----------------------
import ToppingDiv from '../components/create_pizza_components/ToppingDiv'
import PresetForm from '../components/create_pizza_components/PresetForm'

export default function Pizza({ createPreset }){
  const [crustPrice, setCrustPrice] = useState(0)
  const [sizePrice, setSizePrice] = useState(0)
  const [presetDiv, setPresetDiv] = useState(false)
  const [presetSubmitted, setPresetSubmitted] = useState(false)
  

  const [pizza, setPizza] = useState(
    {
      name : '',
      size : 'Medium',
      crust : 'Regular',
      toppings : {
        Pepperoni : 0,
        Sausage : 0,
        Mushrooms : 0,
        Bacon : 0,
        Onions : 0,
        Peppers : 0,
        Chicken : 0,
        black_olives : 0,
        Spinach : 0,
        Beef : 0,
        Ham : 0,
        Pineapple : 0
      },
      price : 4.99 
    }
  )


  const toppingsValuesArray = Object.values(pizza.toppings)

  let toppingAmountTotal = 0
  
  toppingsValuesArray.forEach(val => toppingAmountTotal += val)


  useEffect(() => {
    setPizza(prev => ({
      ...prev,
      price : Math.round((4.99 + toppingAmountTotal + crustPrice + sizePrice) * 100)/100
    }))
  }, [ toppingAmountTotal, crustPrice, sizePrice, pizza.price ])


  const toppingsString = () => {
    let toppingsArr = []

    const object = pizza.toppings

    for(const topping in object){
      if(object[topping] > 1){
        toppingsArr.push(`${topping === 'black_olives' ? 'Black Olives' : topping} x${object[topping]}`)
      } else if(object[topping] > 0) {
        toppingsArr.push(`${topping === 'black_olives' ? 'Black Olives' : topping}`)
      }
    }
    return toppingsArr.join(', ')
  }


  const addPersonalPizzaToCart = () => {
    if(localStorage.cart === ''){
      localStorage.cart = JSON.stringify([{
        type : 'personal pizza',
        price : pizza.price,
        content : `Size: ${pizza.size} | Crust: ${pizza.crust} | ${toppingAmountTotal > 0 ? `Toppings: ${toppingsString()}` : 'Toppings: none'}`,
        id : Math.random()
       }])
    } else {
      localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
        type : 'personal pizza',
        price : pizza.price,
        content : `Size: ${pizza.size} | Crust: ${pizza.crust} | ${toppingAmountTotal > 0 ? `Toppings: ${toppingsString()}` : 'Toppings: none'}`,
        id : Math.random()
      }])
    }
  }


  const activeSizeStyling = size => {
    if(pizza.size === size){
      return {color: 'black', background: '#EAC435'}
    } else {
      return
    }
  }

  const activeCrustStyling = crust => {
    if(pizza.crust === crust){
      return {color: 'black', background: '#EAC435'}
    } else {
      return
    }
  }


  // components ----
  
  function PresetFormSubmitted() {
    return <h1>Preset Submitted</h1>
  }
  
  return (
    <main className='create-pizza'>
      <h1 className='create-pizza__title'>
        Create Pizza
      </h1>
      <section className='create-pizza__options'>
        <div className='create-pizza__sizes'>
          <h2>Size</h2>
          <button onClick={() => {setSizePrice(-2); setPizza(prev => ({...prev, size : 'Small'}))}} style={activeSizeStyling('Small')}>
            Small
          </button>
          <button onClick={() => {setSizePrice(0); setPizza(prev => ({...prev, size : 'Medium'}))}} style={activeSizeStyling('Medium')}>
            Medium
          </button>
          <button onClick={() => {setSizePrice(2); setPizza(prev => ({...prev, size : 'Large'}))}} style={activeSizeStyling('Large')}>
            Large
          </button>
        </div>
        <div className='create-pizza__crusts'>
          <h2>Crust</h2>
          <button onClick={() => {setCrustPrice(-1); setPizza(prev => ({...prev, crust : 'Thin'}))}} style={activeCrustStyling('Thin')}>
            Thin
          </button>
          <button onClick={() => {setCrustPrice(0); setPizza(prev => ({...prev, crust : 'Regular'}))}} style={activeCrustStyling('Regular')}>
            Regular
          </button>
          <button onClick={() => {setCrustPrice(2); setPizza(prev => ({...prev, crust : 'Stuffed'}))}} style={activeCrustStyling('Stuffed')}>
            Stuffed
          </button>
        </div>
        <h2>Toppings</h2>
        <div className='create-pizza__toppings'>
          <ToppingDiv topping='Pepperoni' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Sausage' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Mushrooms' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Bacon' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Onions' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Peppers' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Chicken' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='black_olives' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Spinach' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Beef' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Ham' setPizza={setPizza} pizza={pizza} />
          <ToppingDiv topping='Pineapple' setPizza={setPizza} pizza={pizza} />
        </div>
      </section>
      <Link to={'/cart'} onClick={addPersonalPizzaToCart} className='create-pizza__add-to-cart'>
        Add To Cart
      </Link>
      <button className='create-pizza__open-create-preset' onClick={() => setPresetDiv(true)} style={presetDiv ? {display:'none'} : {display:'block'}}>
        Create Preset
      </button>

      {presetSubmitted ? <PresetFormSubmitted /> : <PresetForm createPreset={createPreset} pizza={pizza} setPresetSubmitted={setPresetSubmitted} presetDiv={presetDiv}/>}
       
    </main>
  )
}