import Deal from "./Deal"

export default function DealsContainer({ deals }) {
    return deals.map(deal =>( 
        <Deal deal={deal} key={deal._id} />
    ))
}