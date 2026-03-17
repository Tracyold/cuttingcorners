export interface EstimateInput {
  weightCt:           number
  recommendation:     string
  feasibilityPercent: number
}

export interface EstimateResult {
  available: boolean
  label:     string
  range?:    { low: number; high: number }
  note:      string
}

export function calculateEstimate(_input: EstimateInput): EstimateResult {
  // Formula not yet defined — replace this block when ready
  return {
    available: false,
    label:     'Estimate Available at Consultation',
    note:      'A precise estimate will be provided after your stone is reviewed in person. Submit a quote request below to get started.',
  }
}
