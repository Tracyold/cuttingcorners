import {
  POSITIVE_CHECKED, POSITIVE_UNCHECKED, POSITIVE_COUNT,
  LIMITING_CHECKED, LIMITING_UNCHECKED, LIMITING_COUNT,
  STRUCTURAL_CHECKED, STRUCTURAL_UNCHECKED, STRUCTURAL_COUNT,
  CORRECTABLE_SCORES, GRAND_MAX,
} from './scoring'
import { CorrectableOption } from '../data/questions'

export interface CorrectableSelections {
  external:   CorrectableOption | null
  light:      CorrectableOption | null
  geometry:   CorrectableOption | null
  structural: CorrectableOption | null
}

export type ScoreBand = '80-100' | '60-79' | '40-59' | '18-39' | '0-17'

export interface ScoreBreakdown {
  positiveScore:      number
  limitingScore:      number
  structuralScore:    number
  correctableScore:   number
  netScore:           number
  maxPossible:        number
  feasibilityPercent: number
  band:               ScoreBand
  recommendation:     string
  weightLoss:         string
}

export const BAND_DATA: Record<ScoreBand, { recommendation: string; weightLoss: string }> = {
  '80-100': { recommendation: 'Polish Only',          weightLoss: '~2-9%'   },
  '60-79':  { recommendation: 'Stone Repair',         weightLoss: '~10-30%' },
  '40-59':  { recommendation: 'Partial Recut',        weightLoss: '~31-50%' },
  '18-39':  { recommendation: 'Full Recut',           weightLoss: '~51-70%' },
  '0-17':   { recommendation: 'No Recut Recommended', weightLoss: '~71-80%' },
}

export function calculatePositiveScore(checkedIds: Set<string>): number {
  const checked   = checkedIds.size
  const unchecked = POSITIVE_COUNT - checked
  return (checked * POSITIVE_CHECKED) + (unchecked * POSITIVE_UNCHECKED)
}

export function calculateLimitingScore(checkedIds: Set<string>): number {
  const checked   = checkedIds.size
  const unchecked = LIMITING_COUNT - checked
  return (checked * LIMITING_CHECKED) + (unchecked * LIMITING_UNCHECKED)
}

export function calculateStructuralScore(checkedIds: Set<string>): number {
  const checked   = checkedIds.size
  const unchecked = STRUCTURAL_COUNT - checked
  return (checked * STRUCTURAL_CHECKED) + (unchecked * STRUCTURAL_UNCHECKED)
}

export function calculateCorrectableScore(selections: CorrectableSelections): number {
  const rows: (keyof CorrectableSelections)[] = ['external', 'light', 'geometry', 'structural']
  return rows.reduce((total, row) => {
    const sel = selections[row]
    return sel ? total + CORRECTABLE_SCORES[sel] : total
  }, 0)
}

export function getBand(percent: number): ScoreBand {
  if (percent >= 80) return '80-100'
  if (percent >= 60) return '60-79'
  if (percent >= 40) return '40-59'
  if (percent >= 18) return '18-39'
  return '0-17'
}

export function calculateAll(
  positiveChecked:       Set<string>,
  limitingChecked:       Set<string>,
  structuralChecked:     Set<string>,
  correctableSelections: CorrectableSelections,
): ScoreBreakdown {
  const positiveScore    = calculatePositiveScore(positiveChecked)
  const limitingScore    = calculateLimitingScore(limitingChecked)
  const structuralScore  = calculateStructuralScore(structuralChecked)
  const correctableScore = calculateCorrectableScore(correctableSelections)

  const netScore           = positiveScore + limitingScore + structuralScore + correctableScore
  const maxPossible        = GRAND_MAX
  const feasibilityPercent = Math.round((netScore / maxPossible) * 1000) / 10
  const band               = getBand(feasibilityPercent)
  const { recommendation, weightLoss } = BAND_DATA[band]

  return {
    positiveScore, limitingScore, structuralScore, correctableScore,
    netScore, maxPossible, feasibilityPercent, band, recommendation, weightLoss,
  }
}
