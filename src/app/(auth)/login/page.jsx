'use client'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import axios from 'axios'
import { Footer } from '@/components/Footer'

// export const metadata = {
//   title: 'Sign In',
// }

export default function Login() {

  const handleGoogleLogin = async () => {
    try {
      // Make a request to the backend server to initiate the Google OAuth2 flow
      const response = await axios.get('/auth/google');
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('Error initiating Google login:', error);
    }
  };


  return (
    <>
    <AuthLayout
      title="Sign in with your Facebook or Google account!"
      subtitle={
        <>
          Add your salaries to promote compensation transparency.
        </>
      }
    >
      <form>
        {/* <div className="space-y-6">
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
        </div> */}
        {/* <Button 
          type="submit"
          color="cyan" 
          className="mt-8 w-full"
          >
            Sign in with Facebook account
        </Button> */}

        <Button 
          type="submit" 
          color="cyan" 
          className="mt-0 w-full"
          onClick={handleGoogleLogin}
          >
            Sign in with Google account
        </Button>


        <Button 
          type="submit" 
          color="cyan" 
          className="mt-8 w-full"
          onClick={handleGoogleLogin}
          >
            Sign in with Facebook account
        </Button>
      </form>
    </AuthLayout>
    </>
  )
}
