'use client'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Footer } from '@/components/Footer'

import { AuthLayout } from '@/components/AuthLayout'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { SupabaseCreateClient } from '@/components/SupabaseCreateClient'


export default function LoginFirst() {
  ///Supabase instance
  const supabase= SupabaseCreateClient();

  ///Router instance
  const router= useRouter();

  supabase.auth.onAuthStateChange(async (event)=>{
    if (event=== "SIGNED_IN"){
      window.location.href = '/account';
    } 
  })

  return (
    <>
      <AuthLayout
        title="You must be logged in first!"
        subtitle={
          <>
            Pleast log in before continuing...
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
