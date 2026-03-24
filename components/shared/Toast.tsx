'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Toast {
  id: string
  title: string
  message?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

type ToastAction = { type: 'ADD_TOAST'; payload: Toast } | { type: 'REMOVE_TOAST'; payload: string }

const initialState: ToastState = {
  toasts: [],
}

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      }
    default:
      return state
  }
}

const ToastContext = createContext<
  | {
      toasts: Toast[]
      addToast: (toast: Omit<Toast, 'id'>) => void
      removeToast: (id: string) => void
    }
  | undefined
>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    }

    dispatch({ type: 'ADD_TOAST', payload: newToast })

    // Auto remove after duration
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id })
    }, newToast.duration)
  }

  const removeToast = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-black'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'p-4 rounded-lg shadow-lg max-w-sm w-full',
            'transform transition-all duration-300 ease-in-out',
            getToastStyles(toast.type)
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold">{toast.title}</h4>
              {toast.message && <p className="text-sm mt-1 opacity-90">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-lg leading-none hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Helper functions for common toast types
export const useToastHelpers = () => {
  const { addToast } = useToast()

  return {
    success: (title: string, message?: string) => {
      addToast({ title, message, type: 'success' })
    },
    error: (title: string, message?: string) => {
      addToast({ title, message, type: 'error' })
    },
    warning: (title: string, message?: string) => {
      addToast({ title, message, type: 'warning' })
    },
    info: (title: string, message?: string) => {
      addToast({ title, message, type: 'info' })
    },
  }
}
