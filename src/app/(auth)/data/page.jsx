import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataTableFilterMeta } from "primereact/datatable";
import { Footer } from "@/components/Footer";

const jobs = [
    { id: 10910901901, year: 2023, state: 'NY', normalizedAnnualComp: 175000, setting: "Rural", yearsOfExperience:'5'},
    { id: 10910901902, year: 2022, state: 'FL', normalizedAnnualComp: 150000, setting: "Urban", yearsOfExperience:'0'},
    { id: 10910901903, year: 2023, state: 'TX', normalizedAnnualComp: 125000, setting: "Suburban", yearsOfExperience:'6'},
    { id: 10910901904, year: 2020, state: 'CA', normalizedAnnualComp: 115000, setting: "Urban", yearsOfExperience:'10'},
    { id: 10910901901, year: 2023, state: 'ME', normalizedAnnualComp: 225000, setting: "Rural", yearsOfExperience:'11'},
    { id: 10910901902, year: 2021, state: 'TX', normalizedAnnualComp: 115000, setting: "Urban", yearsOfExperience:'13'},
    { id: 10910901903, year: 2020, state: 'WY', normalizedAnnualComp: 95000, setting: "Suburban", yearsOfExperience:'4'},
    { id: 10910901904, year: 2019, state: 'NY', normalizedAnnualComp: 120000, setting: "Urban", yearsOfExperience:'1'},
    { id: 10910901901, year: 2023, state: 'NY', normalizedAnnualComp: 175000, setting: "Rural", yearsOfExperience:'5'},
    { id: 10910901902, year: 2022, state: 'FL', normalizedAnnualComp: 150000, setting: "Urban", yearsOfExperience:'0'},
    { id: 10910901903, year: 2023, state: 'TX', normalizedAnnualComp: 125000, setting: "Suburban", yearsOfExperience:'6'},
    { id: 10910901904, year: 2020, state: 'CA', normalizedAnnualComp: 115000, setting: "Urban", yearsOfExperience:'10'},
    { id: 10910901901, year: 2023, state: 'ME', normalizedAnnualComp: 225000, setting: "Rural", yearsOfExperience:'11'},
    { id: 10910901902, year: 2021, state: 'TX', normalizedAnnualComp: 115000, setting: "Urban", yearsOfExperience:'13'},
    { id: 10910901903, year: 2020, state: 'WY', normalizedAnnualComp: 95000, setting: "Suburban", yearsOfExperience:'4'},
    { id: 10910901904, year: 2019, state: 'NY', normalizedAnnualComp: 120000, setting: "Urban", yearsOfExperience:'1'}
    // More people...
  ]
  
  // Ag- grid, Prime React
  export default function Data() {
    return (
      <>
        <Header/>
          {/* <Container> */}
          <div className="px-4 sm:px-10 lg:px-10 xl:px-40 py-5">
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
                  Add Salary
                </button>
              </div>
            </div>

            <div className="mt-10 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    
                    {/* <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Year</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">State</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Normalized Annual Compensation</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Setting</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Years of Experience</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {jobs.map((job) => (
                          <tr key={job.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{job.id}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.year}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.state}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.normalizedAnnualComp}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.setting}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.yearsOfExperience}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-cyan-500 hover:text-indigo-900">info<span className="sr-only">, {job.id}</span></a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}

                    <DataTable 
                      //what data set is being mapped
                      value={jobs}

                      //styling
                      tableStyle={{ minWidth: '30rem' }}
                      className="px-3 py-3.5 text-left text-sm text-gray-900 min-w-full divide-y divide-gray-300"
                      
                      //SORTING
                      removableSort
        
                      //PAGINATER
                      paginator showGridlines rows={10}

                      //FILTER
                      // filters={filters}
                      filterDisplay="menu"
                      globalFilterFields={['state', 'jobs.state', 'jobs.setting', 'setting']}
                      emptyMessage="No data found."
                      // dataKey="id"
                      // header={header} 
                      // filterDisplay="row"
                      
                      //EXPANSION
                      // expandedRows={expandedRows} 
                      // onRowToggle={(e) => setExpandedRows(e.data)}
                      // onRowExpand={onRowExpand} 
                      // onRowCollapse={onRowCollapse} 
                      // rowExpansionTemplate={rowExpansionTemplate}
                      >
                        
                        <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="year" header="Year" sortable style={{ width: '15%' }}></Column>
                        <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="state" header="State" filter  style={{ width: '15%' }}></Column>
                        <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="setting" header="Setting" filter  style={{ width: '20%' }}></Column>
                        <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="yearsOfExperience" header="YOE" sortable style={{ width: '15%' }}></Column>
                        <Column className="px-3 py-3.5 text-left text-sm text-gray-900" field="normalizedAnnualComp" header="Normalized Total Compensation" sortable style={{ width: '25%' }}></Column>
                        
                        
                    </DataTable>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Container> */}
        {/* <Footer/> */}
      </>
    )
  }
  