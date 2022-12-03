import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './create-pizza.scss'

export default function Pizza({ createPreset }){
  const [crustPrice, setCrustPrice] = useState(0)
  const [sizePrice, setSizePrice] = useState(0)
  const [presetDiv, setPresetDiv] = useState(false)
  const [presetSubmitted, setPresetSubmitted] = useState(false)
  
  // pizza state
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

  


  const increaseTopping = (topping) => {
    const pizzaToppingState = pizza.toppings[topping]
    if(pizzaToppingState < 10){
      setPizza(prev => ({
        ...prev,
        toppings : {
          ...prev.toppings,
          [topping] : prev.toppings[topping] + 1
        }
      }))
    } else {
      return
    }
  }
  const decreaseTopping = (topping) => {
    if(pizza.toppings[topping] > 0){
      setPizza(prev => ({
        ...prev,
        toppings : {
          ...prev.toppings,
          [topping] : prev.toppings[topping] - 1
        }
      }))
    } else {
      return
    }
  }
  


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



  const showToppingMultiplyer = topping => {
    if(pizza.toppings[topping] < 2){
      return ''
    } else {
      return `x${pizza.toppings[topping]}`
    }
  }

  const activeToppingStyling = topping => {
    if(pizza.toppings[topping] < 1){
      return {color: '#B80C09'}
    } else {
      return {color: 'green'}
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




  // COMPONENETS ----

  const ToppingDiv = ({ topping }) => {
    return (
      <div className='create-pizza__topping-div'>
        <h3 onClick={() => increaseTopping(topping)} style={activeToppingStyling(topping)}>
          {topping === 'black_olives' ? 'Black Olives' : topping} {showToppingMultiplyer(topping)}
        </h3>

        {pizza.toppings[topping] > 0 ?
          <button onClick={() => decreaseTopping(topping)}>
            remove
          </button> 
        : ''}
      </div>
    )
  }


  const PresetForm = () => {

    const [formText, setFromText] = useState({text : ''})

    const handleChange = e => {
      setFromText(prev => ({
          ...prev, text: e.target.value
      }))
    }

    
    return (
      <form className='create-pizza__create-preset-form' onSubmit={e => {createPreset({...pizza, name : formText.text}); e.preventDefault(); setPresetSubmitted(true)}} style={!presetDiv ? {display:'none'} : {display:'block'}}>
        <h1>Name Preset</h1>
        <div>
          <input type="text" value={formText.text} onChange={handleChange}/>
          <input type="submit" value="submit" />
        </div>
        <p>*preset name must be unique*</p>
      </form>
    )
  }

  const PresetSubmittedText = () => {
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
          <ToppingDiv topping='Pepperoni' />
          <ToppingDiv topping='Sausage' />
          <ToppingDiv topping='Mushrooms' />
          <ToppingDiv topping='Bacon' />
          <ToppingDiv topping='Onions' />
          <ToppingDiv topping='Peppers' />
          <ToppingDiv topping='Chicken' />
          <ToppingDiv topping='black_olives' />
          <ToppingDiv topping='Spinach' />
          <ToppingDiv topping='Beef' />
          <ToppingDiv topping='Ham' />
          <ToppingDiv topping='Pineapple' />
        </div>
      </section>
      <Link to={'/cart'} onClick={addPersonalPizzaToCart} className='create-pizza__add-to-cart'>
        add to cart
      </Link>
      <button className='create-pizza__open-create-preset' onClick={() => setPresetDiv(true)} style={presetDiv ? {display:'none'} : {display:'block'}}>
        create preset
      </button>
      {presetSubmitted ? <PresetSubmittedText /> : <PresetForm />}
    </main>
  )
}