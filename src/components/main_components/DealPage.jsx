import MenuItemForDealPage from "../module_components/MenuItemForDealPage"
import { useParams, Link } from "react-router-dom"
import { useState } from "react"

export default function DealPage({ deals, menu }) {
  
  
  let { dealName } = useParams()
  const dealsArr = deals.filter(deal => deal.name === dealName)
  const deal = dealsArr[0]
  
  const dealContent = []

  const Requirements = ({type, dealContent}) => {
    const currentReqArr = deal.requirements.filter(req => req.itemType === type)
    const currentReq = currentReqArr[0]
    
    const [reqState, setReqState] = useState(currentReq)
    
    let userChoiceItems = []

    deal.requirements.forEach(req => {
      const menuItems = menu.filter(item => item.itemType === req.itemType)
      
      
      if(req.itemType !== type){
        return
      } else if(req.name && req.size){
        if(!dealContent.includes(`${req.size} ${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`))
          dealContent.push(`${req.size} ${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`)
      } else if((req.itemType !== "wings" && req.name) || (req.itemType !== "pizza" && req.name)){
        if(!dealContent.includes(`${req.size ? `${req.size} ` : ''}${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`))
          dealContent.push(`${req.size ? `${req.size} ` : ''}${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`)
      } else {
        userChoiceItems.push(menuItems)
      }
    })

    const userChoiceItemsByItemType = userChoiceItems.filter(itemArr => itemArr[0].itemType === type) 
    
    if(userChoiceItemsByItemType[0] === undefined){
      return
    } else {
      return userChoiceItemsByItemType[0].map(item => (
        <MenuItemForDealPage 
          currentReq={currentReq} 
          item={item} 
          key={item._id} 
          setReqState={setReqState} 
          reqState={reqState}
          dealContent={dealContent}/>
      ))
    }
  }
  
  
  
  
  const addToCart = () => {
    if(localStorage.cart === ''){
      localStorage.cart = JSON.stringify([{
        type : 'deal',
        name : dealName,
        content : dealContent, 
        price : deal.price,
        id : Math.random()
        }])
    } else {
      localStorage.cart = JSON.stringify([...JSON.parse(localStorage.cart), {
        type : 'deal',
        name : dealName,
        content : dealContent,
        price : deal.price,
        id : Math.random()
      }])
    }
  }
  



  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {dealName}
      <h1>Pizza</h1>
      <Requirements type="pizza" dealContent={dealContent}/>
      <h1>Wings</h1>
      <Requirements type="wings" dealContent={dealContent}/>
      <h1>Bread</h1>
      <Requirements type="bread" dealContent={dealContent}/>
      <h1>Sides</h1>
      <Requirements type="side" dealContent={dealContent}/>
      <h1>Dessert</h1>
      <Requirements type="dessert" dealContent={dealContent}/>
      <h1>Beverages</h1>
      <Requirements type="beverage" dealContent={dealContent}/>
      <Link to='/cart' onClick={addToCart}>
        Add to cart
      </Link>
    </div>
  )
}