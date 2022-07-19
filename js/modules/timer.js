function timer(id, deadline) {
   // ADDVERTISEMENT TIMER
   function getTimeRemaining(endline) {
      let days, hours, minutes, seconds;
      let temp = Date.parse(endline) - Date.parse(new Date());
      if (temp <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(temp / (1000 * 60 * 60 * 24));
         hours = Math.floor((temp / (1000 * 60 * 60)) % 24);
         minutes = Math.floor((temp / (1000 * 60)) % 60);
         seconds = Math.floor((temp / 1000) % 60);
      }
      return {
         'total': temp,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };

   }
   function addZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }
   function setTime(selector, andtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeIntervel = setInterval(updateTime, 1000);
      updateTime();

      function updateTime() {
         const newTime = getTimeRemaining(andtime);
         days.innerHTML = addZero(newTime.days);
         hours.innerHTML = addZero(newTime.hours);
         minutes.innerHTML = addZero(newTime.minutes);
         seconds.innerHTML = addZero(newTime.seconds);
         if (newTime.temp <= 0) {
            clearInterval(timeIntervel);
         }
      }

   }
   setTime(id, deadline);
}

export default timer;