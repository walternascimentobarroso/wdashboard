'use client'

import { toast } from 'sonner'

export function showSuccessToast(message: string) {
  toast.success(message)
}

export function showErrorToast(message: string) {
  toast.error(message)
}

export function showInfoToast(message: string) {
  toast.info(message)
}

export function showWarningToast(message: string) {
  toast.warning(message)
}

// Specific user management toasts
export const userToasts = {
  userCreated: (userName: string) => showSuccessToast(`User "${userName}" created successfully`),
  userUpdated: (userName: string) => showSuccessToast(`User "${userName}" updated successfully`),
  userDeleted: (userName: string) => showSuccessToast(`User "${userName}" deleted successfully`),

  createError: (error: string) => showErrorToast(`Failed to create user: ${error}`),
  updateError: (error: string) => showErrorToast(`Failed to update user: ${error}`),
  deleteError: (error: string) => showErrorToast(`Failed to delete user: ${error}`),

  lastAdminError: () => showErrorToast('Cannot perform this action on the last administrator'),
  duplicateEmailError: () => showErrorToast('A user with this email already exists'),
  validationError: (field: string) => showErrorToast(`Invalid ${field}: please check your input`),
  storageError: () => showErrorToast('Storage error: please check your browser settings'),
}
