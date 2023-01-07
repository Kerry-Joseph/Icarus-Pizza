import Preset from "./Preset"

export default function PresetsContainer({ presets, filter }) {

    const filteredPresets = presets.filter(preset => preset.name.toLowerCase().includes(filter.text))

    return filteredPresets.map(preset => (
      <Preset preset={preset} key={Math.random()}/>
    ))
}
