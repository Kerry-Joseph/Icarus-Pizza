import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <>
      <Link to='/create-pizza'>
        <h1>Create Personal Pizza</h1>
      </Link>
      <Link to='/pizza-presets'>
        <h1>Choose Pizza Preset</h1>
      </Link>
    </>
  )
}