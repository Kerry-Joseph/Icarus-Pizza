export default function Order({ parsedCart, item }) {

  const deleteItem = (id) => {
    const cartWithoutDeletedItem = parsedCart.filter(item => item.id !== id)
    localStorage.cart = JSON.stringify(cartWithoutDeletedItem)
  }

  if(item.type === 'preset'){
    return (
      <div key={item.id} className='cart__order'>
        <h1>{item.name} | Pizza Preset</h1>
        <p>{item.content.replaceAll(', ', ' - ')}</p>
        <p className="order__price">{item.price}$</p>
        <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
      </div>
    )
  } else if(item.type === 'personal pizza'){
    return (
      <div key={item.id} className='cart__order'>
        <h1>Personal Pizza</h1>
        <p>{item.content.replaceAll(', ', ' - ')}</p>
        <p className="order__price">{item.price}$</p>
        <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
      </div>
    )
  } else if(item.type === 'deal'){
    return(
      <div key={item.id} className='cart__order'>
        <h1>{item.name} Deal</h1>
        <p>{item.content.join(' - ')}</p>
        <p className="order__price">{item.price}$</p>          
        <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
      </div>
    )
  } else if(item.type === 'pizza' || item.type === 'wings'){
    return(
      <div key={item.id} className='cart__order'>
        <h1><span>{item.size}</span> {item.name}{item.quantity > 1 ? `, x${item.quantity}` : ''}</h1>
        <p className="order__price">{item.price}$</p>
        <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
      </div>
    )
  } else {
    return (
      <div key={item.id} className='cart__order'>
        <h1>{item.name}{item.quantity > 1 ? `, x${item.quantity}` : ''}</h1>
        <p className="order__price">{item.price}$</p>
        <button onClick={() => {deleteItem(item.id); window.location.reload()}}>delete</button>
      </div>
    )
  }
}