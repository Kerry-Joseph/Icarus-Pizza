import { useState } from "react"
// --------------------
import '../../style/pages/presets.scss'
// --------------------
import PresetsContainer from '../presets_components/PresetsContainer'

export default function Presets({ presets }) {

  const [filter, setFilter] = useState({text:''})


  const handleChange = e => {
    setFilter(prev => ({
        ...prev, text: [e.target.value]
    }))
  }

   
  return (
    <main className="presets-page">
      
      <form className='presets-search-form'>
        <input type="text" value={filter.text} onChange={handleChange} placeholder='Search Preset...'/>
      </form>

      <div className="presets-container">
        <PresetsContainer 
          presets={presets}
          filter={filter}
          />
      </div>

    </main>
  )
}