import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

export const metadata = {
  title: 'Sign In',
}

export default function Login() {
  return (
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
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Sign in with Facebook account
        </Button>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Sign in with Google account
        </Button>
      </form>
    </AuthLayout>
  )
}
