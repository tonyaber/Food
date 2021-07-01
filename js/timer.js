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

export { createTimer };