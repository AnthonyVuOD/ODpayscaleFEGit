
// import { useClient, useState, useEffect } from "react";

//   const [jobCollection, setjobCollection] = useState([]);

//   useEffect(()=>{
//     useClient();
//     async function fetchData(){
//       try {
//         const response = await fetch("http://localhost:8080/api/v1/jobs/getalljobs");

//         if(response.ok){
//           const data = await response.json();

//           setjobCollection(data);
//         } else {
//           console.log("Error fetching data:", response.status, response.statusText);
//         }
//       } catch (error) {
//         console.log("Error fetching data: ", error.message);
//       }
//     };
//   }, []);

// export function Table(){
//     return (
//         <>
//         <Header/>
//           <div className="px-4 sm:px-10 lg:px-10 xl:px-40 py-5">
//             <div className="sm:flex sm:items-center">
//               <div className="sm:flex-auto">
//                 <h1 className="text-base font-semibold leading-6 text-gray-900">Explore Optometry Compensation Packages:</h1>
//                 {/* <p className="mt-2 text-sm text-gray-700">
//                   Explore below:
//                 </p> */}
//               </div>
//               <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//                 <button
//                   type="button"
//                   className="block rounded-md bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Add Salary
//                 </button>
//               </div>
//             </div>

//             <div className="mt-10 flow-root">
//               <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                   <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

//                     <DataTable 
//                       //what data set is being mapped
//                       value={jobs}

//                       //styling
//                       tableStyle={{ minWidth: '30rem' }}
//                       className="px-3 py-3.5 text-left text-sm text-gray-900 min-w-full divide-y divide-gray-300"
                      
//                       //SORTING
//                       removableSort
        
//                       //PAGINATER
//                       paginator showGridlines rows={10}

//                       //FILTER
//                       // filters={filters}
//                       filterDisplay="menu"
//                       globalFilterFields={['state', 'jobs.state', 'jobs.setting', 'setting']}
//                       emptyMessage="No data found."
//                       // dataKey="id"
//                       // header={header} 
//                       // filterDisplay="row"
                      
//                       //EXPANSION
//                       // expandedRows={expandedRows} 
//                       // onRowToggle={(e) => setExpandedRows(e.data)}
//                       // onRowExpand={onRowExpand} 
//                       // onRowCollapse={onRowCollapse} 
//                       // rowExpansionTemplate={rowExpansionTemplate}
//                       >
                        
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="year" header="Year" sortable style={{ width: '10%' }}></Column>
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="state" header="State"  style={{ width: '8%' }}></Column>
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="city" header="City" style={{ width: '15%' }}></Column>
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="practiceMode" header="Practice Mode" style={{ width: '15%' }}></Column>
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="setting" header="Setting" style={{ width: '10%' }}></Column>
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="yearsOfExperience" header="YOE" sortable style={{ width: '10%' }}></Column>
//                         <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="normalizedAnnualComp" header="Standardized Annual Comp" sortable style={{ width: '20%' }}></Column>
                        
                        
//                     </DataTable>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         {/* <Footer/> */}
//         </>


//     )
// }