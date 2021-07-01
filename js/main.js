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

    let numberOfSlider = 1;

    const photoSliders = document.querySelectorAll('.offer__slide'),
        firstNumberOfSlider = document.querySelector('#current'),
        totalNumberOfSlider = document.querySelector('#total'),
        offerSliderPrev = document.querySelector('.offer__slider-prev'),
        offerSliderNext = document.querySelector('.offer__slider-next');

    const showSlider = (number) => {
        if (number > photoSliders.length) {
            numberOfSlider = 1;
        }
        if (number < 1) {
            numberOfSlider = photoSliders.length;
        }
        photoSliders.forEach(slide => slide.style.display = 'none');
        photoSliders[numberOfSlider - 1].style.display = 'block';

        if (numberOfSlider < 10) {
            firstNumberOfSlider.textContent = `0${numberOfSlider}`;
        } else {
            firstNumberOfSlider.textContent = numberOfSlider;
        }
    };

    const plusSlider = (number) => {
        showSlider(numberOfSlider += number);
    };

    showSlider(numberOfSlider);

    if (photoSliders.length < 10) {
        totalNumberOfSlider.textContent = `0${photoSliders.length}`;
    } else {
        totalNumberOfSlider.textContent = photoSliders.length;
    }

    offerSliderNext.addEventListener('click', () => {
        plusSlider(1);
    });

    offerSliderPrev.addEventListener('click', () => {
        plusSlider(-1);
    });



});
