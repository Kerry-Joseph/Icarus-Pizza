import RequiredItemSelections from "./RequiredItemSelections"
import { useParams, Navigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"


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
  

  const sectionTitles = {
    pizza : useRef(null),
    wings : useRef(null),
    sides : useRef(null),
    bread : useRef(null),
    dessert : useRef(null),
    beverages : useRef(null),
  }

  const removeSectionNameIfNotRequired = (section) => {
    if(sectionTitles[section].current === null) {
      return
    } else if(!sectionTitles[section].current.nextElementSibling.innerText.includes(' ')){
      return {display: 'none'}
    } else return
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
      <h2 ref={sectionTitles.pizza} style={removeSectionNameIfNotRequired('pizza')}>Pizza</h2>
      <RequiredItemSelections 
        selectedDealType="pizza" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2 ref={sectionTitles.wings} style={removeSectionNameIfNotRequired('wings')}>Wings</h2>
      <RequiredItemSelections 
        selectedDealType="wings" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2 ref={sectionTitles.bread} style={removeSectionNameIfNotRequired('bread')}>Bread</h2>
      <RequiredItemSelections 
        selectedDealType="bread" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2 ref={sectionTitles.sides} style={removeSectionNameIfNotRequired('sides')}>Sides</h2>
      <RequiredItemSelections 
        selectedDealType="side" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2 ref={sectionTitles.dessert} style={removeSectionNameIfNotRequired('dessert')}>Dessert</h2>
      <RequiredItemSelections 
        selectedDealType="dessert" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <h2 ref={sectionTitles.beverages} style={removeSectionNameIfNotRequired('beverages')}>Beverages</h2>
      <RequiredItemSelections 
        selectedDealType="beverage" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      <RedirectToCart />
      <button onClick={addDealToCart}>
        Add to cart
      </button>
    </div>
  )
}