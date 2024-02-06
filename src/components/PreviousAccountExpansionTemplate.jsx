/////////////////Template for row expansion//// OLD TEMPLATE!!!!////////////
//     const rowExpansionTemplate = (rowData) => {
//       return (
//         <div>
//           <div className="px-5 sm:px-0 ">
//             {rowData.dailyRateAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 pl-20">Contractor (1099)</h3>)}
//             {rowData.annualSalaryAndBonus!=null && (<h3 className=" font-semibold leading-7 text-gray-900 pl-20">Employed (W-2)</h3>)}
//           </div>
//           <div className="mt-6 pl-20">
//             <dl className="grid grid-cols-1 sm:grid-cols-4">
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   {rowData.dailyRateAndBonus!=null && (<p>Daily Pay with Bonus</p>)}
//                   {rowData.annualSalaryAndBonus!=null && (<p>Annual Pay with Bonus</p>)}
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
//                   {rowData.dailyRateAndBonus!=null && (<p>{dailyRateAndBonusFormatted(rowData)}</p>)}
//                   {rowData.annualSalaryAndBonus!=null && (<p>{annualSalaryAndBonusFormatted(rowData)}</p>)}
//                 </dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">Employer Annual Health Ins</dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{healthInsuranceFormatted(rowData)}</dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">Employer Annual Other Benefits</dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{otherBenefitsFormatted(rowData)}</dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">Paid Days Off</dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{paidDaysOffFormatted(rowData)}</dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   {rowData.dailyHours!=null && (<p>Hours/Day</p>)}
//                   {rowData.weeklyHours!=null && (<p>Hours/Week</p>)}
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
//                   {rowData.dailyHours!=null && (<p>{dailyHoursFormatted(rowData)}</p>)}
//                   {rowData.weeklyHours!=null && (<p>{weeklyHoursFormatted(rowData)}</p>)}
//                 </dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   {rowData.patientsPerDay!=null && (<p>Patients/Day</p>)}
//                   {rowData.patientsPerWeek!=null && (<p>Patients/Week</p>)}
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
//                   {rowData.patientsPerDay!=null && (<p>{patientsPerDayFormatted(rowData)}</p>)}
//                   {rowData.patientsPerWeek!=null && (<p>{patientsPerWeekFormatted(rowData)}</p>)}
//                 </dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">Total Comp/Patient</dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{compPerPatientFormatted(rowData)}</dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">Total Comp/Hour</dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{compPerHourFormatted(rowData)}</dd>
//               </div>
//               <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">Comments</dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
//                   {rowData.comments}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       );
//     };

