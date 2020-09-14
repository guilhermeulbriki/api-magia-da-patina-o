const formatValueToFilter = (value?: string): string => {
  if (value) {
    const formatedValue = value
      .toLowerCase()
      .replace(/\s/g, '')
      .normalize('NFD');

    return formatedValue;
  }

  return '';
};

export default formatValueToFilter;
