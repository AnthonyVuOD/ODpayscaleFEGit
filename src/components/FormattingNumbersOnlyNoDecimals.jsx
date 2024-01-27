import react from "@heroicons/react";

export const formatNumbersOnlyNoDecimals = (value) => {
    // Remove non-numeric characters
    const numericOnlyNoDecimalsValue = value.replace(/[^0-9]/g, '');

    return numericOnlyNoDecimalsValue;
  };