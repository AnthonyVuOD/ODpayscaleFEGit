import react from "@heroicons/react";

export const formatNumbersOnly = (value) => {
    // Remove non-numeric characters
    const numericOnlyValue = value.replace(/[^0-9.]/g, '');

    // const roundedValue = parseFloat(numericOnlyValue).toFixed(2);

    // return roundedValue;

    return numericOnlyValue;
  };