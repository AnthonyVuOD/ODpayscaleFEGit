'use client'

import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { FormattingRenders } from "@/components/FormattingRenders";
import { rowExpansionTemplate } from "@/components/DataExpansionTemplate";

// import { Button } from 'primereact/button';
// import { DataTableFilterMeta, header, representativeBodyTemplate, representativeRowFilterTemplate, loading, filters, body, filterElement, expandedRows, onRowExpand, onRowCollapse, rowExpansionTemplate, allowExpansion } from "primereact/datatable";
// import { Container } from "@/components/Container"

// import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme

import "primereact/resources/themes/tailwind-light/theme.css";
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';







export default function Data() {

///////Declare JobCollection and API to populate JobCollection///////
    const [jobCollection, setJobCollection] = useState([]);

    async function fetchData(){
      try {
        const response = await fetch("http://localhost:8080/api/v1/jobs/getalljobs");

        if(response.ok){
          const data = await response.json();
          const reversedData = data.slice().reverse();


          setJobCollection(reversedData);
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

// ////formatting of rendered data //////
  const { currencyBodyTemplate } = FormattingRenders();

//imported from DataExpansionTemplate
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



//////////Actual interface
    return (
      <>
        <Header/>
          <div className="px-4 sm:px-10 lg:px-10 xl:px-20 py-5">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Explore Optometry Compensation Data:</h1>
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
                      value={jobCollection}

                      //styling
                      tableStyle
                      // ={{ minWidth: '30rem' }}
                      className="px-3 py-3.5 text-left text-sm text-gray-900 min-w-full divide-y divide-gray-300"
                      showGridlines
                      stripedRows

                      //SORTING
                      removableSort

                      //PAGINATER
                      paginator={true}
                      rows={10}
                      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                      currentPageReportTemplate="{first} to {last} of {totalRecords}" 

                      // paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                      // first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange}
                      // rowsPerPageOptions={[ 10, 15, 20]}
                      // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"


                      //FILTER
                      // filters={filters}
                      filterDisplay="row"
                      emptyMessage="No data found."
                      //"menu" or "row"
                      // globalFilterFields={[]}
                      // dataKey="id"
                      // header={header} 
                      // loading="loading"
                      

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
                                header="Annualized Total Comp" 
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
  