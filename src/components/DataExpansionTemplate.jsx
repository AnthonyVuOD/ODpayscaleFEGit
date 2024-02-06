// import { PaperClipIcon } from '@heroicons/react/20/solid'
// import { Container } from "@/components/Container"
// import { Header } from "@/components/Header"
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Tag } from "primereact/tag";
// import { Toast } from "primereact/toast";
// import { Footer } from "@/components/Footer";
// import { CurrencyService } from 'primereact/api';
// import { useState, useEffect, useRef } from "react";
// import { Button } from 'primereact/button';
import { FormattingRenders } from '@/components/FormattingRenders';

  export const rowExpansionTemplate = (rowData) => {

  ///Formatting Rendered Data    
    const {currencyBodyTemplate } = FormattingRenders();
    const {healthInsuranceFormatted} = FormattingRenders();
    const {otherBenefitsFormatted} = FormattingRenders();
    const {paidDaysOffValueFormatted} = FormattingRenders();
    const {compPerPatientFormatted} = FormattingRenders();
    const {compPerHourFormatted} = FormattingRenders();
    const {annualSalaryAndBonusFormatted} = FormattingRenders()
    const {dailyRateAndBonusFormatted} = FormattingRenders()
    const {annualizedDailyRateAndBonusFormatted} = FormattingRenders()
    const {paidDaysOffFormatted} = FormattingRenders();
    const {patientsPerDayFormatted} = FormattingRenders();
    const {patientsPerWeekFormatted} = FormattingRenders();
    const {dailyHoursFormatted} = FormattingRenders();
    const {weeklyHoursFormatted} = FormattingRenders();

  // ///////////// Row Expansion//////////////////
  // const [expandedRows, setExpandedRows] = useState(null);

  /// allows row expansion
  // const allowExpansion = (rowData) => {
  //   if (rowData.id!=null){
  //     return true;
  //   } return false;
  // };

  // const onRowExpand = (event) => {
  // };

  // const onRowCollapse = (event) => {
  // };
    

    //template for row expansion
    return (
      <div>
        <div className="px-5 sm:px-0 ml-14">
          <dl className="grid grid-cols-2 sm:grid-cols-10">
            <div className="border-t border-gray-100 px-2 py-4 sm:col-span-2 sm:px-0 bg-slate-100 rounded-l-md">
               <dd className="mt-1 text-sm leading-6 pl-9 sm:pl-7 pb-2 text-gray-700 sm:mt-2">
                {rowData.dailyRateAndBonus!=null && (<h3 className=" font-semibold leading-1 text-gray-900 inline-block">Contractor (1099)</h3>)}
                {rowData.annualSalaryAndBonus!=null && (<h3 className=" font-semibold leading-1 text-gray-900 inline-block">Employed (W-2)</h3>)}
               </dd>
            </div>
            <div className="border-t border-gray-100 px-2 py-4 sm:col-span-3 sm:px-0 bg-slate-100 rounded-r-md mr-1">
               <dd className="mt-1 text-sm leading-6 text-right text-gray-700 sm:mt-2">
               {rowData.city !== "" ? (
                  <h3 className="font-medium leading-1 text-gray-900 pr-9 sm:pr-7 inline-block">
                    {rowData.city}, {rowData.state}
                  </h3>
                ) : (
                  <h3 className="font-medium leading-1 text-gray-900 pr-9 sm:pr-7 inline-block">
                    No city specified, {rowData.state}
                  </h3>
                )}
               </dd>
            </div>
          </dl>
        </div>

        <div className="px-5 sm:px-0 mt-2 ml-14">
          <dl className="grid grid-cols-2 sm:grid-cols-12 ">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0 bg-slate-100 rounded-l-md">
              <dt className="text-sm  leading-relaxed pl-7 text-gray-900">
                {rowData.dailyRateAndBonus!=null && (<p>Annualized Daily Pay ({dailyRateAndBonusFormatted(rowData)})</p>)}
                {rowData.annualSalaryAndBonus!=null && (<p>Annual Salary and Bonus</p>)}
                <p>Health Insurance Value</p>
                <p>Other Benefits Value</p>
                <p>{paidDaysOffFormatted(rowData)} Days PTO Estimated Value</p>
                <hr style={{ borderTop: '1px solid gray', margin: '2px 0'  }}/>
                <p>Annualized Total Compensation</p>
              </dt>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0 bg-slate-100 rounded-r-md mr-1">
              <dd className="text-sm leading-relaxed font-medium text-right pr-7 text-gray-900">
                {rowData.dailyRateAndBonus!=null && (<p>{annualizedDailyRateAndBonusFormatted(rowData)}</p>)}
                {rowData.annualSalaryAndBonus!=null && (<p>{annualSalaryAndBonusFormatted(rowData)}</p>)}
                <p>{healthInsuranceFormatted(rowData)}</p>
                <p>{otherBenefitsFormatted(rowData)}</p>
                <p>{paidDaysOffValueFormatted(rowData)}</p>
                <hr style={{ borderTop: '1px solid gray', margin: '2px 0'  }}/>
                <p>{currencyBodyTemplate(rowData)}</p>
              </dd>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 mt-2 sm:mt-0 sm:px-0 bg-slate-100 sm:ml-1 rounded-l-md">
              <dt className="text-sm pl-7 leading-relaxed text-gray-900">
                {rowData.patientsPerDay!=null && (<p>Patients/Day</p>)}
                {rowData.patientsPerWeek!=null && (<p>Patients/Week</p>)}
                {rowData.dailyHours!=null && (<p>Hours/Day</p>)}
                {rowData.weeklyHours!=null && (<p>Hours/Week</p>)}
                <p>Total Comp/Patient</p>
                <p>Total Comp/Hour</p>
              </dt>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 mt-2 sm:mt-0 sm:px-0 mr-1 bg-slate-100 rounded-r-md">
              <dd className="text-sm font-medium pr-7 text-right leading-relaxed text-gray-900">
                {rowData.patientsPerDay!=null && (<p>{patientsPerDayFormatted(rowData)}</p>)}
                {rowData.patientsPerWeek!=null && (<p>{patientsPerWeekFormatted(rowData)}</p>)}
                {rowData.dailyHours!=null && (<p>{dailyHoursFormatted(rowData)}</p>)}
                {rowData.weeklyHours!=null && (<p>{weeklyHoursFormatted(rowData)}</p>)}
                <p>{compPerPatientFormatted(rowData)}</p>
                <p>{compPerHourFormatted(rowData)}</p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="px-5 sm:px-0 ml-14">
          <dl className="grid grid-cols-1 sm:grid-cols-12">
            <div className="border-t border-gray-100 px-2 py-4 sm:col-span-11 sm:px-0 mr-1 bg-slate-100 rounded-md mt-2">
               <dd className="mt-1 text-sm leading-6 sm:pl-7 pr-7 pb-3 pl-9 text-gray-700 sm:mt-2">
                <h3 className=" font-semibold leading-6 text-gray-900 inline-block">Comments:</h3>
                {rowData.comments !== "" ? (
                  <h3 className=" leading-6 text-gray-900 pr-1 ">
                    {rowData.comments}
                  </h3>
                ) : (
                  <h3 className=" leading-6 text-gray-900 pr-1 ">
                    No comment given.
                  </h3>
                )}
               </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };