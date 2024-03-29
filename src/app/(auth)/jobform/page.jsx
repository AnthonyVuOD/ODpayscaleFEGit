'use client'
import { Container } from '@/components/Container'
import { formatNumbersOnly } from '@/components/FormattingNumbersOnly';
import { formatNumbersOnlyNoDecimals } from '@/components/FormattingNumbersOnlyNoDecimals';
import { formatCurrency } from '@/components/FormattingCurrency';
import { removeNonNumericCharacters } from '@/components/RemoveNonNumericaCharacters';
import { useEffect, useState } from 'react';
import LoginFirst from '../loginfirst/page';
import AccountSkeleton from '@/components/AccountSkeleton';
import { SupabaseCreateClient } from '@/components/SupabaseCreateClient';
import { nullToZero } from '@/components/NulltoZero';

// import { Switch } from '@headlessui/react';
// import { RadioButton } from 'primereact/radiobutton';
// import {UserCircleIcon, PhotoIcon } from '@heroicons/react/20/solid'

import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// const supabase = createClient(
//     'https://tsrrewcbkzocevvrlsih.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnJld2Nia3pvY2V2dnJsc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDMzNjksImV4cCI6MjAxNzQ3OTM2OX0.H3QUkTtGrRxO1OvDE9kU49sILeYydS1zGdZnXZ-P29o'
// )


// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function JobForm (){
    ///instantiante supabase///
    const supabase= SupabaseCreateClient();

    /// variable while user is being authorized////
    const [loading, setLoading] = useState(true);

    /// Router
    const router = useRouter();

    ////////initialize userId///////
    const [userId, setUserId] = useState(null);

    ///variable to make sure user enterd required fields///
    const [isRequiredFieldsNull,setIsRequiredFieldsNull] = useState(false);

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

    ///this assigns "userId" to "OptometristId" whenever "userId"  changes////
    useEffect(() => {
        setW2FormDataSend(prevW2FormDataSend => ({
        ...prevW2FormDataSend,
        optometristId: userId 
        }));
    }, [userId]);




    // Contractor Job variable and Functions//
    const [contractorFormData, setContractorFormData] = useState({
        "optometristId": userId,
        "year" : '',
        "state" : 'Alabama',
        "city": '',
        "practiceMode": 'Private Practice',
        "setting" : "Urban",
        "paidDaysOff" : '',
        "healthInsuranceValue" : '',
        "retirementBenefitsValue" : '',
        "otherBenefitsValue" : '',
        "comments": '',
        "dailyRateAndBonus": '',
        "dailyHours": '',
        "patientsPerDay": ''
    });

    const [contractorFormDataSend, setContractorFormDataSend] = useState({
        "optometristId": userId,
        "year" : '0',
        "state" : 'Alabama',
        "city": '',
        "practiceMode": 'Private Practice',
        "setting" : "Urban",
        "paidDaysOff" : '0',
        "healthInsuranceValue" : '0',
        "retirementBenefitsValue" : '0',
        "otherBenefitsValue" : '0',
        "comments": '',
        "dailyRateAndBonus": '0',
        "dailyHours": '0',
        "patientsPerDay": '0'
    });

    ///this assigns "userId" to "OptometristId" whenever "userId"  changes////
    useEffect(() => {
        setContractorFormDataSend(prevContractorFormDataSend => ({
        ...prevContractorFormDataSend,
        optometristId: userId 
        }));
    }, [userId]);
    
    function onContractorInputChange(e){
        const { name, value } = e.target;

        let formattedValue;

        if(name === 'healthInsuranceValue'||name === 'dailyRateAndBonus'||name === 'retirementBenefitsValue'||name === 'otherBenefitsValue') {
          formattedValue = formatCurrency(value);
        }
        else if (name === 'paidDaysOff'||name === 'dailyHours'||name === 'patientsPerDay') {
          formattedValue = formatNumbersOnly(value);
        }
        else if (name === 'year') {
            formattedValue = formatNumbersOnlyNoDecimals(value);
          }
        else {
          // No formatting for other fields
          formattedValue = value;
        }

        setContractorFormData({ 
            ...contractorFormData,
            [name]: formattedValue
        });

        setContractorFormDataSend({ 
            ...contractorFormDataSend,
            // [name]: (name === 'healthInsuranceValue'||name === 'dailyRateAndBonus'||name === 'otherBenefitsValue') ? removeNonNumericCharacters(value) : value,
            [name]: (name === 'healthInsuranceValue'||name === 'dailyRateAndBonus'||name === 'retirementBenefitsValue'||name === 'otherBenefitsValue'||name === 'year')||name === 'paidDaysOff'||name === 'dailyHours'||name === 'patientsPerDay' ? nullToZero(removeNonNumericCharacters(value)) : value,

            
        });
        console.log(contractorFormDataSend);
    }

    function createContractorJob(e){
        e.preventDefault();

        if (contractorFormData.dailyRateAndBonus==="" || 
            contractorFormData.dailyHours==="" || 
            contractorFormData.patientsPerDay==="" || 
            contractorFormData.year==="") {
            // If any of the required fields are empty, show an alert or handle the error as needed
            alert("Please at least fill out required fields.");
            setIsRequiredFieldsNull(true);
            return; // Stop further execution
        }


        fetch("http://localhost:8080/api/v1/contractorjobs/createcontractorjob",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
            },
            body: JSON.stringify(contractorFormDataSend)})
        
        .then((response)=>response.text())
        .then((responseText)=>{
            console.log(responseText);
            router.push("/account");
        })
        .catch((error)=>{
            console.log(error)
        })

        console.log("Hello smello");
        // window.location.href = '/account';
    };

    //W2 Job Form functions and variables
    const [w2FormData, setW2FormData] = useState({
        "optometristId":userId,
        "year" : '',
        "state" : 'Alabama',
        "city": '',
        "practiceMode": 'Private Practice',
        "setting" : "Urban",
        "paidDaysOff" : '',
        "healthInsuranceValue" : '',
        "retirementBenefitsValue" : '',
        "otherBenefitsValue" : '',
        "comments": '',
        "annualSalaryAndBonus": '',
        "weeklyHours": '',  
        "patientsPerWeek": ''
      });

      const [w2FormDataSend, setW2FormDataSend] = useState({
        "optometristId":userId,
        "year" : '0',
        "state" : 'Alabama',
        "city": '',
        "practiceMode": 'Private Practice',
        "setting" : "Urban",
        "paidDaysOff" : '0',
        "healthInsuranceValue" : '0',
        "retirementBenefitsValue" : '0',
        "otherBenefitsValue" : '0',
        "comments": '',
        "annualSalaryAndBonus": '0',
        "weeklyHours": '0',
        "patientsPerWeek": '0'
      });
    
    function onW2InputChange(e){
        const { name, value } = e.target;

        // const formattedValue = name === 'healthInsuranceValue'||name === 'annualSalaryAndBonus'||name === 'otherBenefitsValue' ? formatCurrency(value) : value;

        let formattedValue;

        if(name === 'healthInsuranceValue'||name === 'annualSalaryAndBonus'||name === 'retirementBenefitsValue'||name === 'otherBenefitsValue') {
          formattedValue = formatCurrency(value);
        }
        else if (name === 'paidDaysOff'||name === 'weeklyHours'||name === 'patientsPerWeek') {
          formattedValue = formatNumbersOnly(value);
        }
        else if (name === 'year') {
            formattedValue = formatNumbersOnlyNoDecimals(value);
        }
        else {
          // No formatting for other fields
          formattedValue = value;
        }

        setW2FormData({ 
            ...w2FormData, 
            [name]: formattedValue, 
        });

        setW2FormDataSend({ 
            ...w2FormDataSend,
            // [name]: (name === 'healthInsuranceValue'||name === 'annualSalaryAndBonus'||name === 'otherBenefitsValue') ? removeNonNumericCharacters(value) : value,
            [name]: (name === 'healthInsuranceValue'||name === 'annualSalaryAndBonus'||name === 'retirementBenefitsValue'||name === 'otherBenefitsValue'||name === 'year')||name === 'paidDaysOff'||name === 'weeklyHours'||name === 'patientsPerWeek' ? nullToZero(removeNonNumericCharacters(value)) : value,

        });
        console.log(w2FormDataSend)
    }

    
    
    function createW2Job(e){
        e.preventDefault();

        if (w2FormData.annualSalaryAndBonuss==="" || 
            w2FormData.weeklyHours==="" || 
            w2FormData.patientsPerWeek==="" || 
            w2FormData.year==="") {
            // If any of the required fields are empty, show an alert or handle the error as needed
            alert("Please at least fill out required fields.");
            setIsRequiredFieldsNull(true);
            return; // Stop further execution
        }

        fetch("http://localhost:8080/api/v1/w2jobs/createw2job",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
            },
            body: JSON.stringify(w2FormDataSend)})
        
        .then((response)=>response.text())
        .then((responseText)=>{
            console.log(responseText);
            router.push("/account");
        })
        .catch((error)=>{
            console.log(error)
        })

        console.log("Hello smello");
    };


    //// if user is still being authorized///
    if (loading){
        return(
          <AccountSkeleton/>
        )
    //// if user is is not authorized///
    } else if (userId===null){
        return (
            <LoginFirst/>
        )
    }
    return (
        <Container>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 sm:max-w-lg">
                    <br />
                    <br />
                    <h1 className="mt-1 text-lg leading-6 text-gray-600">
                        Add new salary data:
                    </h1>
                    <br />
                    <p className="mt-1 text-sm leading-6 text-gray-600 ">
                        Is this an employed job (W-2) or an independent contractor job (1099)?
                    </p>
                    <br />
                    <fieldset>
                        <input id="w2" className="peer/w2" type="radio" name="status"/>
                        <label htmlFor="w2" className="peer-checked/draft:text-cyan-500 pr-10 pl-2 mt-1 text-sm leading-6 text-gray-600">W-2 Employed</label>

                        <input id="1099" className="peer/1099" type="radio" name="status" />
                        <label htmlFor="1099" className="peer-checked/published:text-cyan-500 pr-10 pl-2 mt-1 text-sm leading-6 text-gray-600">1099 Independent Contractor</label>

                        <div className="hidden peer-checked/w2:block">
                            <br />
                            <hr />
                            <br />

                            <form onSubmit={createW2Job}>
                                <div className="border-b border-gray-900/10 pb-12 ">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        W-2 Employed Job Salary Details
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600 ">
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
                                                pattern="[0-9]{0,4}"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                                <option>Retail/ Corporate</option>
                                                <option>MD/ OD</option>
                                                <option>Veterans Affairs</option>
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
                                                placeholder='$'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                            <label htmlFor="retirementBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to retirement:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="retirementBenefitsValue"
                                                id="retirementBenefitsValue"
                                                value={w2FormData.retirementBenefitsValue}
                                                onChange={onW2InputChange}
                                                placeholder='$'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="otherBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to other benefits (Licensure, CE, malpractice, dues, etc.):
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="weeklyHours" className="block text-sm font-medium leading-6 text-gray-900">
                                                Hours worked per week (Please do not include lunch):
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="weeklyHours"
                                                id="weeklyHours"
                                                value={w2FormData.weeklyHours}
                                                onChange={onW2InputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                    <Link
                                        href="/account" 
                                        className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </Link>
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



                        <div className="hidden peer-checked/1099:block">
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
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                                <option>Retail/ Corporate</option>
                                                <option>MD/ OD</option>
                                                <option>Veterans Affairs</option>
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
                                                placeholder='$'
                                                value={contractorFormData.dailyRateAndBonus}
                                                onChange={onContractorInputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                            <label htmlFor="retirementBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to retirement:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="retirementBenefitsValue"
                                                id="retirementBenefitsValue"
                                                placeholder='$'
                                                value={contractorFormData.retirementBenefitsValue}
                                                onChange={onContractorInputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="otherBenefitsValue" className="block text-sm font-medium leading-6 text-gray-900">
                                                Estimated employer annual contribution to other benefits (Licensure, CE, malpractice, dues, etc.):
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="dailyHours" className="block text-sm font-medium leading-6 text-gray-900">
                                                Hours worked per day (Please do not include lunch):
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="dailyHours"
                                                id="dailyHours"
                                                value={contractorFormData.dailyHours}
                                                onChange={onContractorInputChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                                {/* Conditional rendering to display red text if the field is empty */}
                                                {isRequiredFieldsNull===true && (
                                                    <p className="text-sm font-medium text-red-500 mt-1">   *Required field</p>
                                                )}
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
                                                maxLength="250"
                                                placeholder='Please include other salary details such as how many days per week or month you are able to secure this job at this per diem. Other helpful information would include bonus structure, revenue collected, weekends, etc.'
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