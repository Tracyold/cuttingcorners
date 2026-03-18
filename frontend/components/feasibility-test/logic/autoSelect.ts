import type { CorrectableOption } from '../data/questions'
import type { CorrectableSelections } from './calculator'


export function autoSelectCorrectable(
  rowId: keyof CorrectableSelections,
  limitingChecked:   Set<string>,
  structuralChecked: Set<string>
): CorrectableOption {

  if (rowId === 'external') {
    const relevant = ['light_surface_wear', 'shallow_abrasions']
    return relevant.some(id => limitingChecked.has(id)) ? 'repair' : 'not_worth_it'
  }

  if (rowId === 'light') {
    if (limitingChecked.has('opaque_translucent')) return 'not_correctable'
    const optical = ['window', 'extinction', 'lack_luster']
    if (optical.some(id => limitingChecked.has(id))) return 'cutting'
    return 'not_worth_it'
  }

  if (rowId === 'geometry') {
    const relevant = ['off_center_culet', 'excessive_depth', 'asymmetry']
    return relevant.some(id => limitingChecked.has(id)) ? 'cutting' : 'not_worth_it'
  }

  if (rowId === 'structural') {
    const serious = [
      'surface_reaching_inclusion',
      'deep_abrasions',
      'internal_fissure',
      'internal_external_void',
      'cleavage_plane_risk',
    ]
    if (serious.some(id => structuralChecked.has(id))) return 'not_correctable'
    if (structuralChecked.has('girdle_chip_fissure') && structuralChecked.size === 1) return 'cutting'
    return 'not_worth_it'
  }

  return 'not_worth_it'
}

export function autoSelectAll(
  limitingChecked:   Set<string>,
  structuralChecked: Set<string>
): CorrectableSelections {
  return {
    external:   autoSelectCorrectable('external',   limitingChecked, structuralChecked),
    light:      autoSelectCorrectable('light',      limitingChecked, structuralChecked),
    geometry:   autoSelectCorrectable('geometry',   limitingChecked, structuralChecked),
    structural: autoSelectCorrectable('structural', limitingChecked, structuralChecked),
  }
}
