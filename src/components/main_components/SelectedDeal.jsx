import RequiredItemSelections from "../module_components/RequiredItemSelections"
import { useParams, Link } from "react-router-dom"


export default function SelectedDeal({ deals, menu }) {
  
  let { dealName } = useParams()

  const selectedDealInAnArray = deals.filter(deal => deal.name === dealName)

  const selectedDeal = selectedDealInAnArray[0]
  
  // selected items in deal (deal cart)
  const dealContent = []

  
  const addDealToCart = () => {
    if(localStorage.cart === ''){
      localStorage.cart = JSON.stringify([{
        type : 'deal',
        name : dealName,
        content : dealContent, 
        price : selectedDeal.price,
        id : Math.random()
        }])
    } else {
      localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
        type : 'deal',
        name : dealName,
        content : dealContent,
        price : selectedDeal.price,
        id : Math.random()
      }])
    }
  }
  



  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h1>
        {dealName}
      </h1>
      <h2>Pizza</h2>
      <RequiredItemSelections 
        selectedDealType="pizza" dealContent={dealContent} selectedDeal={selectedDeal} menu={menu}/>
      <h2>Wings</h2>
      <RequiredItemSelections 
        selectedDealType="wings" dealContent={dealContent} selectedDeal={selectedDeal} menu={menu}/>
      <h2>Bread</h2>
      <RequiredItemSelections 
        selectedDealType="bread" dealContent={dealContent} selectedDeal={selectedDeal} menu={menu}/>
      <h2>Sides</h2>
      <RequiredItemSelections 
        selectedDealType="side" dealContent={dealContent} selectedDeal={selectedDeal} menu={menu}/>
      <h2>Dessert</h2>
      <RequiredItemSelections 
        selectedDealType="dessert" dealContent={dealContent} selectedDeal={selectedDeal} menu={menu}/>
      <h2>Beverages</h2>
      <RequiredItemSelections 
        selectedDealType="beverage" dealContent={dealContent} selectedDeal={selectedDeal} menu={menu}/>
      <Link to='/cart' onClick={addDealToCart}>
        Add to cart
      </Link>
    </div>
  )
}