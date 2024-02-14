'use client'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Footer } from '@/components/Footer'

import { AuthLayout } from '@/components/AuthLayout'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'

const supabase = createClient(
    'https://tsrrewcbkzocevvrlsih.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnJld2Nia3pvY2V2dnJsc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDMzNjksImV4cCI6MjAxNzQ3OTM2OX0.H3QUkTtGrRxO1OvDE9kU49sILeYydS1zGdZnXZ-P29o'
)

// export const metadata = {
//   title: 'Sign In',
// }

export default function Login() {
  ///Router instance
  const router= useRouter();

  supabase.auth.onAuthStateChange(async (event)=>{
    if (event=== "SIGNED_IN"){
      window.location.href = '/account';


      // router.push("/account");
      
      //forward to localhost:3000/odform or localhost:3000/account depending on if registered before
      // const { data: existingUsers, error: usersError } = await supabase
      //     .from('users')
      //     .select('*')
      //     .eq('id', user.id);

      //     if (usersError) {
      //       console.error('Error fetching user data:', usersError.message);
      //       // Handle error appropriately
      //     } else {
      //       if (existingUsers.length > 0) {
      //         //If registered before
      //         router.push('/account');
      //       } else {
      //         // New user, redirect to another page
      //         router.push('/odform');
      //       }
      //     }
    } 
  })

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
