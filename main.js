'use strict';

const list = document.querySelector('.list');
const textBox = document.querySelector('.input__text__box');
const btnSubmit = document.querySelector('.input__submit');
const btnClear = document.querySelector('.btn__clear');

function createListItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'list__item');

  const name = document.createElement('span');
  name.setAttribute('class', 'list__item__name');
  name.innerText = `• ${text}`;

  const wrapper = document.createElement('div');

  const btnCheck = document.createElement('button');
  btnCheck.setAttribute('class', 'list__item__btn-check');
  btnCheck.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
  btnCheck.addEventListener('click', () => {
    const item = btnCheck.firstChild;
    const checked = 'fa-solid';
    const unchecked = 'fa-regular';

    let prev;
    let changed;
    let opacity;

    if (item.classList[0] === unchecked) {
      prev = unchecked;
      changed = checked;
      opacity = '1';
    } else {
      prev = checked;
      changed = unchecked;
      opacity = '0';
    }

    item.classList.replace(prev, changed);
    name.style.setProperty('--opacity-line', opacity);
  });

  const btnDelete = document.createElement('button');
  btnDelete.setAttribute('class', 'list__item__btn-delete');
  btnDelete.innerHTML = '<i class="fa-solid fa-eraser"></i>';
  btnDelete.addEventListener('click', () => {
    list.removeChild(itemRow);
  });
  
  wrapper.appendChild(btnCheck);
  wrapper.appendChild(btnDelete);

  itemRow.appendChild(name);
  itemRow.appendChild(wrapper);

  return itemRow;
}

function addItem() {
  const text = textBox.value;

  if (!!text.trim()) {
    const item = createListItem(text);
    list.appendChild(item);

    item.scrollIntoView({block: 'center'});

    textBox.value = '';
    textBox.focus();
  } else {
    textBox.focus();
    return;
  }
}

btnSubmit.addEventListener('click', () => {
  addItem();
});

btnClear.addEventListener('click', () => {
  list.innerHTML = '';
});

textBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addItem();
  }
});

