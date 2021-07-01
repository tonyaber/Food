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

export { showModal, hideModal };