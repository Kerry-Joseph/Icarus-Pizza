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
      alert('required selections need to be made')
    }
  }
  

  const sections = {
    pizza : useRef(null),
    wings : useRef(null),
    sides : useRef(null),
    bread : useRef(null),
    dessert : useRef(null),
    beverages : useRef(null),
  }

  const removeSectionNameIfNotRequired = (section) => {
    if(sections[section].current === null || sections[section].current.children[1] === undefined){
      return {display: 'none'}
    } else {
      return
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
    <div className="selected-deal" >
      <h1 className="selected-deal-title">
        {dealName} Deal
      </h1>
      <section className="deal-section--pizza" ref={sections.pizza} style={removeSectionNameIfNotRequired('pizza')}>
        <h2>Pizza</h2>
        <RequiredItemSelections 
          selectedDealType="pizza" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      </section>
      <section className="deal-section--wings" ref={sections.wings} style={removeSectionNameIfNotRequired('wings')}>
        <h2>Wings</h2>
        <RequiredItemSelections 
          selectedDealType="wings" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      </section>
      <section className="deal-section--bread" ref={sections.bread} style={removeSectionNameIfNotRequired('bread')}>
        <h2>Bread</h2>
        <RequiredItemSelections 
          selectedDealType="bread" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      </section>
      <section className="deal-section--sides" ref={sections.sides} style={removeSectionNameIfNotRequired('sides')}>
        <h2>Sides</h2>
        <RequiredItemSelections 
          selectedDealType="side" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      </section>
      <section className="deal-section--dessert" ref={sections.dessert} style={removeSectionNameIfNotRequired('dessert')}>
        <h2>Dessert</h2>
        <RequiredItemSelections 
          selectedDealType="dessert" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      </section>
      <section className="deal-section--beverage" ref={sections.beverages} style={removeSectionNameIfNotRequired('beverages')}>
        <h2>Beverages</h2>
        <RequiredItemSelections 
          selectedDealType="beverage" dealContent={dealContent.current} selectedDeal={selectedDeal} menu={menu} setItemsNeededForDeal={setItemsNeededForDeal} itemsNeededForDeal={itemsNeededForDeal}/>
      </section>
      <RedirectToCart />
      <button className="selected-deal__add-to-cart"  onClick={addDealToCart}>
        add deal to cart
      </button>
      <span className="selected-deal__price">{selectedDeal.price}$</span>
    </div>
  )
}