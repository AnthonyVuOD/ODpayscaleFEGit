/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// import {UserCircleIcon, PhotoIcon } from '@heroicons/react/24/solid'
// import {UserCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'
'use client'
import { Container } from '@/components/Container'
import {UserCircleIcon, PhotoIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function ODForm() {

  ////Formatting to currency for "Debt" variable
  const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, '');

    // Use Intl.NumberFormat to format as currency
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change this based on your currency
      maximumFractionDigits: 0,
    }).format(numericValue);

    return formattedValue;
  };


  const [formData, setFormData] = useState({
    "yearGraduated": '',
    "initialDebt": '',
    "residency": 'No',
    "gender": 'Female',
    "race": 'Caucasian',
  });


  function onInputChange(e){
    const { name, value } = e.target;

    const formattedValue = name === 'initialDebt' ? formatCurrency(value) : value;

    setFormData({ 
      ...formData, 
      [name]: formattedValue
    });
  }

  function createOptometristAccount(e){
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/optometrists/createoptometrist",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(formData)})
    
    .then((response)=>response.text())
    .then((responseText)=>{
      console.log(responseText);
    })
    .catch((error)=>{
      console.log(error)
    })

    console.log("Hello smello");
  };

  return (
    <Container>
    <form onSubmit={createOptometristAccount}>
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
                  placeholder='Please answer in USD'
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
        <a
          href="/data"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </a>
        <button
          // href="/account"
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