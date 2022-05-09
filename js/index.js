/* eslint-disable import/extensions */
import keyboardItemes from './vacab.js';

function getCurrLang() {
  if (localStorage.getItem('Lang')) {
    return localStorage.getItem('Lang');
  }
  return 'En';
}

let currLang = getCurrLang();

function changeLang() {
  if (currLang === 'En') {
    localStorage.setItem('Lang', 'Ru');
    currLang = 'Ru';
    return currLang;
  }
  localStorage.setItem('Lang', 'En');
  currLang = 'En';
  return currLang;
}

function createKeyboard() {
  const container = "<div class='container'><textarea class='textarea' rows='15'></textarea><div class='keyboard'><div class='row'></div><div class='row'></div><div class='row'></div><div class='row'></div><div class='row'></div></div><div class='info'><p>Клавиатура создана в операционной системе macOS</p><p>Для переключения языка комбинация: control + shift left</p></div></div>";
  document.querySelector('.body').innerHTML = container;
  const rows = document.querySelectorAll('.row');
  rows.forEach((row, ind) => {
    const rowKeys = keyboardItemes.filter((item) => item.row === ind);
    rowKeys.forEach((elem) => {
      if (currLang === 'En') {
        rows[ind].innerHTML += `<button class="key" data-key=${elem.eventCode}>${elem.eventKeyEn}</button>`;
      }
      if (currLang === 'Ru') {
        rows[ind].innerHTML += `<button class="key" data-key=${elem.eventCode}>${elem.eventKeyRu}</button>`;
      }
    });
  });

  const allKeys = document.querySelectorAll('.key');
  const textarea = document.querySelector('.textarea');
  const caps = document.querySelector('[data-key=CapsLock]');
  const shiftLeft = document.querySelector('[data-key=ShiftLeft]');
  const shiftRight = document.querySelector('[data-key=ShiftRight]');

  function changeKeysLang() {
    allKeys.forEach((key) => {
      const currentKey = key;
      const keyItem = keyboardItemes.find((el) => el.eventCode === key.dataset.key);
      if (currLang === 'En') {
        currentKey.textContent = keyItem.eventKeyEn;
      } else {
        currentKey.textContent = keyItem.eventKeyRu;
      }
    });
  }

  function deleteSymbol() {
    if (textarea.selectionStart) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, startPos - 1)
                + textarea.value.substring(endPos, textarea.value.length);
      textarea.selectionStart = startPos - 1;
      textarea.selectionEnd = startPos - 1;
    } else {
      const text = textarea.textContent;
      textarea.textContent = text.slice(0, text.length - 1);
    }
    textarea.focus();
  }

  function uppLowCase() {
    caps.classList.toggle('pressed-caps');
    const isCapsOn = caps.classList.contains('pressed-caps');
    allKeys.forEach((key) => {
      const currentKey = key;
      if (key.dataset.key.includes('Key')) {
        currentKey.textContent = isCapsOn
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
      if (currLang === 'Ru') {
        const keysToChange = keyboardItemes.filter((elem) => elem.upper);
        const keyToChange = keysToChange.find((el) => el.eventCode === key.dataset.key);
        if (!key.dataset.key.includes('Key') && keyToChange) {
          currentKey.textContent = isCapsOn ? keyToChange.shiftOnRu : keyToChange.eventKeyRu;
        }
      }
    });
  }

  caps.addEventListener('click', uppLowCase);

  function shiftUpCase() {
    if (caps.classList.contains('pressed-caps')) {
      allKeys.forEach((key) => {
        const currentKey = key;
        if (key.dataset.key.includes('Key')) {
          currentKey.textContent = key.textContent.toLowerCase();
        }
      });
    } else {
      allKeys.forEach((key) => {
        const currentKey = key;
        if (key.dataset.key.includes('Key')) {
          currentKey.textContent = key.textContent.toUpperCase();
        }
      });
    }
  }

  function shiftLowCase() {
    if (caps.classList.contains('pressed-caps')) {
      allKeys.forEach((key) => {
        const currentKey = key;
        if (key.dataset.key.includes('Key')) {
          currentKey.textContent = key.textContent.toUpperCase();
        }
      });
    } else {
      allKeys.forEach((key) => {
        const currentKey = key;
        if (key.dataset.key.includes('Key')) {
          currentKey.textContent = key.textContent.toLowerCase();
        }
      });
    }
  }

  function changeWhenShift() {
    const keysToChange = keyboardItemes.filter((elem) => elem.shiftOnEn);
    allKeys.forEach((key) => {
      const keyToChange = keysToChange.find((el) => el.eventCode === key.dataset.key);
      const currentKey = key;
      if (keyToChange && currLang === 'En') {
        currentKey.textContent = keyToChange.shiftOnEn;
      }
      if (keyToChange && currLang === 'Ru') {
        currentKey.textContent = keyToChange.shiftOnRu;
      }
      if (currLang === 'Ru') {
        const ruKeysToChange = keyboardItemes.filter((elem) => elem.upper);
        const ruKeyToChange = ruKeysToChange.find((el) => el.eventCode === key.dataset.key);
        const isCapsOn = caps.classList.contains('pressed-caps');
        if (ruKeyToChange) {
          currentKey.textContent = isCapsOn ? ruKeyToChange.eventKeyRu : ruKeyToChange.shiftOnRu;
        }
      }
    });
  }

  function changeWhenUnShift() {
    const keysToChange = keyboardItemes.filter((elem) => elem.shiftOnEn);

    allKeys.forEach((key) => {
      const keyToChange = keysToChange.find((el) => el.eventCode === key.dataset.key);
      const currentKey = key;
      if (keyToChange && currLang === 'En') {
        currentKey.textContent = keyToChange.eventKeyEn;
      }
      if (keyToChange && currLang === 'Ru') {
        currentKey.textContent = keyToChange.eventKeyRu;
      }
      if (currLang === 'Ru') {
        const ruKeysToChange = keyboardItemes.filter((elem) => elem.upper);
        const ruKeyToChange = ruKeysToChange.find((el) => el.eventCode === key.dataset.key);
        const isCapsOn = caps.classList.contains('pressed-caps');
        if (ruKeyToChange) {
          currentKey.textContent = isCapsOn ? ruKeyToChange.shiftOnRu : ruKeyToChange.eventKeyRu;
        }
      }
    });
  }

  function insertAtCursor(insertedValue) {
    if (textarea.selectionStart || textarea.selectionStart === 0) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, startPos)
                    + insertedValue
                    + textarea.value.substring(endPos, textarea.value.length);
      textarea.selectionStart = startPos + insertedValue.length;
      textarea.selectionEnd = startPos + insertedValue.length;
    } else {
      textarea.value += insertedValue;
    }
    textarea.focus();
  }

  allKeys.forEach((key) => {
    key.addEventListener('mousedown', (event) => {
      const currentKey = event.currentTarget;
      if (currentKey.dataset.key === 'Enter') {
        insertAtCursor('\r');
        return;
      }

      if (key.dataset.key === 'Backspace') {
        deleteSymbol();
        return;
      }

      if (key.dataset.key === 'ShiftLeft' || key.dataset.key === 'ShiftRight') {
        changeWhenShift();
        shiftUpCase();
        return;
      }

      if (key.dataset.key === 'Tab') {
        insertAtCursor('\t');
        return;
      }

      const keyItem = keyboardItemes.find((el) => el.eventCode === key.dataset.key);
      if (!keyItem.notEntered) {
        insertAtCursor(key.textContent);
      }
    });
    key.addEventListener('mousedown', () => key.classList.add('pressed'));
    key.addEventListener('mouseup', () => key.classList.remove('pressed'));
    key.addEventListener('mouseout', () => key.classList.remove('pressed'));
  });

  shiftLeft.addEventListener('mouseup', shiftLowCase);
  shiftLeft.addEventListener('mouseup', changeWhenUnShift);
  shiftRight.addEventListener('mouseup', shiftLowCase);
  shiftRight.addEventListener('mouseup', changeWhenUnShift);

  const keysPressed = {};
  window.addEventListener('keydown', (event) => {
    event.preventDefault();

    keysPressed[event.code] = true;
    const key = [...allKeys].find((el) => el.dataset.key === event.code);

    if (keysPressed.ControlLeft && event.code === 'ShiftLeft') {
      key.classList.add('pressed');
      changeLang();
      changeKeysLang();
      return;
    }

    if (event.code !== 'CapsLock') {
      key.classList.add('pressed');
    }

    if (event.code === 'Enter') {
      insertAtCursor('\r');
      return;
    }

    if (event.code === 'Backspace') {
      deleteSymbol();
      return;
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      changeWhenShift();
      shiftUpCase();
      return;
    }

    if (event.code === 'Tab') {
      insertAtCursor('\t');
      return;
    }

    if (event.code === 'CapsLock') {
      uppLowCase();
      return;
    }

    const keyItem = keyboardItemes.find((el) => el.eventCode === event.code);
    if (!keyItem.notEntered) {
      const keyToInsert = [...allKeys].find((el) => el.dataset.key === event.code);
      insertAtCursor(keyToInsert.textContent);
    }
  });

  window.addEventListener('keyup', (event) => {
    const key = [...allKeys].find((el) => el.dataset.key === event.code);
    key.classList.remove('pressed');
    delete keysPressed[event.code];

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      changeWhenUnShift();
      shiftLowCase();
    }

    if (event.code === 'CapsLock') {
      uppLowCase();
      key.classList.remove('pressed');
    }
  });
}

window.addEventListener('load', createKeyboard);
