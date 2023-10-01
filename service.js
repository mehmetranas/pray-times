
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const apiUrl =`https://api.aladhan.com/v1/calendarByCity/${year}/${month}?country=tr&city=bursa`;



export async function init() {
    if (navigator.onLine) {
        // The user is online, fetch prayer times for the next 30 days.
       await fetchPrayerTimesForNext30Days();
    } 

    return await loadCachedPrayerTimes();
}

async function loadCachedPrayerTimes() {
    try {
        const cache = await caches.open('v1')
        const response = await cache.match('prayer-times-data')
        if (response) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error loading cached data:', error)
    }
}


async function fetchPrayerTimesForNext30Days() {
    try {
            const response = await fetch(apiUrl)
            const {data} = await response.json()
            console.log('fetched 30 days from API');
            await cachePrayerTimesData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    async function cachePrayerTimesData(data) {
        const cache = await caches.open('v1')
        // await cache.delete('prayer-times-data')
        await cache.put('prayer-times-data', new Response(JSON.stringify(data)));
}