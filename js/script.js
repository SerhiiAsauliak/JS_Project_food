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

// MODAL
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modalWindow = document.querySelector('.modal');

modalTrigger.forEach((el) => {
   el.addEventListener('click', openModal);
});
function openModal() {
      modalWindow.classList.add('show');
      modalWindow.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimeOut);
}
function closeModal() {
   modalWindow.classList.remove('show');
   modalWindow.classList.add('hide');
   document.body.style.overflow = 'auto';
}

modalWindow.addEventListener('click', (e) => {
   if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
      closeModal();
   }
});

document.addEventListener('keydown', (e) => {
   if(e.code === 'Escape' && modalWindow.classList.contains('show')){
      closeModal();
   }
});
const modalTimeOut = setTimeout(openModal, 50000);

function showModalByScroll() {
   if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
   }
}

window.addEventListener('scroll', showModalByScroll);
   
// Using classes for adding foodcards
class MenuItem {
   constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 35;
      this.parent = document.querySelector(parentSelector);
      this.changeToUAH();
   }
   changeToUAH() {
      this.price *= this.transfer;
   }
   render() {
      const elem = document.createElement('div');
      if(this.classes.length === 0){
         this.elem = 'menu__item';
         elem.classList.add(this.elem);
      }else{
         this.classes.forEach(className => {
            elem.classList.add(className);
         });
      }
      
      elem.innerHTML = `
         <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}</h3>
         <div class="menu__item-descr">${this.descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>
      `;
      this.parent.append(elem);
   
   }
}
   new MenuItem(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
      'menu__item',
      'big'
   ).render(); 

   new MenuItem(
      "img/tabs/elite.jpg",
      "elite",
      'Меню "Премиум"',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      13,
      '.menu .container',
      'menu__item'
   ).render();
   
   new MenuItem(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      10,
      '.menu .container',
      'menu__item'
   ).render();

// Sending forms

const forms = document.querySelectorAll('form');
const formMessages = {
   loading: 'img/form/spinner.svg',
   success: 'Operation completed!',
   error : 'Something get wrong...'
};
forms.forEach(el => {
   postData(el);
});

function postData(form) {
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = formMessages.loading;
      statusMessage.style.cssText = `
         display: block;
         margin: 0 auto; 
      `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => {
         object[key] = value;
      });

      fetch('server.php', {
         method: 'POST',
         body:  JSON.stringify(object),
         headers: {'Content-type': 'application/json'},
      })
      .then(data => data.text())
      .then(data => {
         console.log(data);
         showThanksModal(formMessages.success);
         statusMessage.remove();
      })
      .catch(() => {
         showThanksModal(formMessages.error);
      })
      .finally(() => {
         form.reset();
      });       
   });
}

function showThanksModal(message) {
   const prevModalDialog = document.querySelector('.modal__dialog');
   prevModalDialog.classList.add('hide');
   openModal();
   const thanksModal = document.createElement('div');
   thanksModal.classList.add('modal__dialog');
   thanksModal.innerHTML = `
   <div class="modal__content">
      <div class="modal__close data-close" data-close>&times;</div>,
      <div class="modal__title">${message}</div>   
   </div>
   `;
   document.querySelector('.modal').append(thanksModal);
   setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
   },4000);
}

});

