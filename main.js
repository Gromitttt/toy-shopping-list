'use strict';

const ICON_CHECKED = 'fa-solid';
const ICON_UNCHECKED = 'fa-regular';
const STATUS_CHECKED = 'checked';
const STATUS_UNCHECKED = 'unchecked';

const list = document.querySelector('.list');
const textBox = document.querySelector('.input__text__box');
const btnSubmit = document.querySelector('.input__submit');
const btnClear = document.querySelector('.btn__clear');

let id = 0;

function createListItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'list__item');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <span class="list__item__name" data-id=${id}>• ${text}</span>
    <div>
      <button class="list__item__btn-check">
        <i class="fa-regular fa-circle-check" data-id=${id} data-name="check" data-status="unchecked"></i>
      </button>
      <button class="list__item__btn-delete">
        <i class="fa-solid fa-eraser" data-id=${id} data-name="delete"></i>
      </button>
    </div>
  `;

  id++;
  return itemRow;
}

list.addEventListener('click', e => {
  const data = e.target.dataset;
  const id = data.id;
  
  if(id) {
    const name = data.name;

    if (name === 'delete') {
      const toBeDeleted = document.querySelector(`.list__item[data-id="${id}"]`);
      toBeDeleted.remove();
    } else if (name === 'check') {
      const toBeChanged = document.querySelector(`.list__item__name[data-id="${id}"]`);
      let prev;
      let changed;
      let opacity;

      if (data.status === STATUS_UNCHECKED) {
        prev = ICON_UNCHECKED;
        changed = ICON_CHECKED;
        opacity = '1';
        data.status = STATUS_CHECKED;
      } else {
        prev = ICON_CHECKED;
        changed = ICON_UNCHECKED;
        opacity = '0';
        data.status = STATUS_UNCHECKED;
      }

      e.target.classList.replace(prev, changed);
      toBeChanged.style.setProperty('--opacity-line', opacity);
    }
  }
});

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

textBox.addEventListener('keydown', (e) => {
  if (e.isComposing) return;
  
  if (e.key === 'Enter') { 
    addItem();
  }
});

