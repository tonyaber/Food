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
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }

        calcTotal();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');


