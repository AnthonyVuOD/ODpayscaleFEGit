import react from "@heroicons/react";

export function Formatting(){
    ////formatting normalizedAnnualComp rounded to nearest dollar//////
    const currencyBodyTemplate = (rowData) => {
    const formattedCurrencyNormalizedAnnualComp = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      }).format(rowData.normalizedAnnualComp);  
  
    return <span>{formattedCurrencyNormalizedAnnualComp}</span>; 

    };

    /// formatting Health Insurance Value
    const healthInsuranceFormatted = (rowData) => {
        const formattedCurrencyHealthInsuranceValue = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          }).format(rowData.healthInsuranceValue);  
      
        return <span>{formattedCurrencyHealthInsuranceValue}</span>; 
    
        };
    
    const otherBenefitsFormatted = (rowData) => {
        const formattedOtherBenefitsValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.otherBenefitsValue);  
        
        return <span>{formattedOtherBenefitsValue}</span>; 
    
        };

    const paidDaysOffFormatted = (rowData) => {
        const formattedPaidDaysOffValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.paidDaysOffValue);  
        
        return <span>{formattedPaidDaysOffValue}</span>; 
    
        };

    const compPerHourFormatted = (rowData) => {
        const compPerHour = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            }).format(rowData.compPerHour);  
        
        return <span>{compPerHour}</span>; 
    
        };
    const compPerPatientFormatted = (rowData) => {
        const compPerPatient = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            }).format(rowData.compPerPatient);  
        
        return <span>{compPerPatient}</span>; 
    
        };

    const annualSalaryAndBonusFormatted = (rowData) => {
        const annualSalaryAndBonus = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.annualSalaryAndBonus);  
        
        return <span>{annualSalaryAndBonus}</span>; 
    
        };

    const dailyRateAndBonusFormatted = (rowData) => {
        const dailyRateAndBonus = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.dailyRateAndBonus);  
        
        return <span>{dailyRateAndBonus}</span>; 
    
        };

    const annualizedDailyRateAndBonusFormatted = (rowData) => {
        const annualizedDailyRateAndBonus = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.annualizedDailyRateAndBonus);  
        
        return <span>{annualizedDailyRateAndBonus}</span>; 
    
        };


  return {
    currencyBodyTemplate,
    healthInsuranceFormatted,
    otherBenefitsFormatted,
    paidDaysOffFormatted,
    compPerPatientFormatted,
    compPerHourFormatted,
    annualSalaryAndBonusFormatted ,
    dailyRateAndBonusFormatted,
    annualizedDailyRateAndBonusFormatted
  };
}