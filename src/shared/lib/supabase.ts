import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing from environment variables.');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
    return { data, error };
};

export const getUserInfo = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const user_email = session.user.email;
  const user_name = session.user.user_metadata.full_name || session.user.user_metadata.name;
  
  return { email: user_email, name: user_name, session };
};
