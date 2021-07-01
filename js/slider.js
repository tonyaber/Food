let sliderIndex = 1,
    offset = 0;

const sliders = document.querySelectorAll('.offer__slide'),
    firstNumberOfSlider = document.querySelector('#current'),
    totalNumberOfSlider = document.querySelector('#total'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderField = document.querySelector('.offer__slider-inner'),
    widthSlider = window.getComputedStyle(sliderWrapper).width;

const changeIndexSlider = (number) => {
    sliderIndex += number;
    if (sliderIndex > sliders.length) {
        sliderIndex = 1;
    }
    if (sliderIndex < 1) {
        sliderIndex = sliders.length;
    }

    if (sliders.length < 10) {
        firstNumberOfSlider.textContent = `0${sliderIndex}`;
    } else {
        firstNumberOfSlider.textContent = sliderIndex;
    }
};

sliderField.style.width = 100 * sliders.length + '%';
sliderField.style.display = 'flex';
sliderField.style.transition = '0.5s all';

sliderWrapper.style.overflow = 'hidden';

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
});
