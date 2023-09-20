'use strict';

const ICON_CHECKED = 'fa-solid';
const ICON_UNCHECKED = 'fa-regular';
const STATUS_CHECKED = 'checked';
const STATUS_UNCHECKED = 'unchecked';

const list = document.querySelector('.list');
const textBox = document.querySelector('.input__text__box');
const btnSubmit = document.querySelector('.input__submit');
const btnClear = document.querySelector('.btn__clear');
const form = document.querySelector('.form');

let id = 0;

// 이벤트 핸들러 함수들
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

function handleDelete(id) {
  const toBeDeleted = document.querySelector(`.list__item[data-id="${id}"]`);
  toBeDeleted.remove();
}

function handleCheck(id, status) {
  const toBeChanged = document.querySelector(`.list__item__name[data-id="${id}"]`);
  const prev = status === STATUS_UNCHECKED ? ICON_UNCHECKED : ICON_CHECKED;
  const changed = status === STATUS_UNCHECKED ? ICON_CHECKED : ICON_UNCHECKED;
  const opacity = status === STATUS_UNCHECKED ? '1' : '0';

  const checkIcon = document.querySelector(`.fa-circle-check[data-id="${id}"]`);
  checkIcon.classList.replace(prev, changed);
  
  toBeChanged.style.setProperty('--opacity-line', opacity);

  return status === STATUS_UNCHECKED ? STATUS_CHECKED : STATUS_UNCHECKED;
}

function addItem() {
  const text = textBox.value;

  if (!!text.trim()) {
    const item = createListItem(text);
    list.appendChild(item);
    item.scrollIntoView({ block: 'center' });

    textBox.value = '';
    textBox.focus();
  } else {
    textBox.focus();
  }
}

// 이벤트 리스너들
list.addEventListener('click', e => {
  const data = e.target.dataset;
  const id = data.id;
  
  if(id) {
    const name = data.name;

    if (name === 'delete') {
      handleDelete(id);
    } else if (name === 'check') {
      data.status = handleCheck(id, data.status);
    }
  }
});

btnClear.addEventListener('click', () => {
  list.innerHTML = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addItem();
});
