import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  userCredits: number;
  userPlan: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateCredits: (newCreditBalance: number) => Promise<void>;
  updatePlan: (newPlan: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userCredits, setUserCredits] = useState<number>(0);
  const [userPlan, setUserPlan] = useState<string>('Free');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch user credits
        const { data: userCredit } = await supabase
          .from('user_credits')
          .select('credit_balance')
          .eq('user_id', user.id)
          .single();
        
        if (userCredit) {
          setUserCredits(userCredit.credit_balance);
        }
        
        // For demo purposes, set a plan based on credits
        if (userCredits > 500) {
          setUserPlan('Premium');
        } else if (userCredits > 100) {
          setUserPlan('Pro');
        } else {
          setUserPlan('Free');
        }
      }
      
      setIsLoading(false);
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user credits when auth state changes
          const { data: userCredit } = await supabase
            .from('user_credits')
            .select('credit_balance')
            .eq('user_id', session.user.id)
            .single();
          
          if (userCredit) {
            setUserCredits(userCredit.credit_balance);
          }
        } else {
          setUserCredits(0);
          setUserPlan('Free');
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (!error) {
      // Get the user after signup
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Initialize user credits for new user
        await supabase.from('user_credits').insert({
          user_id: user.id,
          credit_balance: 100, // Free tier starting credits
        });
        
        setUserCredits(100);
        setUserPlan('Free');
        
        // Import any guest humanizations if they exist
        await importGuestHumanizations(user.id);
      }
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserCredits(0);
    setUserPlan('Free');
  };

  const updateCredits = async (newCreditBalance: number) => {
    if (!user) return;
    
    setUserCredits(newCreditBalance);
    
    await supabase
      .from('user_credits')
      .update({ credit_balance: newCreditBalance })
      .eq('user_id', user.id);
    
    // Update plan based on new credit balance
    if (newCreditBalance > 500) {
      setUserPlan('Premium');
    } else if (newCreditBalance > 100) {
      setUserPlan('Pro');
    } else {
      setUserPlan('Free');
    }
  };

  const updatePlan = (newPlan: string) => {
    setUserPlan(newPlan);
  };

  const importGuestHumanizations = async (userId: string) => {
    try {
      // Check if there are any guest humanizations stored in localStorage
      const guestItems = localStorage.getItem('guest_humanizations');
      if (!guestItems) return;
      
      const items = JSON.parse(guestItems);
      if (!items || !items.length) return;
      
      // Import each humanization to the user's account
      for (const item of items) {
        await supabase.from('rewrites').insert({
          user_id: userId,
          original_text: item.original_text,
          rewritten_text: item.rewritten_text,
          created_at: item.created_at
        });
      }
      
      // Clear the guest storage after importing
      localStorage.removeItem('guest_humanizations');
      localStorage.removeItem('guest_usage_count');
      
      console.log(`Imported ${items.length} humanizations from guest storage`);
    } catch (error) {
      console.error('Failed to import guest humanizations:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userCredits,
      userPlan,
      isAuthenticated: !!user,
      isLoading,
      signUp,
      signIn,
      signOut,
      updateCredits,
      updatePlan,
    }}>
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