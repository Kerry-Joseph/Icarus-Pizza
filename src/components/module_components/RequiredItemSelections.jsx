import { useState } from "react"  
import MenuItemForDealPage from './MenuItemForDealPage'

export default function RequiredItemSelections({selectedDealType, dealContent, selectedDeal, menu}){
  
  const currentReqArr = selectedDeal.requirements.filter(req => req.itemType === selectedDealType)
  const currentReq = currentReqArr[0]
  
  const [reqState, setReqState] = useState(currentReq)
  

  let itemRequiringUserInput = undefined


  // add required deal item to deal cart if they dont require user input
  selectedDeal.requirements.forEach(req => {
    const menuItemsRequiedForItemType = menu.filter(item => item.itemType === req.itemType)
    const selectedPizzaOrWingsCartString = `${req.size} ${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`
    const selectedItemCartString = `${req.size ? `${req.size} ` : ''}${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`
    if(req.itemType !== selectedDealType){
      return
    } else if(req.name && req.size){
      if(!dealContent.includes(selectedPizzaOrWingsCartString))
        dealContent.push(selectedPizzaOrWingsCartString)
    } else if((req.itemType !== "wings" && req.name) || (req.itemType !== "pizza" && req.name)){
      if(!dealContent.includes(selectedItemCartString))
        dealContent.push(selectedItemCartString)
    } else {
      itemRequiringUserInput = menuItemsRequiedForItemType
    }
  })

  

  if(itemRequiringUserInput === undefined){
    return
  } else {
    return itemRequiringUserInput.map(item => (
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