import './menuItem.scss'

export default function MenuItem({ item }) {
  return (
    <div className="menu-item" style={{backgroundImage: `url(${item.img})`}} >
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </div>
  )
}
