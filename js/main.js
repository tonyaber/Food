import { hideContent, showContent } from './mainContent.js';
import { createTimer } from './timer.js';
import './modal.js';
import { getResource, bindPostData } from './fetch.js';
import { MenuCard } from './menuCard.js';
import './slider.js';
window.addEventListener('DOMContentLoaded', function () {
    hideContent();
    showContent();

    const deadline = '2021-09-15';
    createTimer('.timer', deadline);

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item')
                    .render();
            });
        });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => bindPostData(form));


});
