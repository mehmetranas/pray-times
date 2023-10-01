// Function to format a date as "dd-mm-yyyy"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);
  
  // Check if the current date is equal to the specific date
export function isCurrentDate(date) {
    return formattedCurrentDate === date
}

export function removeTimeZone(inputString) {
    return inputString.replace(/\s?\(\+03\)/g, '')
}
  