// import {UserCircleIcon, PhotoIcon } from '@heroicons/react/24/solid'
// import {UserCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'
'use client'
import { useEffect } from 'react';
import { Container } from '@/components/Container'
import { useState } from 'react'
import { formatCurrency } from '@/components/FormattingCurrency';
import { formatNumbersOnlyNoDecimals } from '@/components/FormattingNumbersOnlyNoDecimals';
import { removeNonNumericCharacters } from '@/components/RemoveNonNumericaCharacters';
import LoginFirst from '../loginfirst/page';
import AccountSkeleton from '@/components/AccountSkeleton';
import { SupabaseCreateClient } from '@/components/SupabaseCreateClient';
import { nullToZero } from '@/components/NulltoZero';

import { AuthLayout } from '@/components/AuthLayout'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function ODFormUpdate() {

  ///instantiante supabase///
  const supabase= SupabaseCreateClient();

///variable while authorizing user  
  const [loading, setLoading] = useState(true);

////router
  const router = useRouter();

////////initialize userId///////
  const [userId, setUserId] = useState(null);

//////initialize formData Display variables
  const [formDataUpdate, setFormDataUpdate] = useState({
      "yearGraduated": '',
      "initialDebt": '',
      "residency": '',
      "gender": '',
      "race": '',
  });

//////initialize formData backend variables
  const [formDataUpdateSend, setFormDataUpdateSend] = useState({
    "yearGraduated": '',
    "initialDebt": '',
    "residency": '',
    "gender": '',
    "race": '',
});

//////set userId//////
  useEffect(()=>{
    async function getUserData(){
      await supabase.auth.getUser().then((value)=>{
        if(value.data?.user){
          setUserId(value.data.user.id);
          console.log(userId);  
        } 
        setLoading(false);
      })
    }
    getUserData(); 
  },[])

///// get user data from backend using userId
  useEffect(() => {

    if(userId){
      console.log(userId);
      const fetchUserData = async () => {
        try {
          // const response = await fetch("http://localhost:8080/api/v1/optometrists/getsingleoptometrist/"+"f12bf434-f279-4086-a550-aadb0c0cc467");
          const response = await fetch("http://localhost:8080/api/v1/optometrists/getsingleoptometrist/"+userId);

          const formDataUpdate = await response.json();
          // Update state with user data
          setFormDataUpdate(formDataUpdate);
          setFormDataUpdateSend(formDataUpdate);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

///////on any input change, formData gets changed
  function onInputChange(e){
    const { name, value } = e.target;

    let formattedValue;

    if(name === 'initialDebt') {
      formattedValue = formatCurrency(value);
    }
    else if (name === 'yearGraduated') {
      formattedValue = formatNumbersOnlyNoDecimals(value);
    }
    else {
      // No formatting for other fields
      formattedValue = value;
    }

    setFormDataUpdate({ 
      ...formDataUpdate, 
      [name]: formattedValue
    });

    setFormDataUpdateSend({ 
      ...formDataUpdateSend, 
      // [name]: name === 'initialDebt' ? removeNonNumericCharacters(value) : value
      [name]: name === 'initialDebt'||name==='yearGraduated' ? nullToZero(removeNonNumericCharacters(value)): value,
    });
  }


///update data to back-end
  function updateOptometristAccount(e){
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/optometrists/updateoptometrist/"+userId,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(formDataUpdateSend)})
    
    .then((response)=>response.text())
    .then((responseText)=>{
      console.log(responseText);
      router.push("/account");

    })
    .catch((error)=>{
      console.log('Error updating user data:', error);
    })
    console.log("Hello smello");
  };

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
  return (
    <Container>
    <form onSubmit={updateOptometristAccount}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            To provide better analytics, please answer the following questions.
          </p> */}
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update User Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please update information below:
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-4">
              <label htmlFor="yearGraduated" 
              className="block text-sm font-medium leading-6 text-gray-900">
                What year did you graduate OD school?
              </label>
              <div className="mt-2">
                <input
                  id="yearGraduated"
                  name="yearGraduated"
                  type="text"
                  placeholder='XXXX'
                  maxLength="4"
                  value={formDataUpdate.yearGraduated}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="initialDebt" className="block text-sm font-medium leading-6 text-gray-900">
                How much total debt did you graduate with?
              </label>
              <div className="mt-2">
                <input
                  id="initialDebt"
                  name="initialDebt"
                  type="text"
                  placeholder='Please answer in USD'
                  value={formDataUpdate.initialDebt}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="residency" className="block text-sm font-medium leading-6 text-gray-900">
                Did you complete residency?
              </label>
              <div className="mt-2">
                <select
                  id="residency"
                  name="residency"
                  value={formDataUpdate.residency}
                  
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={formDataUpdate.gender}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="race" className="block text-sm font-medium leading-6 text-gray-900">
                Race
              </label>
              <div className="mt-2">
                <select
                  id="race"
                  name="race"
                  value={formDataUpdate.race}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Caucasian</option>
                  <option>Asian</option>
                  <option>Hispanic</option>
                  <option>Black</option>
                  <option>Native American</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
        <Link
          href="/account"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type='submit'
          className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
    </form>
    </Container>
  )
}