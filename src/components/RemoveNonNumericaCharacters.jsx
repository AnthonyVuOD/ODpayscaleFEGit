

export function removeNonNumericCharacters(value) {
    return value.replace(/[^0-9.]/g, '');
  }