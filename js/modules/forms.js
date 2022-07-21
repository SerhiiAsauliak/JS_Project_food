import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

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
         let obj = {};             
         formData.forEach((value, key) => { obj[key] = value;});             
         let json = JSON.stringify(obj);
         // const json = JSON.stringify(Object.fromEntries(formData.entries()));

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
      openModal('.modal', modalTimeOut);
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
   <div class="modal__content">
      <div class="modal__close data-close" data-close>&times;</div>,
      <div class="modal__title">${message}</div>   
   </div>
   `;
      document.querySelector('.modal').appendChild(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal('.modal');
      }, 4000);
   }
}

export default forms;
