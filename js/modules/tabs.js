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

export default tabs;