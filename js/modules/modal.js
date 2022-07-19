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

export default modal;
export {closeModal};
export {openModal};