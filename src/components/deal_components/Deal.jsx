import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Deal({ deal }) {    
    // adds 0 to end of price if it ends in the tenth place
    const priceSplit = deal.price.toString().split('.')
    const [dealPrice, setDealPrice] = useState(null)
    
    useEffect(()=> {
        setDealPrice( () => {
            if(priceSplit[1].length === 1){
                return [priceSplit[0], `${priceSplit[1]}0`].join('.')
            } else {
                return deal.price
            }
        })
    }, [priceSplit, deal.price])


    
    return (
        <Link to={`/deals/${deal.name}`} style={{textDecoration : 'none'}}>
            <div className={`deal-component deal-component--${deal.name.replaceAll(' ', '-')}`} style={{background: `url(${deal.img})`}}>
                <h1>{deal.name}</h1>
                <p className='deal-component__price'>{dealPrice}$</p>
                <p className='deal-component__description'>{deal.description}</p>
            </div>
        </Link>
    )
}