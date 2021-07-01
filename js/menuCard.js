export class MenuCard {
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