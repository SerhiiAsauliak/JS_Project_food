"use strict";
window.addEventListener('DOMContentLoaded', () => {
   // Tabs
   const itemList = document.querySelectorAll('.tabheader__item'),
      itemContent = document.querySelectorAll('.tabcontent'),
      wrapper = document.querySelector('.tabcontainer');

   wrapper.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('.tabheader__item')) {
         itemList.forEach((item, i) => {
            if (target == item) {
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
      if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
         closeModal();
      }
   });
   const modalTimeOut = setTimeout(openModal, 50000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
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
         if (this.classes.length === 0) {
            this.elem = 'menu__item';
            elem.classList.add(this.elem);
         } else {
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

   // Using json server for adding foodcards

   const getResource = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   };

   // Variant 1: start (create card with class MenuItem) 
   // getResource('http://localhost:3000/menu')
   // .then(data => {
   //    data.forEach(({img, altimg, title, descr, price}) => {
   //       new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
   //    });
   // });
   // Variant 1: end

   // Variant 2 start (create card dynamically)
   getResource('http://localhost:3000/menu')
      .then(data => createCard(data));

   function createCard(data) {
      data.forEach(({ img, altimg, title, descr, price }) => {
         const elem = document.createElement('div');
         elem.classList.add('menu__item');
         elem.innerHTML = `
         <img src=${img} alt=${altimg}>
         <h3 class="menu__item-subtitle">${title}</h3>
         <div class="menu__item-descr">${descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
         </div>
      `;
         document.querySelector('.menu__field .container').append(elem);
      });
   }
   // Variant 2: end

   // Sending forms

   const forms = document.querySelectorAll('form');
   const formMessages = {
      loading: 'img/form/spinner.svg',
      success: 'Operation completed!',
      error: 'Something get wrong...'
   };
   forms.forEach(el => {
      bindPostData(el);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         body: data,
         headers: { 'Content-type': 'application/json' },
      });
      return await res.json();
   };

   function bindPostData(form) {
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
         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
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
      }, 4000);
   }

   // Slider
   const slide = document.querySelectorAll('.offer__slide'),
      slideContainer = document.querySelector('.offer__slider'),
      prevBtn = document.querySelector('.offer__slider-prev'),
      nextBtn = document.querySelector('.offer__slider-next'),
      currentSliderId = document.querySelector('#current'),
      totalSliderId = document.querySelector('#total'),
      sliderWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.slider-wrapper__inner'),
      width = window.getComputedStyle(sliderWrapper).width;

   let currIndex = 1;
   let offset = 0;
   totalSliderId.innerHTML = addZero(slide.length);
   currentSliderId.innerHTML = addZero(currIndex);
   sliderWrapper.style.overflow = 'hidden';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';
   slidesField.style.width = +width.slice(0, 3) * slide.length + 'px';
   slide.forEach(el => {
      el.style.width = width;
   });

   function lightCurrDot() {
      dotsArr.forEach(dot => dot.style.opacity = 0.5);
      dotsArr[currIndex - 1].style.opacity = 1;
   }

   slideContainer.style.position = 'relative';
   let dotsArr = [];
   const indicators = document.createElement('ol');
   indicators.classList.add('carousel-indicator');
   indicators.style.cssText = `
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 15;
   display: flex;
   justify-content: center;
   margin-right: 15%;
   margin-left: 15%;
   list-style: none;
`;
   slideContainer.append(indicators);

   for (let i = 0; i < slide.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
   `;
      if (i == 0) {
         dot.style.opacity = 1;
      }
      indicators.append(dot);
      dotsArr.push(dot);
   }
   function dleteNoDigits(str) {
      return +str.replace(/\D/g, '');
   }

   prevBtn.addEventListener('click', () => {
      if (offset == 0) {
         offset = dleteNoDigits(width) * (slide.length - 1);
      } else {
         offset -= dleteNoDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (currIndex == 1) {
         currIndex = slide.length;
      } else {
         currIndex--;
      }
      currentSliderId.innerHTML = addZero(currIndex);
      lightCurrDot();
   });

   nextBtn.addEventListener('click', () => {
      if (offset == dleteNoDigits(width) * (slide.length - 1)) {
         offset = 0;
      } else {
         offset += dleteNoDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (currIndex == slide.length) {
         currIndex = 1;
      } else {
         currIndex++;
      }
      currentSliderId.innerHTML = addZero(currIndex);
      lightCurrDot();
   });

   dotsArr.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');
         currIndex = slideTo;
         offset = dleteNoDigits(width) * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;
         lightCurrDot();
      });
   });

   //Slider realization variant 2:
   // showSlide(currIndex);

   // function showSlide(n) {
   //    if (n > slide.length) {
   //       currIndex = 1;
   //    }
   //    if (n < 1) {
   //       currIndex = slide.length;
   //    }
   //    currentSliderId.innerHTML = addZero(currIndex);
   //    slide.forEach(el => el.style.display = 'none');
   //    slide[currIndex - 1].style.display = 'block';
   // }
   // function plusSlides(n) {
   //    showSlide(currIndex += n);
   // }
   // prevBtn.addEventListener('click', () => {
   //    plusSlides(-1);
   // });

   // nextBtn.addEventListener('click', () => {
   //    plusSlides(1);
   // });

   // Calc
   const result = document.querySelector('.calculating__result span');
   let sex = 'female',
      height, weight, age,
      ratio = 1.375;
   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }
      if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calcTotal();
   function getStaticInfo(parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);
      elements.forEach(el => {
         el.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
            } else {
               sex = e.target.getAttribute('id');
            }
            elements.forEach(el => {
               el.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            calcTotal();
         });
      });

   }
   getStaticInfo('#gender', 'calculating__choose-item_active');
   getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

   function getDynamicInfo(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
         switch (input.getAttribute('id')) {
            case 'height': height = +input.value; break;
            case 'weight': weight = +input.value; break;
            case 'age': age = +input.value; break;
         }
         calcTotal();
      });

   }
   getDynamicInfo('#height');
   getDynamicInfo('#weight');
   getDynamicInfo('#age');
});

