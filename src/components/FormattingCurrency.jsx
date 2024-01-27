import react from "@heroicons/react";

export const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, '');

    // Use Intl.NumberFormat to format as currency
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change this based on your currency
      maximumFractionDigits: 0,
    }).format(numericValue);

    return formattedValue;
  };