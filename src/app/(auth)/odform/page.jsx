'use client' 
import { Container } from '@/components/Container'
import { useEffect, useState } from 'react'
import { formatCurrency } from '@/components/FormattingCurrency';
import { formatNumbersOnlyNoDecimals } from '@/components/FormattingNumbersOnlyNoDecimals';
import { removeNonNumericCharacters } from '@/components/RemoveNonNumericaCharacters';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginFirst from '../loginfirst/page';
import { SupabaseCreateClient } from '@/components/SupabaseCreateClient';
import { nullToZero } from '@/components/NulltoZero';


import { AuthLayout } from '@/components/AuthLayout'
// import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// const supabase = createClient(
//     'https://tsrrewcbkzocevvrlsih.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnJld2Nia3pvY2V2dnJsc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDMzNjksImV4cCI6MjAxNzQ3OTM2OX0.H3QUkTtGrRxO1OvDE9kU49sILeYydS1zGdZnXZ-P29o'
// )


export default function ODForm(){
  const supabase = SupabaseCreateClient();
  
  const [loading, setLoading] = useState(true);

  const router = useRouter();

////////initialize userId///////
  const [userId, setUserId] = useState(null);

//////Find and set userId if user is authorized//////
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

///initialize Data, this data will be displayed to user formatted
  const [formData, setFormData] = useState({
    "id": userId,
    "yearGraduated": '',
    "initialDebt": '',
    "residency": 'No',
    "gender": 'Female',
    "race": 'Caucasian',
  });

///initialize Data, this data will be sent to backend unformatted (data with "$" and "," will not be accepted by backend)
  const [formDataSend, setFormDataSend] = useState({
    "id": userId,
    "yearGraduated": '0',
    "initialDebt": '0',
    "residency": 'No',
    "gender": 'Female',
    "race": 'Caucasian',
  });

///this assigns "UserId" to "id" whenever "userId"  changes////
  useEffect(() => {
    setFormDataSend(prevFormDataSend => ({
      ...prevFormDataSend,
      id: userId 
    }));
  }, [userId]);


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

    //format data to display
    setFormData({ 
      ...formData, 
      [name]: formattedValue
    });

    //unformat data to send to backend
    setFormDataSend({ 
      ...formDataSend, 
      [name]: name === 'initialDebt'||name==='yearGraduated' ? nullToZero(removeNonNumericCharacters(value)): value,
      // [name]: name === 'yearGraduated' ? nullToZero(value): value,
    });

    console.log(userId);
    console.log(formDataSend)
  }

  function createOptometristAccount(e){
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/optometrists/createoptometrist",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(formDataSend)})
    
    .then((response)=>response.text())
    .then((responseText)=>{
      console.log(responseText);
      window.location.reload();
    })
    .catch((error)=>{
      console.log(error)
    })
    console.log("Hello smello");
  };


  if(loading){
    return(
      <></>
    )
  } else if(userId===null){
    return (
      <LoginFirst/>
    )
  }
  return (
    <Container>
    <form 
      onSubmit={createOptometristAccount}
      >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            To provide better analytics, please answer the following questions.
          </p> */}
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">User Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            To provide better analytics, please answer the questions below:
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
                  value={formData.yearGraduated}
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
                  placeholder='USD'
                  value={formData.initialDebt}
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
                  value={formData.residency}
                  
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
                  value={formData.gender}
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
                  value={formData.race}
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
          href="/data"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          href="/account" 
          type='submit'
          className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </Container>
  )
}