const winPosition = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let modalwrapper = document.querySelector(".modal__wrapper");
let currentPlayer = 1; //1 - x; 2 - o
let gameEnd = false;

// в переменные определяем вставку из html которая содержит в себе картинку крестика и нолика
let cross = `<span class="material-symbols-outlined"> close </span>`;
let circle = `<span class="material-symbols-outlined"> circle </span>`;

// в перерменную cards определили элемент card из html

let cards = document.querySelectorAll(".card");

// для всех карт добавили метод слушателей и атрибутом добавили функцию makeMove

cards.forEach(function (elem) {
  elem.addEventListener("click", makeMove);
});

//локальную переменную card определяем как цель клика
// определяем переменную container как элемент back из html
// если переменная контейнер пустая
// и если переменная currentPlayer равна 1, то добавляем в html переменной container переменную cross(крестик)
// используем функцию checkWin
// и переменной currentPlayer присваиваем значение 2
// в другом случае добавляем в html переменной container переменную circle(круг)
// используем функцию checkWin
// и переменной currentPlayer присваиваем значение 1
// добавялем переменной card активный класс flip

function makeMove(event) {
  let card = event.target;
  let container = card.querySelector(".back");
  if (!container.innerHTML) {
    if (currentPlayer == 1) {
      container.innerHTML = cross;
      checkWin();
      currentPlayer = 2;
    } else {
      container.innerHTML = circle;
      checkWin();
      currentPlayer = 1;
    }
    card.classList.add("flip");
  }
}

function checkWin() {
  for (let i = 0; i < winPosition.length; i++) {
    let winOption = winPosition[i];
    let id1 = winOption[0];
    let id2 = winOption[1];
    let id3 = winOption[2];
    let cell1 = document.getElementById(id1);
    let cell2 = document.getElementById(id2);
    let cell3 = document.getElementById(id3);
    let back1 = cell1.querySelector(".back");
    let back2 = cell2.querySelector(".back");
    let back3 = cell3.querySelector(".back");
    if (
      back1.innerHTML == cross &&
      back2.innerHTML == cross &&
      back3.innerHTML == cross
    ) {
      youWin();
      break;
    } else if (
      back1.innerHTML == circle &&
      back2.innerHTML == circle &&
      back3.innerHTML == circle
    ) {
      youWin();
      break;
    }
  }
}

function youWin() {
  let winner = document.querySelector(".winner__name");
  if (currentPlayer == 1) {
    winner.innerHTML = "крестиками";
  } else {
    winner.innerHTML = "ноликами";
  }
  modalwrapper.classList.add("active");
  modalClose();
}

// winPosition.forEach(function(winOption){

// })

function modalClose() {
  let closeBtn = document.querySelector(".modal__btn");
  closeBtn.addEventListener("click", function () {
    modalwrapper.classList.remove("active");
  });
}

// анимация победы
gsap.registerPlugin(ScrollTrigger);

gsap.from(".block__1", {
  duration: 1,
  y: "-100%",
  scrollTrigger: ".modal__btn",
});
