/**
 * Supabase Form Submission Helpers
 * Robust integration with proper error handling and TypeScript types
 */

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Type-safe form data
export type ContactFormData = Database['public']['Tables']['contact_submissions']['Insert'];

// Result type for better error handling
export type SubmissionResult = {
  success: boolean;
  data?: Database['public']['Tables']['contact_submissions']['Row'];
  error?: string;
};

/**
 * Submit a contact form to Supabase
 * @param formData - The contact form data to submit
 * @returns Promise with success status and data/error
 */
export async function submitContactForm(
  formData: Omit<ContactFormData, 'id' | 'created_at'>
): Promise<SubmissionResult> {
  try {
    // Validate input
    if (!formData.name?.trim()) {
      return { success: false, error: 'Name is required' };
    }
    
    if (!formData.email?.trim()) {
      return { success: false, error: 'Email is required' };
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    
    if (!formData.message?.trim()) {
      return { success: false, error: 'Message is required' };
    }

    // Submit to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase submission error:', error);
      
      // Handle specific error cases
      if (error.code === 'PGRST116') {
        return { success: false, error: 'Table not found. Please set up the database schema first.' };
      }
      
      if (error.code === '23505') {
        return { success: false, error: 'This submission already exists.' };
      }
      
      return { success: false, error: error.message || 'Failed to submit form' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error during form submission:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Get all contact submissions (admin only)
 * @returns Promise with all submissions or error
 */
export async function getContactSubmissions(): Promise<{
  success: boolean;
  data?: Database['public']['Tables']['contact_submissions']['Row'][];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      
      if (error.code === 'PGRST116') {
        return { success: false, error: 'Table not found. Please set up the database schema first.' };
      }
      
      return { success: false, error: error.message || 'Failed to fetch submissions' };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching submissions:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Check if Supabase is properly configured
 * @returns Promise with configuration status
 */
export async function checkSupabaseConnection(): Promise<{
  configured: boolean;
  tableExists: boolean;
  error?: string;
}> {
  try {
    // Try to query the table
    const { error } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116') {
        return { 
          configured: true, 
          tableExists: false,
          error: 'Supabase connected but contact_submissions table does not exist'
        };
      }
      
      return { 
        configured: false, 
        tableExists: false,
        error: error.message 
      };
    }

    return { configured: true, tableExists: true };
  } catch (error) {
    return { 
      configured: false, 
      tableExists: false,
      error: error instanceof Error ? error.message : 'Connection check failed'
    };
  }
}

/**
 * Simulate form submission for development/testing
 * Use this when Supabase is not set up yet
 */
export async function simulateFormSubmission(
  formData: Omit<ContactFormData, 'id' | 'created_at'>
): Promise<SubmissionResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
    return { success: false, error: 'All fields are required' };
  }
  
  // Simulate success
  console.log('📧 Simulated form submission:', formData);
  
  return {
    success: true,
    data: {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      created_at: new Date().toISOString(),
    }
  };
}

