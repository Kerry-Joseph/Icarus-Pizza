import RequiredItemSelections from "./RequiredItemSelections"
import { useParams, Navigate } from "react-router-dom"
import { useState, useRef } from "react"


export default function SelectedDeal({ deals, menu }) {
  
  let { dealName } = useParams()

  const selectedDealInAnArray = deals.filter(deal => deal.name === dealName)

  const selectedDeal = selectedDealInAnArray[0]
  
  // selected items in deal (deal cart)
  const dealContent = useRef([])

  const [itemsNeededForDeal,  setItemsNeededForDeal] = useState({
    pizza : null,
    wings : null,
    bread : null,
    side : null,
    dessert : null,
    beverage : null
  })

  const [allRequiredItemsSelected, setAllRequiredItemsSelected] = useState(false)
 
  const addDealToCart = () => {
    if(!Object.values(itemsNeededForDeal).includes(false)){
      if(localStorage.cart === ''){
        localStorage.cart = JSON.stringify([{
          type : 'deal',
          name : dealName,
          content : dealContent.current, 
          price : selectedDeal.price,
          id : Math.random()
          }])
          setAllRequiredItemsSelected(true)
      } else {
        localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
          type : 'deal',
          name : dealName,
          content : dealContent.current,
          price : selectedDeal.price,
          id : Math.random()
        }])
        setAllRequiredItemsSelected(true)
      } 
    } else {
      alert('required items needed')
    }
  }
  


  // COMPONENTS ----

  const RedirectToCart = () => {
    if(allRequiredItemsSelected === true){
      return <Navigate to='/cart' replace={true} />
    } else {
      return
    }
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h1>
        {dealName}
      </h1>
      <h2>Pizza</h2>
      <RequiredItemSelections 
        selectedDealType="pizza" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2>Wings</h2>
      <RequiredItemSelections 
        selectedDealType="wings" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2>Bread</h2>
      <RequiredItemSelections 
        selectedDealType="bread" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2>Sides</h2>
      <RequiredItemSelections 
        selectedDealType="side" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2>Dessert</h2>
      <RequiredItemSelections 
        selectedDealType="dessert" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2>Beverages</h2>
      <RequiredItemSelections 
        selectedDealType="beverage" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <RedirectToCart />
      <button onClick={addDealToCart}>
        Add to cart
      </button>
    </div>
  )
}