export default function ToppingDiv({ topping, pizza, setPizza }) {

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