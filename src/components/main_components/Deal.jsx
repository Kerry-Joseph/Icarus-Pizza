import MenuItem from "../module_components/MenuItem"
import MenuItemForDealPage from "../module_components/MenuItemForDealPage"
import { useParams } from "react-router-dom"
import { useState } from "react"

export default function DealPage({ deals, menu }) {
  let { dealName } = useParams()
  const dealsArr = deals.filter(deal => deal.name === dealName)
  const deal = dealsArr[0]
  
  const Requirements = ({type}) => {
    const currentReqArr = deal.requirements.filter(req => req.itemType === type)
    const currentReq = currentReqArr[0]
    
    const [reqState, setReqState] = useState(currentReq)
    
    let userChoiceItems = []

    deal.requirements.forEach(req => {
      const menuItems = menu.filter(item => item.itemType === req.itemType)

      if(req.name && req.size){
        console.log('no')
      } else if((req.itemType !== "wings" && req.name) || (req.itemType !== "pizza" && req.name)){
        console.log('no')
      } else {
        userChoiceItems.push(menuItems)
        
      }
    })

    const userChoiceItemsByItemType = userChoiceItems.filter(itemArr => itemArr[0].itemType === type) 
    
    if(userChoiceItemsByItemType[0] === undefined){
      return
    } else {
      return userChoiceItemsByItemType[0].map((item, index) => (
        <MenuItemForDealPage currentReq={currentReq} item={item} key={item._id} setReqState={setReqState} reqState={reqState}/>
      ))
    }

  }
  
  

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {dealName}
      <h1>Pizza</h1>
      <Requirements type="pizza"/>
      <h1>Wings</h1>
      <Requirements type="wings"/>
      <h1>Bread</h1>
      <Requirements type="bread"/>
      <h1>Sides</h1>
      <Requirements type="side"/>
      <h1>Dessert</h1>
      <Requirements type="dessert"/>
      <h1>Beverages</h1>
      <Requirements type="beverage"/>
    </div>
  )
}