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
