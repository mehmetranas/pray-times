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

export function currentDateText() {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    return new Date().toLocaleDateString('tr', options)
}

// Function to find the current time interval

export function remind(prayerTimes) {
    const currentTime = new Date().toLocaleTimeString('tr-TR', {hour12: false, hour: '2-digit', minute: '2-digit'});
    const currentTimeDate = new Date(`01/01/2000 ${currentTime}`);
    let times
    let prayerSection = ''
    for (let i = 0; i < prayerTimes.length - 1; i++) {
        const startTime = new Date(`01/01/2000 ${prayerTimes[i][1]}`);
        const endTime = new Date(`01/01/2000 ${prayerTimes[i + 1][1]}`);


        if (currentTimeDate >= startTime && currentTimeDate < endTime) {
            times = [currentTimeDate, endTime]
            prayerSection = prayerTimes[i][0]
        }
    }

    // Check if the current time is between the last and first items
    const startTime = new Date(`01/01/2000 ${prayerTimes[prayerTimes.length - 1][1]}`);
    const endTime = new Date(`01/02/2000 ${prayerTimes[0][1]}`);

    if (currentTimeDate >= startTime && currentTimeDate < endTime) {
        times = [currentTimeDate, endTime]
        prayerSection = prayerTimes[prayerTimes.length - 1][0]
    }

    if (times) {
        return {...getDateRangeInMinutes(times), prayerSection}
    }

    return {}
}

function getDateRangeInMinutes(times) {
    const [startDate, endDate] = times
    const timeDifference = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {hours: hours, minutes: minutes};
}
