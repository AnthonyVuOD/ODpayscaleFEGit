'use client'
import { AuthLayout } from '@/components/AuthLayout'
import { useState,useEffect } from 'react'
import LoginFirst from '../loginfirst/page'
import { useRouter } from 'next/navigation'
import AccountSkeleton from '@/components/AccountSkeleton'
import { SupabaseCreateClient } from '@/components/SupabaseCreateClient'

export default function DeleteAccount() {

///supabase instance///
  const supabase= SupabaseCreateClient();

///Router instance
  const router = useRouter();
 
///loading variable  
  const [loading, setLoading] = useState(true);

///userID variable
  const [userId, setUserId] = useState(null);

////// Get and set userId//////
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


/////function to delete user from Supabase/MySQL and cascade all of Salary data////
  const deleteUser = async () => {
    console.log("Trying to delete user: "+userId);

    ////Delete from MySQL//////
    fetch("http://localhost:8080/api/v1/optometrists/deletesingleoptometrist/"+userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error deleting from MySQL! Status: ${response.status}`);
        }
        return response.json(); // You can remove this if not expecting JSON response
      })
      .then((data) => {
        // Handle success or additional actions after deletion
        console.log('User deleted successfully from MySQL:', data);
        ///redirect!
        
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting user from mySQL:', error);
      })

    ///////Delete from supabase Auth///////
    try {
      ///calls supabase "delete_user" function
      await supabase.rpc('delete_user');
      console.log('Delete RPC called');

    } catch (error) {
      console.error('Error deleting user:', error.message);
    }

    alert("User Deleted!");
    const{error} = supabase.auth.signOut();
    router.push("/data");
  };



////////////USER INTERFACE///////

    //// if user is still being authorized///
    if(loading){
      return(
        <AccountSkeleton/>
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
        <div
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
          {/* <br /> */}
          <a 
              href='/account'
              className="text-sm pt-3 font-semibold leading-6 text-gray-900"

              // type="submit" 
              // color="cyan" 
              // className="mt-0 w-full">
              // className="inline-block rounded-md bg-red-300 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
            Cancel
          </a>
        </div>
      </AuthLayout>
    )

}
