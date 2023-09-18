'use strict';

const list = document.querySelector('.list');
const listItemContent = document.querySelector('.list__item__info');

const textBox = document.querySelector('.input__text__box');
const btnSubmit = document.querySelector('.input__submit');
const btnClear = document.querySelector('.btn__clear');

function createListItem(text) {
  const index = list.childElementCount;
  const li = document.createElement('li');
  li.className = 'list__item';
  li.setAttribute('data-index', index);
  li.innerHTML = `
    <span class="list__item__info">• ${text}</span>
    <div class="list__item__btn__wrapper">
      <i data-index="${index}" onclick="checkTrigger(this)" class="list__item__btn-check fa-regular fa-circle-check"></i>
      <i data-index="${index}" onclick="deleteItem(this)" class="list__item__btn-delete fa-solid fa-eraser"></i>
    </div>
  `;
  return li;
}

function deleteItem(element) {
  const item = getItem(element);
  if (item.parentNode) {
    item.parentNode.removeChild(item);
  }
}

function checkTrigger(element) {
  const listItem = getItem(element);
  const checkIcon = listItem.lastElementChild.firstElementChild;
  const checkIconClassList = [...checkIcon.classList];
  const checked = 'fa-solid';
  const unchecked = 'fa-regular';
  let prev;
  let changed;
  let opacity;

  if (checkIconClassList.includes(unchecked)) {
    prev = unchecked;
    changed = checked;
    opacity = '1';
  } else if (checkIconClassList.includes(checked)) {
    prev = checked;
    changed = unchecked;
    opacity = '0';
  }

  checkIcon.classList.replace(prev, changed);
  listItem.style.setProperty('--opacity-line', opacity);
}

function getItem(element) {
  const index = element.getAttribute('data-index');
  const items = [...list.children];
  const item = items.find(item => item.getAttribute('data-index') === index);
  return item;
}

btnClear.addEventListener('click', () => {
  list.innerHTML = '';
});

btnSubmit.addEventListener('click', () => {
  const text = textBox.value;
  if (!!text.trim()) {
    list.append(createListItem(text));
    textBox.value = '';
  } 
});

textBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnSubmit.click();
  }
});

