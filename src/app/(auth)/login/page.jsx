'use client'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Footer } from '@/components/Footer'

import { AuthLayout } from '@/components/AuthLayout'
// import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { SupabaseCreateClient } from '@/components/SupabaseCreateClient'


export default function Login() {

  ///instantiate supabase
  const supabase = SupabaseCreateClient();

  ///Router instance
  const router= useRouter();

  supabase.auth.onAuthStateChange(async (event)=>{
    if (event=== "SIGNED_IN"){
      window.location.href = '/account';
    } 
  })


  ///////User Interface////
  return (
    <>
      <AuthLayout
        title="Sign In or Create a New Account!"
        subtitle={
          <>
            Add your salaries to promote compensation transparency.
          </>
        }
      >
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa,
                variables: {
                    default: {
                      colors: {
                        brand: '#10c5e0',
                        brandAccent: '#0c899c',
                      },
                    },
                  },
            }}
            providers={['google']}
            // , 'facebook'
        />
      </AuthLayout>
    </>
  )
}
