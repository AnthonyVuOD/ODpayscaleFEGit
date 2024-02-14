'use client'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useState,useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Link from 'next/link';
import LoginFirst from '../loginfirst/page'
import { useRouter } from 'next/navigation'

const supabase = createClient(
    'https://tsrrewcbkzocevvrlsih.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnJld2Nia3pvY2V2dnJsc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDMzNjksImV4cCI6MjAxNzQ3OTM2OX0.H3QUkTtGrRxO1OvDE9kU49sILeYydS1zGdZnXZ-P29o'
)

// export const metadata = {
//   title: 'Delete account',
// }

export default function DeleteAccount() {
///Router instance
  const router = useRouter();
 
///variable while authorizing user  
  const [loading, setLoading] = useState(true);

////////initialize userId///////
  const [userId, setUserId] = useState(null);

//////set userId//////
  useEffect(()=>{
    function getUserData(){
      supabase.auth.getUser().then((value)=>{
        if(value.data?.user){
          setUserId(value.data.user.id);
          console.log(userId); 
          setLoading(false);
        }
        setLoading(false);
      })
    }
    getUserData(); 
     
  },[])


  /////NEEED TO ALSO DELETE USER FROM SUPABASE!!!!!
/////function to delete user////
  const deleteUser = () => {
    console.log(userId)
    // fetch(`http://example.com/api/users/${userId}`, {
    fetch("http://localhost:8080/api/v1/optometrists/deletesingleoptometrist/"+userId, {
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
        ///redirect!
        
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting user:', error);
      })
      ////does not work!!!!
      router.push("/account");
  };

    //// if user is still being authorized///
    if(loading){
      return(
        <></>
      )
    //// if user is is not authorized///
    } else if(userId===null){
      return (
        <LoginFirst/>
      )
    }
    // if user is authorized
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
          <button 
              onClick={deleteUser}
              // type="submit" 
              // color="cyan" 
              // className="mt-0 w-full">
              className="inline-block rounded-md bg-red-300 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
            Delete Account
          </button>
          <br />
          <a 
              href='/account'
              // type="submit" 
              // color="cyan" 
              // className="mt-0 w-full">
              // className="inline-block rounded-md bg-red-300 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
            Cancel
          </a>
        </form>
      </AuthLayout>
    )

}
