/**
 * SHARED TYPE PRIMITIVES
 * 
 * RULES:
 * - ONLY shared primitives used across multiple modules
 * - NO domain concepts (Invoice, Product, etc.)
 * - NO business logic
 * - Reusable language primitives only
 */

// ============================================================================
// IDENTITY PRIMITIVES
// ============================================================================

export type ID = string
export type UUID = string

// ============================================================================
// TIME PRIMITIVES
// ============================================================================

export type Timestamp = string // ISO 8601 format
export type DateString = string // YYYY-MM-DD format

export interface DateRange {
  from: DateString
  to: DateString
}

// ============================================================================
// API RESPONSE WRAPPERS
// ============================================================================

export interface ApiResponse<T> {
  data: T
  error?: string
  timestamp: Timestamp
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
  has_more: boolean
}

// ============================================================================
// ERROR PRIMITIVES
// ============================================================================

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'

export interface ErrorDetail {
  code: ErrorCode
  message: string
  field?: string
}

export type Result<T, E = ErrorDetail> =
  | { success: true; data: T }
  | { success: false; error: E }

// ============================================================================
// PAGINATION PRIMITIVES
// ============================================================================

export interface PaginationParams {
  page: number
  page_size: number
}

export interface SortParams<T extends string = string> {
  field: T
  direction: 'asc' | 'desc'
}

// ============================================================================
// COMMON STATUS TYPES
// ============================================================================

export type ActiveStatus = 'active' | 'inactive' | 'archived'