"use account"

import { Header } from "./Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Footer } from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { FormattingRenders } from '@/components/FormattingRenders';
import { rowExpansionTemplate } from '@/components/DataExpansionTemplate';
import { useRouter } from "next/navigation";

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { AuthLayout } from '@/components/AuthLayout'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link';

import "primereact/resources/themes/tailwind-light/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function AccountSkeleton(){
    return(
        <>
            <Header/>
            <div className="px-4 sm:px-10 lg:px-10 xl:px-20 py-5">
                <div className="sm:flex sm:items-left flex-col">
                    {/* <div className="sm:flex-auto text-left">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Your Account:</h1>
                    </div>
                    <div className="mt-4 sm:ml-0 sm:mt-0 sm:flex-none">
                        <Link
                        // onClick={navigateToPage('/deleteaccount')}
                        href="/deleteaccount"
                        className="mt-2 inline-block rounded-md bg-red-400 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                        >
                        Delete Account
                        </Link>
                        <Link
                        // onClick={navigateToPage('/odformupdate')}
                        href="/odformupdate"
                        className="mt-2 inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Update Account
                        </Link>
                        <button
                        // href="/data"
                        onClick={()=>signOutUser()}
                        className="mt-2 inline-block rounded-md bg-cyan-500 mx-1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Logout
                        </button>
                    </div> */}
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {/* <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"> */}
                                
                                {/* <DataTable 
                                    //what data set is being mapped
                                    // value={jobCollection}

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
                                    // expandedRows={expandedRows} 
                                    // onRowToggle={(e) => setExpandedRows(e.data)}
                                    // onRowExpand={onRowExpand} 
                                    // onRowCollapse={onRowCollapse} 
                                    // rowExpansionTemplate={rowExpansionTemplate}
                                    >
                                        

                                        <Column 
                                                // expander={allowExpansion}
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
                                                // body={currencyBodyTemplate}
                                                sortable 
                                                style={{ width: '10%' }}
                                                ></Column>

                                        <Column 
                                                // header={addSalaryTemplate} 
                                                // body={deleteTemplate}
                                                style={{ width: '13%' }}
                                                ></Column>  
                                </DataTable> */}

                            {/* </div> */}
                        </div>
                    </div>
                </div> 

            </div>
            {/* <Footer/> */}
        </>
    )
}