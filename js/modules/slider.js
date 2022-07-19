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

export default slider;