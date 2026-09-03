/** @format */

// svelte
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') || '');

    if (!email || email.length < 3) {
      return fail(400, {
        email,
        message: 'Email must be at least 3 characters.',
        success: false,
      });
    }

    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      return fail(500, {
        email,
        message: 'Server error. Try again later.',
        success: false,
      });
    }

    return {
      email,
      message:
        'Please check your email for a magic link to confirm your changes.',
      success: true,
    };
  },
};
