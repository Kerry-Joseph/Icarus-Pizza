import Order from "./Order"

export default function Orders({ parsedCart }) {  
  return parsedCart.map(item => (
    <Order item = {item} parsedCart = {parsedCart} key={item.id}/>
  ))
}