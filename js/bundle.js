/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   // Calc
   const result = document.querySelector('.calculating__result span');
   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }
   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
         el.classList.remove(activeClass);
         if (el.getAttribute('id') === localStorage.getItem('sex')) {
            el.classList.add(activeClass);
         }
         if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            el.classList.add(activeClass);
         }
      });
   }
   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


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
   function getStaticInfo(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
         el.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
               ratio = +e.target.getAttribute('data-ratio');
            } else {
               localStorage.setItem('sex', e.target.getAttribute('id'));
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
   getStaticInfo('#gender div', 'calculating__choose-item_active');
   getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

   function getDynamicInfo(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
         if (input.value.match(/\D/g)) {
            input.style.border = '2px solid red';
         } else {
            input.style.border = 'none';
         }
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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

   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimeOut) {
   // Sending forms

   const forms = document.querySelectorAll(formSelector);
   const formMessages = {
      loading: 'img/form/spinner.svg',
      success: 'Operation completed!',
      error: 'Something get wrong...'
   };
   forms.forEach(el => {
      bindPostData(el);
   });

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

         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimeOut);
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
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
      }, 4000);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimeOut) {
   const modalWindow = document.querySelector(modalSelector); 
   modalWindow.classList.add('show');
   modalWindow.classList.remove('hide');
   document.body.style.overflow = 'hidden';
   console.log(modalTimeOut);
   if(modalTimeOut){
      clearInterval(modalTimeOut);
   }
}
function closeModal(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.classList.remove('show');
   modalWindow.classList.add('hide');
   document.body.style.overflow = 'auto';
}

function modal(triggerSelector, modalSelector, modalTimeOut) {
   // MODAL
   const modalTrigger = document.querySelectorAll(triggerSelector),
         modalWindow = document.querySelector(modalSelector);

   modalTrigger.forEach((el) => {
      el.addEventListener('click',() => openModal(modalSelector, modalTimeOut));
   });
   

   modalWindow.addEventListener('click', (e) => {
      if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         openModal(modalSelector, modalTimeOut);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slideItem, prevSlide, nextSlide, totalCounter, currCounter,wrapper, field}) {
   // Slider
   const slide = document.querySelectorAll(slideItem),
      slideContainer = document.querySelector(container),
      prevBtn = document.querySelector(prevSlide),
      nextBtn = document.querySelector(nextSlide),
      currentSliderId = document.querySelector(currCounter),
      totalSliderId = document.querySelector(totalCounter),
      sliderWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
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

   function addZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabSelector, tabContentSelector, tabParentSelector, activeClass) {
   // Tabs
   const itemList = document.querySelectorAll(tabSelector),
      itemContent = document.querySelectorAll(tabContentSelector),
      wrapper = document.querySelector(tabParentSelector);

   wrapper.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches(tabSelector)) {
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
      itemList[i].classList.add(activeClass);
   }
   function hideTabContent() {
      itemContent.forEach(item => {
         item.classList.remove('show', 'fade');
         item.classList.add('hide');
      });
      itemList.forEach(item => {
         item.classList.remove(activeClass);
      });
   }

   hideTabContent();
   showTabContent(0);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });

 const postData = async (url, data) => {
   const res = await fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-type': 'application/json' },
   });
   return await res.json();
};
const getResource = async (url) => {
   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }
   return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', () => {

  const modalTimeOut = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', modalTimeOut), 50000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimeOut);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTimeOut);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])('.timer', '2022-08-18');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    slideItem: '.offer__slide',
    prevSlide: '.offer__slider-prev',
    nextSlide: '.offer__slider-next',
    totalCounter: '#total',
    currCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.slider-wrapper__inner'
  });
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map