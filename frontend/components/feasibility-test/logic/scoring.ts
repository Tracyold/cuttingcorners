import { CorrectableOption } from '../data/questions'

export const POSITIVE_CHECKED   =  10
export const POSITIVE_UNCHECKED =  -5
export const POSITIVE_COUNT     =  11
export const POSITIVE_MAX       =  110

export const LIMITING_CHECKED   =  -5
export const LIMITING_UNCHECKED =   2.5
export const LIMITING_COUNT     =  12
export const LIMITING_MAX       =  30

export const STRUCTURAL_CHECKED   = -10
export const STRUCTURAL_UNCHECKED =  5
export const STRUCTURAL_COUNT     = 5
export const STRUCTURAL_MAX       =  25

export const CORRECTABLE_SCORES: Record<CorrectableOption, number> = {
  repair:          10,
  cutting:          5,
  not_correctable: -5,
  not_worth_it:    -5,
}

export const GRAND_MAX = 205
