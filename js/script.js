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


});