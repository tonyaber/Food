const result = document.querySelector('.calculating__result span');

let sex = 'female',
    height, weight, age,
    ratio = 1.375;

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
        changeActiveClass(gender, evt);
    });
});

active.forEach(element => {
    element.addEventListener('click', (evt) => {
        ratio = +evt.target.getAttribute('data-ratio');
        changeActiveClass(active, evt);
    });
});

document.querySelector('#height').addEventListener('input', (evt) => {
    height = +evt.target.value;
    calcTotal();
});

document.querySelector('#weight').addEventListener('input', (evt) => {
    weight = +evt.target.value;
    calcTotal();
});

document.querySelector('#age').addEventListener('input', (evt) => {
    age = +evt.target.value;
    calcTotal();
});


