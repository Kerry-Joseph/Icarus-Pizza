import { useState } from "react"

export default function PresetForm( {createPreset, pizza, setPresetSubmitted, presetDiv} ) {

  const [formText, setFormText] = useState({text : ''})

  const handleChange = e => {
    setFormText(prev => ({
        ...prev, text: e.target.value
    }))
  }

  
  return (
    <form className='create-pizza__create-preset-form' 
    onSubmit={e => {
      createPreset({...pizza, name : formText.text}) 
      e.preventDefault()
      setPresetSubmitted(true)
    }} 
    style={!presetDiv ? {display:'none'} : {display:'block'}}>
      <h1>Name Preset</h1>
      <div>
        <input type="text" value={formText.text} onChange={handleChange}/>
        <input type="submit" value="submit" />
      </div>
      <p>*preset name must be unique*</p>
    </form>
  )
}
