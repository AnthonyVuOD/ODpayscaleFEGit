'use client'

import Link from 'next/link'


import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'

// export const metadata = {
//   title: 'Delete account',
// }



export default function DeleteAccount() {

  const deleteUser = () => {

    console.log ("Deleted");

    // fetch(`http://example.com/api/users/${userId}`, {
    fetch("http://localhost:8080/api/v1/optometrists/deletesingleoptometrist/6", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // You can remove this if not expecting JSON response
      })
      .then((data) => {
        // Handle success or additional actions after deletion
        console.log('User deleted successfully:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting user:', error);
      })

  };




  return (
    <AuthLayout
      title="Delete your account"
      subtitle={
        <>
          Your account and your salary details will be deleted but you can always comeback!
        </>
      }
    >
      <form
        className="flex flex-col items-center"
        // onClick={deleteUser}
      >
        <a 
            onClick={deleteUser}
            // type="submit" 
            // color="cyan" 
            // className="mt-0 w-full">
            className="inline-block rounded-md bg-red-300 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
            >
          Delete account
        </a>
      </form>
    </AuthLayout>
  )
}
