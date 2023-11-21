import {isCurrentDate, remind, removeTimeZone} from "./utils.js";
export default function(data) {

    const currentDate = data.find(d => {
        const {date} = d.date.gregorian
        return isCurrentDate(date)
    })

    if (!currentDate) return

    const prayerTimesDiv = document.getElementById('prayer-times');

    // Map of prayer type to CSS class name
    const prayerTypeClassMap = {
        'Fajr': 'fajr',
        'Sunrise': 'dhuhr',
        'Sunset': 'maghrib',
        'Asr': 'asr',
        'Isha': 'isha',
    };

    const prayerTypeNameMap = {
      'Fajr': 'İmsak',
      'Sunrise': 'Güneş',
      'Sunset': 'Akşam',
      'Dhuhr': 'Öğle',
      'Asr': 'İkindi',
      'Isha': 'Yatsı',
  };

    let prayerTimesHTML = '<ul>';

    // Extract the first 6 prayer times and loop through them
    const first6PrayerTimes = Object.entries(currentDate.timings).slice(0, 7);
    const {hours, minutes, prayerSection} = remind(first6PrayerTimes)
    for (const [prayerType, time] of first6PrayerTimes) {
        const className = prayerTypeClassMap[prayerType] || '';
        if (prayerTypeNameMap.hasOwnProperty(prayerType)) {
          prayerTimesHTML += `<li class="prayer-time-card ${className}"><span>${prayerTypeNameMap[prayerType]}:</span><span class="remind" style="display: ${prayerType === prayerSection ? 'inline' : 'none'}">${hours} saat - ${minutes} dakika</span><span>${removeTimeZone(time)}</span></li>`;
        }
    }

    prayerTimesHTML += '</ul>';
    prayerTimesDiv.innerHTML = prayerTimesHTML;
  }
