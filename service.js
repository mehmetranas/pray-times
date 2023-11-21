import  './reload.js'
import { currentDateText } from './utils.js';

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1

function setDateTitle(params) {
    const dateTextEl = document.querySelector('#date-text')
    dateTextEl.textContent = currentDateText()
}

function setLocation() {
    const locationEl = document.querySelector('#location')
    const locationInStorage = localStorage.getItem('location')
    if(locationInStorage) {
        locationEl.textContent = locationInStorage
    } else {
        locationEl.textContent = 'Bursa'
    }

}

export async function init() {
    setDateTitle()
    setLocation()
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
        const data = await response.json()
        return data[month]
    } catch (error) {
        console.error('Error loading cached data:', error)
    }
}


async function fetchPrayerTimesForNext30Days() {
    const locationEl = document.querySelector('#location')
    const location = locationEl.textContent
    const apiUrl =`https://api.aladhan.com/v1/calendarByCity/${year}?country=tr&city=${location}`;
    const cache = await caches.open('v1')
    const storageYearResponse = await cache.match('prayer-times-period')
    const storageYear = await storageYearResponse?.json?.()
    const storageLocationResponse = await cache.match('prayer-times-location')
    const storageLocation = await storageLocationResponse?.text?.()
    if(year == storageYear && locationEl.textContent === storageLocation) {
        return
    }

    try {
            const response = await fetch(apiUrl)
            const {data} = await response.json()
            await cachePrayerTimesData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function cachePrayerTimesData(data) {
        const {1: firstMonth} = data
        const year = firstMonth[0].date.gregorian.year
        const cache = await caches.open('v1')
        await cache.put('prayer-times-data', new Response(JSON.stringify(data)));
        await cache.put('prayer-times-period', new Response(JSON.stringify(year)));
        await cache.put('prayer-times-location', new Response(localStorage.getItem('location')));
}
