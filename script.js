import {init}  from "./service.js";
import displayPrayerTimes from "./render.js"


// Fetch and cache prayer times when the page loads.
init().then(data => {
  displayPrayerTimes(data)
});
