'use client'

import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Footer } from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { FormattingRenders } from '@/components/FormattingRenders';
import { rowExpansionTemplate } from '@/components/DataExpansionTemplate';

// import { Tag } from "primereact/tag";
// import { Toast } from "primereact/toast";
// import { Button } from 'primereact/button';
// import { CurrencyService } from 'primereact/api';
// import { PaperClipIcon } from '@heroicons/react/20/solid'
// import { Container } from "@/components/Container"

import "primereact/resources/themes/tailwind-light/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function Data() {


// Formatting rendered data
  const { currencyBodyTemplate } = FormattingRenders();
// const {healthInsuranceFormatted} = FormattingRenders();
// const {otherBenefitsFormatted} = FormattingRenders();
// const {paidDaysOffValueFormatted} = FormattingRenders();
// const {compPerPatientFormatted} = FormattingRenders();
// const {compPerHourFormatted} = FormattingRenders();
// const {annualSalaryAndBonusFormatted} = FormattingRenders()
// const {dailyRateAndBonusFormatted} = FormattingRenders()
// const {annualizedDailyRateAndBonusFormatted} = FormattingRenders()
// const {paidDaysOffFormatted} = FormattingRenders();
// const {patientsPerDayFormatted} = FormattingRenders();
// const {patientsPerWeekFormatted} = FormattingRenders();
// const {dailyHoursFormatted} = FormattingRenders();
// const {weeklyHoursFormatted} = FormattingRenders();



////////API call to populate jobCollection data/////////////////
    const [jobCollection, setJobCollection] = useState([]);
    
    const optometristId = 1;


    async function fetchData(){
      try {
        const response = await fetch(`http://localhost:8080/api/v1/jobs/getjobsbyoptometristid/${optometristId}`);

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



 ///////// Delete button template for each row/////////
    const deleteTemplate = (rowData) => {
      return (
        <>
          <div className="text-center">
            <button
              onClick={() => deleteJob(rowData.id)}
              className="inline-block rounded-md bg-red-400 mx-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
            >
              Delete
            </button>
          </div>
        </>
      );
    };
////////add salary button//////
    const addSalaryTemplate = (rowData) => {
      return (
        <>
        <div className="text-center">
          <a
              href="/jobform"
              className="inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Salary
          </a>
        </div>
        </>
      );
    };



//////delete button function ---> still needs to be updated to MySQL
    function deleteJob(jobId){
      const apiDeleteUrl = `http://localhost:8080/api/v1/jobs/deletesinglejob/1`;
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
      // window.location.reload();
    };

///////////// Row Expansion///////////////
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

//////////// Actual interface //////////////
    return (

      <>
        <Header/>
          <div className="px-4 sm:px-10 lg:px-10 xl:px-20 py-5">
            <div className="sm:flex sm:items-left flex-col">
              <div className="sm:flex-auto text-left">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Your Account:</h1>
              </div>
              <div className="mt-4 sm:ml-0 sm:mt-0 sm:flex-none">
                <a
                  href='/deleteaccount'
                  className="mt-2 inline-block rounded-md bg-red-400 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                >
                  Delete Account
                </a>
                <a
                  href='/odformupdate'
                  className="mt-2 inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update Account
                </a>
                <a
                  href="/data"
                  className="mt-2 inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Logout
                </a>
                {/* <a
                    href="/jobform"
                    className="mt-2 float-right inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add New Salary
                </a> */}
              </div>
              {/* <div className="mt-2 ml-auto">
                <a
                  href="/jobform"
                  className=" rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Salary
                </a>
              </div> */}
            </div>

            <div className="mt-8 flow-root">
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
                      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                      currentPageReportTemplate="{first}  to  {last}  of  {totalRecords}" 
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
                                style={{ width: '3%' }}
                                >
                                </Column>
                                
                        <Column  
                                field="year" 
                                header="Year" 
                                sortable style={{ width: '2%' }}
                                ></Column>

                        <Column 
                                field="state" 
                                header="State" 
                                filterPlaceholder="Search"
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '10%' }}
                                ></Column>

                        <Column 
                                field="city" 
                                header="City/ County" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '10%' }}
                                ></Column>

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="setting" 
                                header="Setting" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false}
                                filter
                                filterField="setting" 
                                style={{ width: '10%' }}
                                ></Column>    

                        <Column 
                                field="normalizedAnnualComp" 
                                header="Annualized Total Comp" 
                                body={currencyBodyTemplate}
                                sortable 
                                style={{ width: '10%' }}
                                ></Column>

                        <Column 
                                header={addSalaryTemplate} 
                                body={deleteTemplate}
                                style={{ width: '13%' }}
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
  