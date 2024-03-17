'use client'

import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { FormattingRenders } from "@/components/FormattingRenders";
import { rowExpansionTemplate } from "@/components/DataExpansionTemplate";
import Link from "next/link";
import { SupabaseCreateClient } from "@/components/SupabaseCreateClient";
import { CustomFilterDataTable, settings, practiceModes } from "@/components/CustomFilterDataTable";
import { Dropdown } from "primereact/dropdown";

// import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme

import "primereact/resources/themes/tailwind-light/theme.css";
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';







export default function Data() {

/////States array for dropdown filter  
  const [states] = useState([
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
    'Nunavut',
    'Northwest Territories',
    'Other'
  ]);
/////Settings array for dropdown filter 
  const [settings] =useState([
      'Urban',
      'Suburban',
      'Rural',
      'Remote'
  ]);
/////Practice Mode array for dropdown filter 
  const [practiceModes] = useState([
    'Private Practice',
    'Retail/ Corporate',
    'MD/ OD',
    'Veterans Affairs',
    'Hospital Based',
    'Remote',
    'Other'
  ]);
///States Dropdown filter
  const statesRowFilterTemplate = (options) => {
    return (
        <Dropdown 
            value={options.value} 
            options={states} 
            onChange={(e) => options.filterApplyCallback(e.value)} 
            //
            itemTemplate={statesItemTemplate} 
            placeholder="Select" 
            className="p-column-filter" 
            showClear
            style={{ minWidth: '8rem' }} 
        />
    );
  }
/////Settings dropdown filter
  const settingsRowFilterTemplate = (options) => {
    return (
        <Dropdown 
            value={options.value} 
            options={settings} 
            onChange={(e) => options.filterApplyCallback(e.value)} 
            //
            itemTemplate={settingsItemTemplate} 
            placeholder="Select" 
            className="p-column-filter" 
            showClear
            style={{ minWidth: '8rem' }} 
        />
    );
  }
// Practice Mode dropdown filter
  const practiceModesRowFilterTemplate = (options) => {
    return (
        <Dropdown 
            value={options.value} 
            options={practiceModes} 
            onChange={(e) => options.filterApplyCallback(e.value)} 
            itemTemplate={practiceModesItemTemplate} 
            placeholder="Select" 
            className="p-column-filter" 
            showClear 
            style={{ minWidth: '3rem' }} />
    );
  }
/// imported templates for dropdown filter features
  const {statesItemTemplate}= CustomFilterDataTable();
  const {statesBodyTemplate} = CustomFilterDataTable();
  const {settingsBodyTemplate}= CustomFilterDataTable();
  const {settingsItemTemplate}= CustomFilterDataTable();
  const {practiceModesBodyTemplate}= CustomFilterDataTable();
  const {practiceModesItemTemplate}= CustomFilterDataTable();



















  /////// instantiate Create client
  const supabase = SupabaseCreateClient();

  ////////initialize userId///////
  const [userId, setUserId] = useState(null);

  //////set userId//////
  useEffect(()=>{
    function getUserData(){
      supabase.auth.getUser().then((value)=>{
        if(value.data?.user){
          setUserId(value.data.user.id);
          console.log(userId); 
        }
      })
    }
    getUserData(); 
  },[])

///////Declare JobCollection and API call to populate JobCollection///////
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

//////formatting of rendered currency data //////
  const { currencyBodyTemplate } = FormattingRenders();




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














//////////User interface
    return (
      <>
        <Header/>
          <div className="px-4 md:px-10 lg:px-10 xl:px-20 py-5">
          {/* <div className="px-4 sm:px-10 lg:px-10 xl:px-20 py-5"> */}
            <div className="md:flex md:items-center">
            {/* <div className="sm:flex sm:items-center"> */}
              <div className="md:flex-auto">
              {/* <div className="sm:flex-auto"> */}
                <h1 className="text-base font-semibold leading-6 text-gray-900">Explore Optometry Compensation Data:</h1>
              </div>
              <div className="mt-4 md:ml-16 md:mt-0 md:flex-none">
              {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"> */}
                <Link
                  href="/account"
                  type="button"
                  className="block rounded-md bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {userId ? "Account" : "Sign in"}
                </Link>
              </div>
            </div>

            <div className="mt-10 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto lg:-mx-6 xl:-mx-8">
              {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-0 py-2 align-middle lg:px-6 xl:px-8">
                {/* <div className="inline-block min-w-0 py-2 align-middle sm:px-6 lg:px-8"> */}
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 lg:rounded-lg">
                  {/* <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"> */}

                    <DataTable 
                      //what data set is being mapped
                      value={jobCollection}

                      //styling
                      tableStyle
                      className="px-3 py-3.5 text-left text-sm text-gray-900 min-w-0 divide-y divide-gray-300"
                      showGridlines
                      stripedRows
                      // responsive={true}
                      // ={{ minWidth: '30rem' }}

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
                      filterDisplay="row"
                      emptyMessage="No data found."
                      //"menu" or "row"
                      // globalFilterFields={[]}
                      // dataKey="id"
                      // header={header} 
                      // loading="loading"
                      // filters={filters}
                      

                      //EXPANSION
                      expandedRows={expandedRows} 
                      onRowToggle={(e) => setExpandedRows(e.data)}
                      onRowExpand={onRowExpand} 
                      onRowCollapse={onRowCollapse} 
                      rowExpansionTemplate={rowExpansionTemplate}
                      >
                        <Column 
                                expander={allowExpansion}
                                style={{ minWidth: '2rem', width: '6rem' }}
                                // responsivePriority="2"
                                />

                        <Column 
                                field="year" 
                                header="Year" 
                                sortable 
                                style={{ minWidth: '3rem', width: '10rem' }}
                                // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                // style={{ width: '2%' }}
                                />

                        <Column 
                              field="state" 
                              header="State" 
                              showFilterMenu={false}
                              filterMenuStyle={{ width: '6rem' }} 
                              style={{ minWidth: '6rem', width: '15rem'  }} 
                              body = {statesBodyTemplate} 

                              setting
                              filter
                              filterElement = {statesRowFilterTemplate}
                                // field="state" 
                                // header="State" 
                                // filterPlaceholder="Search"
                                // showFilterMenu={false} 
                                // filter 
                                // style={{ minWidth: '10rem' }}


                                // responsivePriority="2"
                                // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                // style={{ width: '15%' }}
                                />
                        <Column 
                                field="setting" 
                                header="Setting" 
                                showFilterMenu={false}
                                filterMenuStyle={{ width: '6rem' }} 
                                style={{ minWidth: '6rem', width: '15rem' }} 
                                body = {settingsBodyTemplate} 

                                setting
                                filter
                                filterElement = {settingsRowFilterTemplate}
                                // filterElement = {settingsRowFilterTemplate(settings)}


                                // filterMenuStyle={{ width: '10%' }} 
                                // style={{ width: '10%' }} 
                                // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                // field="setting" 
                                // header="Setting" 
                                // filterPlaceholder="Search" 
                                // showFilterMenu={false}
                                // filter
                                // filterField="setting" 
                                // style={{ width: '15%' }}

                                
                                // body={settingBodyTemplate} 
                                // filterElement={settingRowFilterTemplate} 
                                // responsivePriority="4"
                                />

                        <Column 
                                field="practiceMode" 
                                header="Practice Mode" 
                                showFilterMenu={false}
                                filterMenuStyle={{ width: '6rem' }} 
                                style={{ minWidth: '6rem', width: '15rem' }} 
                                body = {practiceModesBodyTemplate} 

                                setting
                                filter
                                filterElement = {practiceModesRowFilterTemplate}
                                // filterElement = {practiceModesRowFilterTemplate(practiceModes)}


                                // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                // filterMenuStyle={{ width: '10%' }} 
                                // style={{ width: '10%' }} 
                                // field="practiceMode" 
                                // header="Practice Mode" 
                                // filterPlaceholder="Search"
                                // showFilterMenu={false} 
                                // filter 
                                // style={{ width: '15%' }}
                                />
  
                        {/* <Column 
                                field="yearsOfExperience" 
                                header="YOE" 
                                sortable 
                                style={{ minWidth: '3rem' }}
                                // style={{ width: '3%' }}
                                // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                // responsivePriority="4"
                                /> */}

                        <Column 
                                field="normalizedAnnualComp" 
                                header="Annualized Total Comp" 
                                sortable 
                                style={{ minWidth: '8rem', width: '20rem' }}
                                body={currencyBodyTemplate}
                                // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                // style={{ width: '15%' }}
                                // responsivePriority="2"
                                />

                        {/* <Column 
                        // className="px-3 py-3.5 text-left text-sm text-gray-900" 
                                field="city" 
                                header="City" 
                                filterPlaceholder="Search" 
                                showFilterMenu={false}
                                filter 
                                style={{ width: '15%' }}
                                ></Column> */}

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
  