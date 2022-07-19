import {getResource} from "../services/services";

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
}

export default cards;