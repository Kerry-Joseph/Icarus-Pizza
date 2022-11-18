import { useState } from "react"  

import MenuItemForDealPage from './MenuItemForDealPage'

// req === REQUIREMENT -+-+-+-+-+-
export default function RequiredItemSelections({ selectedDealType, dealContent, selectedDeal, menu, setItemsNeededForDeal ,itemsNeededForDeal }){
  
  const currentReqArr = selectedDeal.requirements.filter(req => req.itemType === selectedDealType)
  const currentReq = currentReqArr[0]
  
  const [reqState, setReqState] = useState(currentReq)
  

  let itemRequiringUserInput = undefined


  // add required deal item to deal content if it doesn't require user input
  selectedDeal.requirements.forEach(req => {
    const menuItemsRequiedForDeal = menu.filter(item => item.itemType === req.itemType)

    const cartStringForPizzaOrWings = `${req.size} ${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`
    const cartStringForOtherItems = `${req.size ? `${req.size} ` : ''}${req.name}${req.quantity > 1 ? ` x${req.quantity}` : ''}`

    if(req.itemType !== selectedDealType){
      return
    } else if(req.name && req.size){
      if(!dealContent.includes(cartStringForPizzaOrWings))
        dealContent.push(cartStringForPizzaOrWings)
    } else if((req.itemType !== "wings" && req.name) || (req.itemType !== "pizza" && req.name)){
      if(!dealContent.includes(cartStringForOtherItems))
        dealContent.push(cartStringForOtherItems)
    } else {
      itemRequiringUserInput = menuItemsRequiedForDeal
    }
  })

  

  if(itemRequiringUserInput === undefined){
    return
  } else {
    return itemRequiringUserInput.map(item => (
      <MenuItemForDealPage  
        item={item} 
        key={item._id} 
        setReqState={setReqState} 
        reqState={reqState}
        dealContent={dealContent}
        setItemsNeededForDeal={setItemsNeededForDeal}
        itemsNeededForDeal={itemsNeededForDeal}/>
    ))
  }
}