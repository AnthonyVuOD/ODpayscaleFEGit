// import react from "@heroicons/react";

export function FormattingRenders(){

    ////formatting normalizedAnnualComp rounded to nearest dollar//////
    const currencyBodyTemplate = (rowData) => {
        const formattedCurrencyNormalizedAnnualComp = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.normalizedAnnualComp);  
  
        return <span>{formattedCurrencyNormalizedAnnualComp}</span>; 
    };

    /// formatting Health Insurance Value rounded to nearest dollar
    const healthInsuranceFormatted = (rowData) => {
        const formattedCurrencyHealthInsuranceValue = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          }).format(rowData.healthInsuranceValue);  
      
        return <span>{formattedCurrencyHealthInsuranceValue}</span>; 
    };

     /// formatting Retirement benefits Value rounded to nearest dollar
     const retirementBenefitsFormatted = (rowData) => {
        const formattedCurrencyRetirementBenefitsValue = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          }).format(rowData.retirementBenefitsValue);  
      
        return <span>{formattedCurrencyRetirementBenefitsValue}</span>; 
    };
    
    /// formatting Other benefits Value rounded to nearest dollar
    const otherBenefitsFormatted = (rowData) => {
        const formattedOtherBenefitsValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.otherBenefitsValue);  
        
        return <span>{formattedOtherBenefitsValue}</span>; 
    };

    /// formatting PTO Value rounded to nearest dollar
    const paidDaysOffValueFormatted = (rowData) => {
        const formattedPaidDaysOffValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.paidDaysOffValue);  
        
        return <span>{formattedPaidDaysOffValue}</span>; 
    };

    /// formatting comp/hour rounded to nearest cent
    const compPerHourFormatted = (rowData) => {
        const compPerHour = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            }).format(rowData.compPerHour);  
        
        return <span>{compPerHour}</span>; 
    };

    /// formatting comp/patient rounded to nearest cent
    const compPerPatientFormatted = (rowData) => {
        const compPerPatient = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            }).format(rowData.compPerPatient);  
        
        return <span>{compPerPatient}</span>; 
    };
    
    /// formatting annual Salary and bonus rounded to nearest dollar
    const annualSalaryAndBonusFormatted = (rowData) => {
        const annualSalaryAndBonus = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.annualSalaryAndBonus);  
        
        return <span>{annualSalaryAndBonus}</span>; 
    };

    /// formatting daily rate and bonus rounded to nearest dollar
    const dailyRateAndBonusFormatted = (rowData) => {
        const dailyRateAndBonus = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.dailyRateAndBonus);  
        
        return <span>{dailyRateAndBonus}</span>; 
    };
    
    /// formatting annualized salary/rate and bonus rounded to nearest dollar
    const annualizedDailyRateAndBonusFormatted = (rowData) => {
        const annualizedDailyRateAndBonus = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            }).format(rowData.annualizedDailyRateAndBonus);  
        
        return <span>{annualizedDailyRateAndBonus}</span>; 
    };
    
    const paidDaysOffFormatted = (rowData) => {
        const paidDaysOff = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            }).format(rowData.paidDaysOff);
        
        return <span>{paidDaysOff}</span>;
    };

    const patientsPerDayFormatted = (rowData) => {
        const patientsPerDay = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            }).format(rowData.patientsPerDay);
        
        return <span>{patientsPerDay}</span>;
    };

    const patientsPerWeekFormatted = (rowData) => {
        const patientsPerWeek = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            }).format(rowData.patientsPerWeek);
        
        return <span>{patientsPerWeek}</span>;
    };

    const patientsPerHourFormatted = (rowData) => {
        const patientsPerHour = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            }).format(rowData.patientsPerHour);
        
        return <span>{patientsPerHour}</span>;
    };

    const dailyHoursFormatted = (rowData) => {
        const dailyHours = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            }).format(rowData.dailyHours);
        
        return <span>{dailyHours}</span>;
    };
    
    const weeklyHoursFormatted = (rowData) => {
        const weeklyHours = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            }).format(rowData.weeklyHours);
        
        return <span>{weeklyHours}</span>;
    };
        
    return {
        currencyBodyTemplate,
        healthInsuranceFormatted,
        retirementBenefitsFormatted,
        otherBenefitsFormatted,
        paidDaysOffValueFormatted,
        compPerPatientFormatted,
        compPerHourFormatted,
        annualSalaryAndBonusFormatted ,
        dailyRateAndBonusFormatted,
        annualizedDailyRateAndBonusFormatted,
        paidDaysOffFormatted,
        patientsPerDayFormatted,
        patientsPerWeekFormatted,
        patientsPerHourFormatted,
        dailyHoursFormatted,
        weeklyHoursFormatted
    };
}