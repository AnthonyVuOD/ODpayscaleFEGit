'use client'

import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Footer } from "@/components/Footer";
import { CurrencyService } from 'primereact/api';
import { useState, useEffect } from "react";
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
    const actionTemplate = (rowData) => {
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
      return rowData.id!=null;
    };

    const onRowExpand = (event) => {
      // toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.jobCollection.id, life: 3000 });
      alert("Row expand!");
    };

    const onRowCollapse = (event) => {
      // toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.jobCollection.id, life: 3000 });
      // setExpandedRows(null);
      alert("Row collapse!");
    };

    


    /////Template for row expansion
    const rowExpansionTemplate = (jobCollection) => {
      return (
          <div className="p-3">
              <DataTable value={jobCollection.id}>
                  <Column field="state" header="State" sortable></Column>
                  <Column field="city" header="City" sortable></Column>
                  <Column field="state" header="State" body={state} ></Column>
                  <Column field="city" header="City" body={city} ></Column>
              </DataTable>
          </div>
      );
    };




///// Actual interface
    return (

      <>
        <Header/>
          <div className="px-4 sm:px-10 lg:px-10 xl:px-40 py-5">
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
                      onRowToggle={(e) => setExpandedRows(e.jobCollection)}
                      onRowExpand={onRowExpand} 
                      onRowCollapse={onRowCollapse} 
                      rowExpansionTemplate={rowExpansionTemplate}
                      >
                        

                        <Column 
                                expander={allowExpansion}
                                style={{ width: '5%' }}
                                >Expand</Column>
                                
                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="year" 
                                header="Year" 
                                sortable style={{ width: '15%' }}
                                ></Column>

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="state" 
                                header="State" 
                                filterPlaceholder="Search"
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '15%' }}
                                ></Column>
                        {/* <Column 
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
                                ></Column> */}

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="city" 
                                header="City" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '15%' }}
                                ></Column>
                        {/* <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="practiceMode" 
                                header="Practice Mode" 
                                filterPlaceholder="Search"
                                showFilterMenu={false} 
                                filter 
                                style={{ width: '15%' }}
                                ></Column> */}
  
                        {/* <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="yearsOfExperience" 
                                header="YOE" 
                                sortable style={{ width: '5%' }}
                                ></Column> */}

                        <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="normalizedAnnualComp" 
                                header="Standardized Annual Comp" 
                                body={currencyBodyTemplate}
                                sortable 
                                style={{ width: '20%' }}
                                ></Column>

                        <Column 
                                body={actionTemplate} 
                                // header="Action"
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
  