import '../../style/pages/deals.scss'
// -------------------
import DealsContainer from '../deal_components/DealsContainer'

export default function Deals({ deals })  {

  return (
    <main className='deals'>
      <h2 className='deals__title'>Deals</h2>
      <div className='deals-container'>
        <DealsContainer deals={deals}/>      
      </div> 
    </main>
  )
  
}
