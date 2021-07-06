const result = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

height = localStorage.getItem('height');
document.querySelector('#height').value = height;

weight = localStorage.getItem('weight');
document.querySelector('#weight').value = weight;

age = localStorage.getItem('age');
document.querySelector('#age').value = age;



function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    }
    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

const gender = document.querySelector('#gender').querySelectorAll('div'),
    active = document.querySelector('.calculating__choose_big').querySelectorAll('div');

const changeActiveClass = (elements, evt) => {
    elements.forEach(element => element.classList.remove('calculating__choose-item_active'));
    evt.target.classList.add('calculating__choose-item_active');
    calcTotal();
};

gender.forEach(element => {
    element.addEventListener('click', (evt) => {
        sex = evt.target.getAttribute('id');
        localStorage.setItem('sex', sex);
        changeActiveClass(gender, evt);
    });
});

active.forEach(element => {
    element.addEventListener('click', (evt) => {
        ratio = +evt.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', ratio);
        changeActiveClass(active, evt);
    });
});

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
        } else {
            input.style.border = 'none';
        }
        switch (input.getAttribute('id')) {
            case "height":
                height = +input.value;
                localStorage.setItem('height', height);
                break;
            case "weight":
                weight = +input.value;
                localStorage.setItem('weight', weight);
                break;
            case "age":
                age = +input.value;
                localStorage.setItem('age', age);
                break;
        }

        calcTotal();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');



