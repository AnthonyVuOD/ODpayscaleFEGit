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

// const supabase = createClient(
//     'https://tsrrewcbkzocevvrlsih.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnJld2Nia3pvY2V2dnJsc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDMzNjksImV4cCI6MjAxNzQ3OTM2OX0.H3QUkTtGrRxO1OvDE9kU49sILeYydS1zGdZnXZ-P29o'
// )

// export const metadata = {
//   title: 'Sign In',
// }

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
          providers={['google', 'facebook']}
      />
    </AuthLayout>


      {/* <form
        // className='text-center'  
      >
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button 
          type="submit"
          color="cyan" 
          className="mt-8 w-full"
          >
            Sign In
        </Button>
        <div
          className='text-center'
        >
          <a 
            href=""
            className="mt-8 w-full text-sm"
            >
            Forgot your password?
          </a>
        </div>
      </form>
      <br />
      <Button 
        // type="submit" 
        color="green" 
        className="mt-8 w-full"
        // onClick={handleGoogleLogin}
        >
          Don't have an account? Create a new account!
      </Button> 
       */}
   
    </>
  )
}
