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


//formatting normalizedAnnualComp rounded to nearest dollar
const currencyBodyTemplate = (rowData) => {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    }).format(rowData.normalizedAnnualComp);

  return <span>{formattedCurrency}</span>;
};




  export default function Data() {

/// Declare JobCollection and API tp populate JobCollection
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


///// Actual interface
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
                <button
                  type="button"
                  className="block rounded-md bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
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
                      // expandedRows={expandedRows} 
                      // onRowToggle={onRowToggle}
                      >
                        

                        {/* <Column expander={allowExpansion} style={{ width: '5rem' }} /> */}
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

                        {/* <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="city" 
                                header="City" 
                                filterPlaceholder="Search" 
                                filter 
                                style={{ width: '20%' }}
                                ></Column> */}
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
  