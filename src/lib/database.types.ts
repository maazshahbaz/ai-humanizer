export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      plans: {
        Row: {
          id: number;
          name: string;
          credit_limit: number;
          price: number;
          features: string[];
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          credit_limit: number;
          price: number;
          features?: string[];
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          credit_limit?: number;
          price?: number;
          features?: string[];
          created_at?: string;
        };
      };
      rewrites: {
        Row: {
          id: number;
          user_id: string;
          original_text: string;
          rewritten_text: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          original_text: string;
          rewritten_text: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          original_text?: string;
          rewritten_text?: string;
          created_at?: string;
        };
      };
      user_credits: {
        Row: {
          user_id: string;
          credit_balance: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          credit_balance: number;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          credit_balance?: number;
          updated_at?: string;
        };
      };
    };
  };
}