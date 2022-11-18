import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Pizza({ createPreset }){
  const [crustPrice, setCrustPrice] = useState(0)
  const [sizePrice, setSizePrice] = useState(0)
  
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
    if(pizza.toppings[topping] < 10){
      setPizza(prev => ({
        ...prev,
        toppings : {
          ...prev.toppings,
          [topping] : prev.toppings[topping]++
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
          [topping] : prev.toppings[topping]--
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
        toppingsArr.push(`${topping} x${object[topping]}`)
      } else if(object[topping] > 0) {
        toppingsArr.push(`${topping}`)
      }
    }

    return toppingsArr.join(', ')
  }



  const addPersonalPizzaToCart = () => {
    if(localStorage.cart === ''){
      localStorage.cart = JSON.stringify([{
        type : 'personal pizza',
        price : pizza.price,
        content : `Size: ${pizza.size}, Crust: ${pizza.crust}, ${toppingAmountTotal > 0 ? `Toppings: ${toppingsString()}` : 'Toppings: none'}`,
        id : Math.random()
       }])
    } else {
      localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
        type : 'personal pizza',
        price : pizza.price,
        content : `Size: ${pizza.size}, Crust: ${pizza.crust}, ${toppingAmountTotal > 0 ? `Toppings: ${toppingsString()}` : 'Toppings: none'}`,
        id : Math.random()
      }])
    }
  }



  // for the create preset form text input
  const handleChange = e => {
    setPizza(prev => ({
        ...prev, name: e.target.value
    }))
  }




  // COMPONENETS ----

  const ToppingDiv = ({ topping }) => {
    return (
      <div>
        <h3>{topping === 'black_olives' ? 'Black Olives' : topping}</h3>
        <button onClick={() => increaseTopping(topping)}>
          +
        </button>
        <button onClick={() => decreaseTopping(topping)}>
          -
        </button>
      </div>
    )
  }

  
  return (
    <>
      <Link to={'/cart'} onClick={addPersonalPizzaToCart}>add to cart</Link>
      <div>
        <button onClick={() => {setSizePrice(-2); setPizza(prev => ({...prev, size : 'Small'}))}}>
          sm
        </button>
        <button onClick={() => {setSizePrice(0); setPizza(prev => ({...prev, size : 'Medium'}))}}>
          md
        </button>
        <button onClick={() => {setSizePrice(2); setPizza(prev => ({...prev, size : 'Large'}))}}>
          lg
        </button>
      </div>
      <div>
        <button onClick={() => {setCrustPrice(-1); setPizza(prev => ({...prev, crust : 'Slim'}))}}>
          slim
        </button>
        <button onClick={() => {setCrustPrice(0); setPizza(prev => ({...prev, crust : 'Regular'}))}}>
          reg
        </button>
        <button onClick={() => {setCrustPrice(2); setPizza(prev => ({...prev, crust : 'Stuffed'}))}}>
          stuffed
        </button>
      </div>
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
      <form onSubmit={e => {createPreset(pizza); e.preventDefault()}}>
        <h1>create preset</h1>
        <input type="text" value={pizza.name} onChange={handleChange}/>
        <input type="submit" value="submit" />
      </form>
    </>
  )
}