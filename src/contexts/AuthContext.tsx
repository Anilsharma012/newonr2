import React, { createContext, useContext } from 'react';
import { AuthProvider as SupabaseAuthProvider, useAuth as useSupabaseAuth } from '@/hooks/useAuth';

// Re-export the auth context
const AuthContext = createContext(undefined);

export const useAuth = useSupabaseAuth;
export const AuthProvider = SupabaseAuthProvider;