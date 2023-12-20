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
import { Container } from '@/components/Container'
import {UserCircleIcon, PhotoIcon } from '@heroicons/react/20/solid'

export default function Example() {
  function createOptometristAccount(){
    fetch("http://localhost:8080/api/v1/optometrists/createoptometrist",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        "gender": "Male",
        "initialDebt": 99,
        "race": "Black",
        "residency": "No",
        "yearGraduated": 2013
      })
    })
    
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
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            To provide better analytics, please answer the following questions.
          </p> */}
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">User information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            To provide better analytics, please answer a few questions:
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-4">
              <label htmlFor="year" 
              className="block text-sm font-medium leading-6 text-gray-900">
                What year did you graduate OD school?
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="year"
                  id="year"
                  autoComplete="given-name"
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
                  autoComplete="email"
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
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Yes</option>
                  <option>No</option>
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
                  autoComplete="country-name"
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
                  autoComplete="country-name"
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button 
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={createOptometristAccount()}
          type="submit"
          className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </Container>
  )
}