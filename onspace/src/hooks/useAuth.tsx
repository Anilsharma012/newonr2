import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { full_name: string; phone?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider: Current state', { user: user?.id, profile: profile?.id, loading });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('AuthProvider: Error getting session:', error);
      } else {
        console.log('AuthProvider: Initial session:', session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('AuthProvider: Error fetching profile:', error);
      } else {
        console.log('AuthProvider: Profile fetched:', data?.id);
        setProfile(data);
      }
    } catch (error) {
      console.error('AuthProvider: Error in fetchProfile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name: string; phone?: string }) => {
    console.log('AuthProvider: Signing up user:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          phone: userData.phone,
        },
      },
    });

    if (error) {
      console.error('AuthProvider: Sign up error:', error);
      throw error;
    }

    if (data.user) {
      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: userData.full_name,
          phone: userData.phone,
          role: 'user',
        });

      if (profileError) {
        console.error('AuthProvider: Profile creation error:', profileError);
        throw profileError;
      }

      console.log('AuthProvider: User signed up successfully');
      toast.success('Registration successful! Please check your email to verify your account.');
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Signing in user:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('AuthProvider: Sign in error:', error);
      throw error;
    }

    console.log('AuthProvider: User signed in successfully');
    toast.success('Login successful!');
  };

  const signOut = async () => {
    console.log('AuthProvider: Signing out user');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('AuthProvider: Sign out error:', error);
      throw error;
    }

    console.log('AuthProvider: User signed out successfully');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    console.log('AuthProvider: Updating profile:', updates);

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      console.error('AuthProvider: Profile update error:', error);
      throw error;
    }

    // Refetch profile data
    await fetchProfile(user.id);
    console.log('AuthProvider: Profile updated successfully');
    toast.success('Profile updated successfully');
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};