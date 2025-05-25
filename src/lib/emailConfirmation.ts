import { supabase } from './supabase';

/**
 * Utility function to confirm a user's email for testing purposes
 * Note: This should not be used in production!
 */
export const confirmUserEmail = async (email: string): Promise<boolean> => {
  try {
    // Try to fetch the user from Supabase
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('Error fetching users:', error);
      return false;
    }
    
    // Find the user with the specified email
    const user = data?.users?.find(u => u.email === email);
    
    if (!user) {
      console.error('User not found with email:', email);
      return false;
    }
    
    // Mark email as confirmed
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { email_confirmed: true }
    );
    
    if (updateError) {
      console.error('Error confirming email:', updateError);
      return false;
    }
    
    console.log('Email confirmed successfully for:', email);
    return true;
  } catch (error) {
    console.error('Exception confirming email:', error);
    return false;
  }
};

/**
 * Alternative approach - manual SQL query
 * To be executed in Supabase SQL Editor
 */
export const getEmailConfirmationSQL = (email: string): string => {
  return `
-- Run this in Supabase SQL Editor to confirm a user's email
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = '${email}';
  `;
};
