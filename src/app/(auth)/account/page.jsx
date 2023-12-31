'use client'

import { PaperClipIcon } from '@heroicons/react/20/solid'
import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Footer } from "@/components/Footer";
import { CurrencyService } from 'primereact/api';
import { useState, useEffect, useRef } from "react";
import { Button } from 'primereact/button';

import "primereact/resources/themes/tailwind-light/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




  export default function Data() {

    //API call to populate jobCollection data.
    const [jobCollection, setJobCollection] = useState([]);

    async function fetchData(){
      try {
        const response = await fetch("http://localhost:8080/api/v1/jobs/getalljobs");

        if(response.ok){
          const data = await response.json();

          setJobCollection(data);
          console.log(jobCollection);

        } else {
            console.log("Error fetching data:", response.status, response.statusText);
        }
      } catch (error) {
        console.log("Error fetching data: ", error.message);
      }
    };
    // Auto API call on page render
    useEffect(()=>{
      fetchData();
    }, []);



    //NormalizedAnnualComp rounded to nearest dollar
    const currencyBodyTemplate = (rowData) => {
      // Format the currency without decimal points
      const formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        }).format(rowData.normalizedAnnualComp);
  
      return <span>{formattedCurrency}</span>;
    };
  



    // Delete button template for each row.
    const deleteTemplate = (rowData) => {
      return (
        <>
          <button
            onClick={() => deleteJob(rowData.id)}
            className="inline-block rounded-md bg-red-300 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
          >
            Delete
          </button>
        </>
      );
    };

    //delete button function ---> still needs to be updated to MySQL
    function deleteJob(jobId){
      const apiDeleteUrl = `http://localhost:8080/api/v1/jobs/deletejob/${jobId}`;
      fetch(apiDeleteUrl,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
        },
      })
        .then(response =>{
          if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            console.log(response.text());
          }
        })
        .catch(error => {
          // Handle errors during the fetch operation
          console.error('Error deleting job:', error.message);
          alert(apiDeleteUrl); 
        });
      console.log(`${jobId}`);
      window.location.reload();
    };
    






    //////// Row Expansion
    const [expandedRows, setExpandedRows] = useState(null);

    /// allows row expansion
    const allowExpansion = (rowData) => {
      if (rowData.id!=null){
        return true;
      } return false;
    };

    const onRowExpand = (event) => {
    };

    const onRowCollapse = (event) => {
    };

    /////Template for row expansion
    const rowExpansionTemplate = (rowData) => {
      return (
          // <div className="px-20 py-3 text-right text-sm text-gray-900">
          //       {rowData.weeklyHours!=null &&(
          //         <h1>W-2 Job </h1>
          //       )}
          //       {rowData.dailyHours!=null &&(
          //         <h1>Contractor Job </h1>
          //       )}

          //       <p>{rowData.compPerHour}</p>
          //       <p>{rowData.compPerPatient}</p>
          //       <p>{rowData.dailyHours}</p>
          //       <p>{rowData.weeklyHours}</p>
          // </div>
          <div>
      <div className="px-5 sm:px-0 ">
        {rowData.dailyRateAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 pl-24">Contractor (1099)</h3>)}
        {rowData.annualSalaryAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 pl-24">Employed (W-2)</h3>)}
      </div>
      <div className="mt-6 pl-24">
        <dl className="grid grid-cols-1 sm:grid-cols-4">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {rowData.dailyRateAndBonus!=null && (<p>Daily Pay with Bonus</p>)}
              {rowData.annualSalaryAndBonus!=null && (<p>Annual Pay with Bonus</p>)}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {rowData.dailyRateAndBonus!=null && (<p>{rowData.dailyRateAndBonus}</p>)}
              {rowData.annualSalaryAndBonus!=null && (<p>{rowData.annualSalaryAndBonus}</p>)}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {rowData.dailyHours!=null && (<p>Hours/Day</p>)}
              {rowData.weeklyHours!=null && (<p>Hours/Week</p>)}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {rowData.dailyHours!=null && (<p>{rowData.dailyHours}</p>)}
              {rowData.weeklyHours!=null && (<p>{rowData.weeklyHours}</p>)}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {rowData.patientsPerDay!=null && (<p>Patients/Day</p>)}
              {rowData.patientsPerWeek!=null && (<p>Patients/Week</p>)}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {rowData.patientsPerDay!=null && (<p>{rowData.patientsPerDay}</p>)}
              {rowData.patientsPerWeek!=null && (<p>{rowData.patientsPerWeek}</p>)}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Total Comp/Patient</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.compPerPatient}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Total Comp/Hour</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.compPerHour}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Employer Annual Health Ins</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.healthInsuranceValue}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Employer Annual Other Benefits</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.otherBenefitsValue}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Paid Days Off</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.paidDaysOff}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Comments</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {rowData.comments}
            </dd>
          </div>
        </dl>
      </div>
    </div>
      );
    };




///// Actual interface
    return (

      <>
        <Header/>
          <div className="px-4 sm:px-10 lg:px-10 xl:px-20 py-5">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Your Salary Compensation History:</h1>
                {/* <p className="mt-2 text-sm text-gray-700">
                  Explore below:
                </p> */}
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <a
                  
                  className="inline-block rounded-md bg-red-400 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                >
                  Delete Account
                </a>
                <a
                  // type="button"
                  className="inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update Account
                </a>
                <a
                  href="/jobform"
                  className="inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Salary
                </a>
              </div>
            </div>

            <div className="mt-10 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                    <DataTable 
                      //what data set is being mapped
                      value={jobCollection}

                      //styling
                      tableStyle={{ minWidth: '30rem' }}
                      className="px-3 py-3.5 text-left text-sm text-gray-900 min-w-full divide-y divide-gray-300"
                      showGridlines
                      stripedRows

                      //SORTING
                      removableSort

                      //PAGINATER
                      paginator
                      rows={10}
                      // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"


                      //FILTER
                      // filters={filters}
                      filterDisplay="row"
                      emptyMessage="No data found."
                      //"menu" or "row"
                      // globalFilterFields={[]}
                      // dataKey="id"
                      // header={header} 
                      // loading={loading}
                      

                      //EXPANSION
                      expandedRows={expandedRows} 
                      onRowToggle={(e) => setExpandedRows(e.data)}
                      onRowExpand={onRowExpand} 
                      onRowCollapse={onRowCollapse} 
                      rowExpansionTemplate={rowExpansionTemplate}
                      >
                        

                        <Column 
                                expander={allowExpansion}
                                style={{ width: '5%' }}
                                >
                                </Column>
                                
                        <Column  
                                field="year" 
                                header="Year" 
                                sortable style={{ width: '15%' }}
                                ></Column>

                        <Column 
                                field="state" 
                                header="State" 
                                filterPlaceholder="Search"
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '15%' }}
                                ></Column>

                        <Column 
                                field="city" 
                                header="City" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '15%' }}
                                ></Column>

                        <Column 
                                field="normalizedAnnualComp" 
                                header="Standardized Annual Comp" 
                                body={currencyBodyTemplate}
                                sortable 
                                style={{ width: '20%' }}
                                ></Column>

                        <Column 
                                body={deleteTemplate}
                                style={{ width: '5%' }}
                                ></Column>  
                    </DataTable>

                  </div>
                </div>
              </div>
            </div>
          </div>
        <Footer/>
      </>
    )
  }
  