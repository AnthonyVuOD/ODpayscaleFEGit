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
'use client'
import { Container } from '@/components/Container'
import {UserCircleIcon, PhotoIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';

export default function ContractorJobForm() {

  const [formData, setFormData] = useState({
    "optometristId":'2',
    "year" : '',
    "state" : 'Alabama',
    "city": '',
    "practiceMode": 'Private Practice',
    "setting" : "Urban",
    "paidDaysOff" : '',
    "healthInsuranceValue" : '',
    "otherBenefitsValue" : '',
    "comments": '',
    "dailyRateAndBonus": '',
    "dailyHours": '',
    "patientsPerDay": ''
  });

  function onInputChange(e){
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function createContractorJob(e){
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/contractorjobs/createcontractorjob",{
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
    <form onSubmit={createContractorJob}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill out the questions below as accuratly as possible.
          </p> */}
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">1099 Salary Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please answer a few questions about your salary details:
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                Year
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="year"
                  id="year"
                  placeholder='XXXX'
                  value={formData.year}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State
              </label>
              <div className="mt-2">
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                  <option>Kentucky</option>
                  <option>Louisiana</option>
                  <option>Maine</option>
                  <option>Maryland</option>
                  <option>Massachusetts</option>
                  <option>Michigan</option>
                  <option>Minnesota</option>
                  <option>Mississippi</option>
                  <option>Missouri</option>
                  <option>Montana</option>
                  <option>Nebraska</option>
                  <option>Nevada</option>
                  <option>New Hampshire</option>
                  <option>New Jersey</option>
                  <option>New Mexico</option>
                  <option>New York</option>
                  <option>North Carolina</option>
                  <option>North Dakota</option>
                  <option>Ohio</option>
                  <option>Oklahoma</option>
                  <option>Oregon</option>
                  <option>Pennsylvania</option>
                  <option>Rhode Island</option>
                  <option>South Carolina</option>
                  <option>South Dakota</option>
                  <option>Tennessee</option>
                  <option>Texas</option>
                  <option>Utah</option>
                  <option>Vermont</option>
                  <option>Virginia</option>
                  <option>Washington</option>
                  <option>West Virginia</option>
                  <option>Wisconsin</option>
                  <option>Wyoming</option>
                  <option>Alberta</option>
                  <option>British Columbia</option>
                  <option>Manitoba</option>
                  <option>New Brunswick</option>
                  <option>Newfoundland and Labrador</option>
                  <option>Nova Scotia</option>
                  <option>Ontario</option>
                  <option>Prince Edward Island</option>
                  <option>Quebec</option>
                  <option>Saskatchewan</option>
                  <option>Yukon</option>
                  <option>Nunavut</option>
                  <option>Northwest Territories</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder='Type here'
                  value={formData.city}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="practiceMode" className="block text-sm font-medium leading-6 text-gray-900">
                Practice mode:
              </label>
              <div className="mt-2">
                <select
                  id="practiceMode"
                  name="practiceMode"
                  value={formData.practiceMode}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Private Practice</option>
                  <option>Retail/ Commercial</option>
                  <option>MD/OD</option>
                  <option>Veteran Affairs</option>
                  <option>Hospital Based</option>
                  <option>Remote</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="setting" className="block text-sm font-medium leading-6 text-gray-900">
                Setting:
              </label>
              <div className="mt-2">
                <select
                  id="setting"
                  name="setting"
                  value={formData.setting}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Urban</option>
                  <option>Suburban</option>
                  <option>Rural</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="dailyRateAndBonus" className="block text-sm font-medium leading-6 text-gray-900">
                Estimated Daily pay(Including bonus):
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="dailyRateAndBonus"
                  id="dailyRateAndBonus"
                  placeholder='XXX'
                  value={formData.dailyRateAndBonus}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="healthInsuranceValue" className="block text-sm font-medium leading-6 text-gray-900">
                Employer annual contribution to healthcare (Estimate):
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="healthInsuranceValue"
                  id="healthInsuranceValue"
                  placeholder='$'
                  value={formData.healthInsuranceValue}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="otherBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                Employer annual contribution to other benefits (Licensure, CE, insurance, etc.):
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="otherBenefitsValue"
                  id="otherBenefitsValue"
                  placeholder='$'
                  value={formData.otherBenefitsValue}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="paidDaysOff" className="block text-sm font-medium leading-6 text-gray-900">
                Paid days off per year:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="paidDaysOff"
                  id="paidDaysOff"
                  value={formData.paidDaysOff}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="dailyHours" className="block text-sm font-medium leading-6 text-gray-900">
                Hours worked per day:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="dailyHours"
                  id="dailyHours"
                  value={formData.dailyHours}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="patientsPerDay" className="block text-sm font-medium leading-6 text-gray-900">
                Patients seen per day:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="patientsPerDay"
                  id="patientsPerDay"
                  value={formData.patientsPerDay}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="comments" className="block text-sm font-medium leading-6 text-gray-900">
                Comments:
              </label>
              <div className="mt-2">
                <textarea
                  rows={3}
                  id="comments"
                  name="comments"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  value={formData.comments}
                  onChange={onInputChange}
                  placeholder='Please include other salary details or leave this blank. Helpful information would include bonus structure, revenue collected, weekends, etc.'
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
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