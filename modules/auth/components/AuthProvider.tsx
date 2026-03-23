'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { AuthState } from '../types';
import { mockAuthService } from '../services/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = async () => {
    dispatch({ type: 'AUTH_START' });

    try {
      const { user, token } = mockAuthService.getStoredAuthState();
      
      if (user && token) {
        const verification = await mockAuthService.verifyToken(token);
        if (verification.valid) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, token },
          });
        } else {
          dispatch({ type: 'AUTH_FAILURE' });
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch({ type: 'AUTH_FAILURE' });
    }
  };

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await mockAuthService.login({ email, password, rememberMe });
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, token: response.token },
      });
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.token) {
        await mockAuthService.logout(state.token);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
