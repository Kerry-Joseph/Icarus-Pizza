import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Deals({ deals })  {
  
  const DealsContainer = () => {
    return deals.map(deal =>( 
      <DealComponent deal = {deal} key = {deal._id} />
    ))
  }
  const DealComponent = ({ deal }) => {
    return (
      <Link to={`/deals/${deal.name}`}>
        <h1>{deal.name}</h1>
        <p>{deal.price}</p>
        <p>{deal.description}</p>
      </Link>
    )
  }

  

  // useEffect(() => {
  //   console.log(deals)
  // }, [])

  return (
    <>
      <DealsContainer />
      
    </>
  )
  
}
