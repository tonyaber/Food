const tabs = document.querySelectorAll('.tabheader__item'),
    tabsParent = document.querySelector('.tabheader__items'),
    content = document.querySelectorAll('.tabcontent');

const hideContent = () => {
    content.forEach(item => item.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
};

const showContent = (i = 0) => {
    content[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
};

tabsParent.addEventListener('click', (evt) => {
    if (evt.target && evt.target.classList.contains('tabheader__item')) {
        tabs.forEach((tab, index) => {
            if (tab == evt.target) {
                hideContent();
                showContent(index);
            }
        });
    }
});

export { hideContent, showContent };