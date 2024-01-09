'use client'

import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataTableFilterMeta, header, representativeBodyTemplate, representativeRowFilterTemplate, loading, filters, body, filterElement, expandedRows, onRowExpand, onRowCollapse, rowExpansionTemplate, allowExpansion } from "primereact/datatable";
import { Footer } from "@/components/Footer";
import { CurrencyService } from 'primereact/api';
import { useState, useEffect } from "react";


// import { React as ReactClient, useClient, unstable_useEffect as useEffect, useState as useStateClient } from "react";// import { useEffect, useClient } from "react";
// import { Table } from "@/components/Table";
import { Button } from 'primereact/button';
// import { DataTableFilterMeta} from "primereact/datatable";
// import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import "primereact/resources/themes/tailwind-light/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';







export default function Data() {

///////Declare JobCollection and API tp populate JobCollection///////
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
    // useEffect to automatically call API jobCollection
    useEffect(()=>{
      fetchData();
    }, []);

//////formatting normalizedAnnualComp rounded to nearest dollar//////
const currencyBodyTemplate = (rowData) => {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    }).format(rowData.normalizedAnnualComp);

  return <span>{formattedCurrency}</span>;
};

// const createCurrencyBodyTemplate = (propertyName) => (rowData) => {
//   const formattedCurrency = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     maximumFractionDigits: 0,
//   }).format(rowData[propertyName]);

//   return <span>{formattedCurrency}</span>;
// };

// Usage example:
// const annualCompBodyTemplate = createCurrencyBodyTemplate('normalizedAnnualComp');
// const otherVariableBodyTemplate = createCurrencyBodyTemplate('otherVariable');



///////////// Row Expansion//////////////////
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
      <div>
        <div className="px-5 sm:px-0 ml-48">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0 text-center bg-slate-100 rounded">
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                {rowData.dailyRateAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 inline-block">Contractor (1099)</h3>)}
                {rowData.annualSalaryAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 inline-block">Employed (W-2)</h3>)}
                <h3 className="font-medium leading-7 text-gray-900 pl-10 inline-block">{rowData.city},</h3>
                <h3 className="font-medium leading-7 text-gray-900 pl-2 inline-block">{rowData.state}</h3>
               </dd>
            </div>

            {/* <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0 text-center bg-slate-100 rounded-r-xl">
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <h3 className="font-semibold leading-7 text-gray-900 pl-10 inline-block">{rowData.city},</h3>
                <h3 className="font-semibold leading-7 text-gray-900 pl-2 inline-block">{rowData.state}</h3>
               </dd>
            </div> */}

            {/* <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <h3 className="font-semibold leading-7 text-gray-900 pl-10 inline-block">{rowData.setting}</h3>
               </dd>
            </div> */}

            {/* <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <h3 className="font-semibold leading-7 text-gray-900 pl-10 inline-block">{rowData.practiceMode}</h3>
               </dd>
            </div> */}

            {/* <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <h3 className="font-semibold leading-7 text-gray-900 pl-10 inline-block">{rowData.yearsOfExperience}</h3>
               </dd>
            </div>  */}
          </dl>
        </div>

        <div className="mt-6 pl-48 	">
          <dl className="grid grid-cols-1 sm:grid-cols-10 ">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0 bg-slate-100 rounded-l-md">
              <dt className="text-sm  leading-relaxed text-gray-900">
                <p>Annualized Daily Rate ({rowData.dailyRateAndBonus})</p>
                <p>Health Insurance Value</p>
                <p>Other Benefits Value</p>
                <p>{rowData.paidDaysOff} Paid Days Off Value (Estimated)</p>
                <hr />
                <p>Standardized Annual Compensation</p>
              </dt>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 bg-slate-100 rounded-r-md">
              <dd className="text-sm leading-relaxed font-medium  text-gray-900">
                <p>{rowData.dailyRateAndBonus*255}</p>
                <p>{rowData.healthInsuranceValue}</p>
                <p>{rowData.otherBenefitsValue}</p>
                {/* <p>{rowData.paidDaysOff}</p> */}
                <p>{rowData.paidDaysOffValue}</p>
                <hr></hr>
                <p>{rowData.normalizedAnnualComp}</p>
              </dd>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0 bg-slate-100  rounded-md">
              <dt className="text-sm  leading-relaxed text-gray-900">
                <p>Patients/Day</p>
                <p>Hours/Day</p>
                <p>Comp/Patient</p>
                <p>Comp/Hour</p>
              </dt>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0 bg-slate-100 rounded-md">
              <dd className="text-sm font-medium leading-relaxed text-gray-900">
                <p>{rowData.patientsPerDay}</p>
                <p>{rowData.dailyHours}</p>
                <p>{rowData.compPerPatient}</p>
                <p>{rowData.compPerHour}</p>
              </dd>
            </div>
          </dl>
        </div>

        <div>
        </div>
      </div>

      // <div>
      //   <div className="px-5 sm:px-0 ">
      //     {rowData.dailyRateAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 pl-48">Contractor (1099)</h3>)}
      //     {rowData.annualSalaryAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 pl-48">Employed (W-2)</h3>)}
      //   </div>
      //   <div className="mt-6 pl-48">
      //     <dl className="grid grid-cols-1 sm:grid-cols-4">
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">
      //           {rowData.dailyRateAndBonus!=null && (<p>Daily Pay with Bonus</p>)}
      //           {rowData.annualSalaryAndBonus!=null && (<p>Annual Pay with Bonus</p>)}
      //         </dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
      //           {rowData.dailyRateAndBonus!=null && (<p>{rowData.dailyRateAndBonus}</p>)}
      //           {rowData.annualSalaryAndBonus!=null && (<p>{rowData.annualSalaryAndBonus}</p>)}
      //         </dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">Employer Annual Health Ins</dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.healthInsuranceValue}</dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">Employer Annual Other Benefits</dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.otherBenefitsValue}</dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">Paid Days Off</dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.paidDaysOff}</dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">
      //           {rowData.dailyHours!=null && (<p>Hours/Day</p>)}
      //           {rowData.weeklyHours!=null && (<p>Hours/Week</p>)}
      //         </dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
      //           {rowData.dailyHours!=null && (<p>{rowData.dailyHours}</p>)}
      //           {rowData.weeklyHours!=null && (<p>{rowData.weeklyHours}</p>)}
      //         </dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">
      //           {rowData.patientsPerDay!=null && (<p>Patients/Day</p>)}
      //           {rowData.patientsPerWeek!=null && (<p>Patients/Week</p>)}
      //         </dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
      //           {rowData.patientsPerDay!=null && (<p>{rowData.patientsPerDay}</p>)}
      //           {rowData.patientsPerWeek!=null && (<p>{rowData.patientsPerWeek}</p>)}
      //         </dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">Total Comp/Patient</dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.compPerPatient}</dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">Total Comp/Hour</dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{rowData.compPerHour}</dd>
      //       </div>
      //       <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0">
      //         <dt className="text-sm font-medium leading-6 text-gray-900">Comments</dt>
      //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
      //           {rowData.comments}
      //         </dd>
      //       </div>
      //     </dl>
      //   </div>
      // </div>
    );
  };


//////////Actual interface
    return (
      <>
        <Header/>
          <div className="px-4 sm:px-10 lg:px-10 xl:px-20 py-5">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Explore Optometry Compensation Packages:</h1>
                {/* <p className="mt-2 text-sm text-gray-700">
                  Explore below:
                </p> */}
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <a
                  href="/login"
                  type="button"
                  className="block rounded-md bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </a>
              </div>
            </div>

            <div className="mt-10 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                    <DataTable 
                      //what data set is being mapped
                      // value={jobs}
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
                                style={{ width: '2%' }}
                                >
                                </Column>
                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="year" 
                                header="Year" 
                                sortable style={{ width: '5%' }}
                                ></Column>

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="state" 
                                header="State" 
                                filterPlaceholder="Search"
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '13.5%' }}
                                ></Column>

                        {/* <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="city" 
                                header="City" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false}
                                filter 
                                style={{ width: '15%' }}
                                ></Column> */}

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="setting" 
                                header="Setting" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false}
                                filter
                                filterField="setting" 
                                // body={settingBodyTemplate} 
                                // filterElement={settingRowFilterTemplate} 
                                style={{ width: '15%' }}
                                ></Column>

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="practiceMode" 
                                header="Practice Mode" 
                                filterPlaceholder="Search"
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '15%' }}
                                ></Column>
  
                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="yearsOfExperience" 
                                header="YOE" 
                                sortable style={{ width: '5%' }}
                                ></Column>

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="normalizedAnnualComp" 
                                header="Standardized Annual Comp" 
                                sortable style={{ width: '20%' }}
                                body={currencyBodyTemplate}
                                ></Column>

                        {/* <RowExpansionTemplate template={rowExpansionTemplate} /> */}
                        
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
  