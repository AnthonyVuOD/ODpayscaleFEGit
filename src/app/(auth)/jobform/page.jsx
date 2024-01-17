'use client'
import { Container } from '@/components/Container'
import {UserCircleIcon, PhotoIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { RadioButton } from 'primereact/radiobutton';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function JobForm (){

    ////Formatting to currency for user inputs
    const formatCurrency = (value) => {
        // Remove non-numeric characters
        const numericValue = value.replace(/[^0-9.]/g, '');
    
        // Use Intl.NumberFormat to format as currency
        const formattedValue = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD', // Change this based on your currency
        //   minimumFractionDigits: 2,
          maximumFractionDigits: 0,
        }).format(numericValue);
    
        return formattedValue;
      };


    
    // Contractor Job variable and Functions//
    const [contractorFormData, setContractorFormData] = useState({
        "optometristId":'1',
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
    
    function onContractorInputChange(e){
        const { name, value } = e.target;

        const formattedValue = name === 'healthInsuranceValue'||name === 'dailyRateAndBonus'||name === 'otherBenefitsValue' ? formatCurrency(value) : value;

        setContractorFormData({ 
            ...contractorFormData,
            [name]: formattedValue
        });
    }

    function createContractorJob(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/v1/contractorjobs/createcontractorjob",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
            },
            body: JSON.stringify(contractorFormData)})
        
        .then((response)=>response.text())
        .then((responseText)=>{
            console.log(responseText);
        })
        .catch((error)=>{
            console.log(error)
        })

        console.log("Hello smello");
        window.location.href = '/account';
    };

    //W2 Job Form functions and variables
    const [w2FormData, setW2FormData] = useState({
        "optometristId":'1',
        "year" : '',
        "state" : 'Alabama',
        "city": '',
        "practiceMode": 'Private Practice',
        "setting" : "Urban",
        "paidDaysOff" : '',
        "healthInsuranceValue" : '',
        "otherBenefitsValue" : '',
        "comments": '',
        "annualSalaryAndBonus": '',
        "weeklyHours": '',
        "patientsPerWeek": ''
      });
    
    function onW2InputChange(e){
        const { name, value } = e.target;

        const formattedValue = name === 'healthInsuranceValue'||name === 'annualSalaryAndBonus'||name === 'otherBenefitsValue' ? formatCurrency(value) : value;

        setW2FormData({ 
            ...w2FormData, 
            [name]: formattedValue, 
        });
    }

    
    
    function createW2Job(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/v1/w2jobs/createw2job",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
            },
            body: JSON.stringify(w2FormData)})
        
        .then((response)=>response.text())
        .then((responseText)=>{
            console.log(responseText);
        })
        .catch((error)=>{
            console.log(error)
        })

        console.log("Hello smello");
        window.location.href = '/account';
    };


    return (
        <Container>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <br />
                    <br />
                    <h1 className="mt-1 text-lg leading-6 text-gray-600">
                        Add new salary data:
                    </h1>
                    <br />
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Is this an employed job (W-2) or an independent contractor job (1099)?
                    </p>
                    <br />
                    <fieldset>
                        <input id="w2" class="peer/w2" type="radio" name="status"/>
                        <label for="w2" class="peer-checked/draft:text-cyan-500 pr-10 pl-2 mt-1 text-sm leading-6 text-gray-600">W-2 Employed</label>

                        <input id="1099" class="peer/1099" type="radio" name="status" />
                        <label for="1099" class="peer-checked/published:text-cyan-500 pr-10 pl-2 mt-1 text-sm leading-6 text-gray-600">1099 Independent Contractor</label>

                        <div class="hidden peer-checked/w2:block">
                            <br />
                            <hr />
                            <br />

                            <form onSubmit={createW2Job}>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        W-2 Employed Job Salary Details
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Please answer a few questions about your employed salary:
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">

                                        <div className="sm:col-span-4">
                                            <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                                                Year
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="year"
                                                id="year"
                                                value={w2FormData.year}
                                                onChange={onW2InputChange}
                                                placeholder='XXXX'
                                                maxLength="4"
                                                pattern="[0-9]{4}"
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
                                                value={w2FormData.state}
                                                onChange={onW2InputChange}
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
                                                City or County
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                value={w2FormData.city}
                                                onChange={onW2InputChange}
                                                placeholder='Leave blank if you do not wish to specify'
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
                                                value={w2FormData.practiceMode}
                                                onChange={onW2InputChange}
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
                                                value={w2FormData.setting}
                                                onChange={onW2InputChange}
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
                                            <label htmlFor="annualSalaryAndBonus" className="block text-sm font-medium leading-6 text-gray-900">
                                                Annual salary (Including bonus):
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="annualSalaryAndBonus"
                                                id="annualSalaryAndBonus"
                                                value={w2FormData.annualSalaryAndBonus}
                                                onChange={onW2InputChange}
                                                placeholder='XXX,XXX'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="healthInsuranceValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to healthcare:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="healthInsuranceValue"
                                                id="healthInsuranceValue"
                                                value={w2FormData.healthInsuranceValue}
                                                onChange={onW2InputChange}
                                                placeholder='$'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="otherBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to other benefits (Licensure, CE, insurance, etc.):
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="otherBenefitsValue"
                                                id="otherBenefitsValue"
                                                value={w2FormData.otherBenefitsValue}
                                                onChange={onW2InputChange}
                                                placeholder='$'
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
                                                value={w2FormData.paidDaysOff}
                                                onChange={onW2InputChange}
                                                maxLength="4"
                                                pattern="[0-9]{4}"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="weeklyHours" className="block text-sm font-medium leading-6 text-gray-900">
                                                Hours worked per week:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="weeklyHours"
                                                id="weeklyHours"
                                                value={w2FormData.weeklyHours}
                                                onChange={onW2InputChange}
                                                maxLength="4"
                                                pattern="[0-9]{4}"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="patientsPerWeek" className="block text-sm font-medium leading-6 text-gray-900">
                                                Patients seen per week:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="patientsPerWeek"
                                                id="patientsPerWeek"
                                                value={w2FormData.patientsPerWeek}
                                                onChange={onW2InputChange}
                                                maxLength="4"
                                                pattern="[0-9]{4}"
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
                                                id="comments"
                                                name="comments"
                                                rows={3}
                                                value={w2FormData.comments}
                                                onChange={onW2InputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                placeholder='Please include other salary details or leave this blank. Helpful information would include bonus structure, revenue collected, weekends, etc.'
                                                maxLength="250"
                                                />
                                                <p className="text-right block text-xs font-small leading-6 text-gray-900">Max character count: {w2FormData.comments.length}/250</p> 
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <a
                                        href="/account" 
                                        className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </a>
                                    <button
                                        href="/account" 
                                        type="submit"
                                        className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Save
                                    </button>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </form>
                        </div>



                        <div class="hidden peer-checked/1099:block">
                            <br />
                            <hr />
                            <br />
                            <form onSubmit={createContractorJob}>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        1099 Contractor Job Salary Details
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Please answer a few questions about your contractor salary:
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">

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
                                                maxLength="4"
                                                pattern="[0-9]{4}"
                                                value={contractorFormData.year}
                                                onChange={onContractorInputChange}
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
                                                value={contractorFormData.state}
                                                onChange={onContractorInputChange}
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
                                                City or County
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder='Leave blank if you do not wish to specify'
                                                value={contractorFormData.city}
                                                onChange={onContractorInputChange}
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
                                                value={contractorFormData.practiceMode}
                                                onChange={onContractorInputChange}
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
                                                value={contractorFormData.setting}
                                                onChange={onContractorInputChange}
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
                                                Estimated daily pay (Including bonus):
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="dailyRateAndBonus"
                                                id="dailyRateAndBonus"
                                                placeholder='XXX'
                                                value={contractorFormData.dailyRateAndBonus}
                                                onChange={onContractorInputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="healthInsuranceValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to healthcare:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="healthInsuranceValue"
                                                id="healthInsuranceValue"
                                                placeholder='$'
                                                value={contractorFormData.healthInsuranceValue}
                                                onChange={onContractorInputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="otherBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to other benefits (Licensure, CE, Insurance, etc.):
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="otherBenefitsValue"
                                                id="otherBenefitsValue"
                                                placeholder='$'
                                                value={contractorFormData.otherBenefitsValue}
                                                onChange={onContractorInputChange}
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
                                                value={contractorFormData.paidDaysOff}
                                                onChange={onContractorInputChange}
                                                maxLength="4"
                                                pattern="[0-9]{4}"
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
                                                value={contractorFormData.dailyHours}
                                                onChange={onContractorInputChange}
                                                maxLength="4"
                                                pattern="[0-9]{4}"
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
                                                value={contractorFormData.patientsPerDay}
                                                onChange={onContractorInputChange}
                                                maxLength="4"
                                                pattern="[0-9]{4}"
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
                                                value={contractorFormData.comments}
                                                onChange={onContractorInputChange}
                                                maxlength="250"
                                                placeholder='Please include other salary details or leave this blank. Helpful information would include bonus structure, revenue collected, weekends, etc.'
                                                />
                                               <p className="text-right block text-xs font-small leading-6 text-gray-900">Max character count: {contractorFormData.comments.length}/250</p> 
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <a
                                        href="/account" 
                                        className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </a>
                                    <button
                                        href="/account" 
                                        type="submit"
                                        className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Save
                                    </button>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </form>
                        </div>
                    </fieldset>
                </div>
            </div>
        </Container>
    )
}