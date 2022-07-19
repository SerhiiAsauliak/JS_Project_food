"use strict";
import tabs  from './modules/tabs';
import calc  from './modules/calc';
import cards  from './modules/cards';
import forms  from './modules/forms';
import modal  from './modules/modal';
import timer  from './modules/timer';
import slider  from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

  const modalTimeOut = setTimeout(() => openModal('.modal', modalTimeOut), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
  calc();
  cards();
  forms('form', modalTimeOut);
  modal('[data-modal]', '.modal', modalTimeOut);
  timer('.timer', '2022-08-18');
  slider({
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

