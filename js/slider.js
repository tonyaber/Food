let sliderIndex = 1,
    offset = 0;

const sliders = document.querySelectorAll('.offer__slide'),
    sliderParent = document.querySelector('.offer__slider'),
    firstNumberOfSlider = document.querySelector('#current'),
    totalNumberOfSlider = document.querySelector('#total'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderField = document.querySelector('.offer__slider-inner'),
    widthSlider = window.getComputedStyle(sliderWrapper).width;

const addZeroForIndex = (index) => {
    if (sliders.length < 10) {
        firstNumberOfSlider.textContent = `0${index}`;
    } else {
        firstNumberOfSlider.textContent = index;
    }
};

const changeIndexSlider = (number) => {
    sliderIndex += number;
    if (sliderIndex > sliders.length) {
        sliderIndex = 1;
    }
    if (sliderIndex < 1) {
        sliderIndex = sliders.length;
    }

    addZeroForIndex(sliderIndex);
};

const changeOpasityForDots = (index) => {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[index - 1].style.opacity = '1';
};

sliderField.style.width = 100 * sliders.length + '%';
sliderField.style.display = 'flex';
sliderField.style.transition = '0.5s all';

sliderWrapper.style.overflow = 'hidden';

sliderParent.style.position = 'relative';

const indicators = document.createElement('ol'),
    dots = [];

indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
sliderParent.append(indicators);

for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

sliders.forEach(slide => slide.style.width = widthSlider);

changeIndexSlider(0);

next.addEventListener('click', () => {
    if (offset == (+widthSlider.slice(0, -2) * (sliders.length - 1))) {
        offset = 0;
    }
    else {
        offset += +widthSlider.slice(0, -2);
    }
    sliderField.style.transform = `translateX(-${offset}px)`;

    changeIndexSlider(1);
    changeOpasityForDots(sliderIndex);
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +widthSlider.slice(0, -2) * (sliders.length - 1);
    }
    else {
        offset -= +widthSlider.slice(0, -2);
    }
    sliderField.style.transform = `translateX(-${offset}px)`;
    changeIndexSlider(-1);
    changeOpasityForDots(sliderIndex);

});

indicators.addEventListener('click', (evt) => {
    const sliderTo = evt.target.getAttribute('data-slide-to');
    sliderIndex = +sliderTo;
    changeOpasityForDots(sliderTo);
    offset = +widthSlider.slice(0, -2) * (sliderTo - 1);
    sliderField.style.transform = `translateX(-${offset}px)`;
    addZeroForIndex(sliderTo);
});

