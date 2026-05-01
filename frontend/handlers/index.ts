// frontend/handlers/index.ts
//
// Barrel export for all reusable handlers.
// Import from 'handlers' instead of individual files.
//
// Usage:
//   import { sendMessage, notifyAdmin, acceptWorkOrder } from '../handlers'
//   import { getPublicUrl } from '../handlers/storageHandler'
//   import { archiveInquiry, archiveServiceRequest } from '../handlers/archiveHandler'

export * from './supabaseCrud'
export * from './realtimeSubscription'
export * from './notificationHandler'
export * from './chatHandler'
export * from './workOrderHandler'
export * from './inquiryHandler'
export * from './serviceRequestHandler'
export * from './profileHandler'
export * from './favoritesHandler'
export * from './checkoutHandler'
export * from './authHandler'
export * from './storageHandler'
export * from './formatHandler'
export * from './archiveHandler'
export * from './wizardFolderHandler'
export { uploadPhoto, removePhoto, buildStoragePath, safeExtension, isAllowedExtension } from './photoUploadHandler'
export * from './consentHandler'
