export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const formatId = (id: string) => {
  const firstLetterIndex = id.search(/[A-Za-z]/);
  if (firstLetterIndex === -1) {
    throw new Error("No letter found in the string");
  }
  const numberPart = id.substring(0, firstLetterIndex);
  const firstLetter = id.charAt(firstLetterIndex);
  const number = parseInt(numberPart, 10);
  return firstLetter === "A" ? number : -number;
};

export const formatPercentage = (value: number | undefined, decimalPrecision: number = 1) => {
  if (value === undefined) return '';
  
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    minimumFractionDigits: decimalPrecision,
    maximumFractionDigits: decimalPrecision,
  }).format(value);
};

export const formatNumber = (
  value: number | undefined,
  useGrouping: boolean = true,
  decimalPrecision: number = 0
) => {
  if (value === undefined) return '';
  
  return new Intl.NumberFormat(undefined, {
    useGrouping: useGrouping,
    minimumFractionDigits: decimalPrecision,
    maximumFractionDigits: decimalPrecision,
  }).format(value);
};