"use strict";
window.addEventListener('DOMContentLoaded', () => {
// Tabs
const itemList = document.querySelectorAll('.tabheader__item'),
      itemContent = document.querySelectorAll('.tabcontent'),
      wrapper = document.querySelector('.tabcontainer');

wrapper.addEventListener('click', (e) => {
   const target = e.target;
   if(target && target.matches('.tabheader__item')){
      itemList.forEach((item, i) => {
         if(target == item){
            hideTabContent();
            showTabContent(i);
         }
      });
   }
});
function showTabContent(i = 0) {
   itemContent[i].classList.remove('hide');
   itemContent[i].classList.add('show', 'fade');
   itemList[i].classList.add('tabheader__item_active');
}
function hideTabContent() {
   itemContent.forEach(item => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
   });
   itemList.forEach(item => {
      item.classList.remove('tabheader__item_active');
   });
}

hideTabContent();
showTabContent(0);

// ADDVERTISEMENT TIMER
const deadline = '2022-07-05';
function getTimeRemaining(endline) {
   let days, hours, minutes, seconds;
   let temp = Date.parse(endline) - Date.parse(new Date());
   if(temp <= 0){
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
   if(num >= 0 && num < 10){
      return `0${num}`;
   }else{
      return num;
   }
}
function setTime(selector, andtime) {
   const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeIntervel = setInterval(updateTime,1000);
   updateTime();

   function updateTime() {
      const newTime = getTimeRemaining(andtime);
      days.innerHTML = addZero(newTime.days);
      hours.innerHTML = addZero(newTime.hours);
      minutes.innerHTML = addZero(newTime.minutes);
      seconds.innerHTML = addZero(newTime.seconds);
      if(newTime.temp <= 0){
         clearInterval(timeIntervel);
      }
   }      
          
}
setTime('.timer', deadline);
});