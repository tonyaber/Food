window.addEventListener('DOMContentLoaded', function () {
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

    hideContent();
    showContent();
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

    const deadline = '2021-09-15';

    const getTime = (timeEnd) => {
        const now = new Date();
        const difference = Date.parse(timeEnd) - Date.parse(now),
            days = Math.floor((difference / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((difference / 1000) % 60),
            minutes = Math.floor((difference / 1000 / 60) % 60),
            hours = Math.floor((difference / (1000 * 60 * 60) % 24));

        return {
            total: difference,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const setZero = (num) => {
        if (num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    };

    const createTimer = (selector, endTime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        let dateForTimer = getTime(endTime);

        if (dateForTimer.total >= 0) {
            updateClock();
        }

        const timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            dateForTimer = getTime(endTime);
            if (dateForTimer.total <= 0) {
                clearInterval(timeInterval);
            }
            else {
                days.innerHTML = setZero(dateForTimer.days);
                hours.innerHTML = setZero(dateForTimer.hours);
                minutes.innerHTML = setZero(dateForTimer.minutes);
                seconds.innerHTML = setZero(dateForTimer.seconds);
            }
        }
    };

    createTimer('.timer', deadline);

    const modalBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    const showModal = () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };

    const hideModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal();
        });
    });

    modal.addEventListener('click', (evt) => {
        if (evt.target === modal || evt.target.getAttribute('data-close') == "") {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 50000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    };

    window.addEventListener('scroll', showModalByScroll);

    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this._src = src;
            this._alt = alt;
            this._title = title;
            this._decription = description;
            this._price = price;
            this._transfer = 27;
            this._classes = classes;
            this._parent = document.querySelector(parentSelector);
            this._changeToUAH();
        }

        _changeToUAH() {
            this._price = this._price * this._transfer;
        }

        render() {
            const newElement = document.createElement('div');
            this._classes.forEach(item => newElement.classList.add(item));
            newElement.innerHTML = `<img src=${this._src} alt=${this._alt}>
                    <h3 class="menu__item-subtitle">${this._title}</h3>
                    <div class="menu__item-descr">${this._decription}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this._price}</span> грн/день</div>
                    </div>`;
            this._parent.append(newElement);

        }
    }
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item')
                    .render();
            });
        });

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await result.json();
    };

    const bindPostData = (form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });


        });
    };

    forms.forEach(form => bindPostData(form));

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            hideModal();
        }, 4000);
    }

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
