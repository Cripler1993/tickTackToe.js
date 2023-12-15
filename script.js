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
let playerName1 = document.querySelector("#player__name-1");
let playerName2 = document.querySelector("#player__name-2");
let playerScore1 = document.querySelector("#player__score-1");
let playerScore2 = document.querySelector("#player__score-2");
let drawScore = document.querySelector("#draw__score");
let restartBtn = document.querySelector(".restart__btn");

let modalwrapper = document.querySelector(".modal__wrapper");
let winner = document.querySelector(".winner__name");
let closeBtn = document.querySelector(".modal__btn");

let player1 = prompt("Введите имя первого игрока?");
let player2 = prompt("Введите имя второго игрока?");
playerName1.innerHTML = player1;
playerName2.innerHTML = player2;
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

closeBtn.addEventListener("click", function () {
  modalwrapper.classList.remove("active");
  restartBtn.classList.add("active");
});

restartBtn.addEventListener("click", restartGame);

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
  if (!container.innerHTML && !gameEnd) {
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

// объявляем функцию checkWin
// проходимся по массиву с помощью цикла for
// в переменную winOption присваиваем каждый элемент массива winPosition
// в переменные id 1, 2, 3 присваиваем цифры содержащиеся в подмассивах winOption
//
// в переменные back1, 2, 3 присваиваем элементы с классом back
// если внутренний html переменных back 1, 2, 3 равен cross, то запускаем функцию youWin и прерываем цикл
// для circle то же самое
function checkWin() {
  // const winPosition = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [3, 6, 9],
  //   [1, 5, 9],
  //   [3, 5, 7],
  // ];
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
// winPosition.forEach(function(winOption){

// })

function youWin() {
  if (currentPlayer == 1) {
    winner.innerHTML = player1;
    playerScore1.innerHTML = Number(playerScore1.innerHTML) + 1;
  } else {
    winner.innerHTML = player2;
    playerScore2.innerHTML = Number(playerScore2.innerHTML) + 1;
  }
  modalwrapper.classList.add("active");
  gameEnd = true;
}

function restartGame() {
  currentPlayer = 1;
  gameEnd = false;
  cards.forEach(function (elem) {
    elem.classList.remove("flip");
    let container = elem.querySelector(".back");
    container.innerHTML = "";
  });
  restartBtn.classList.remove("active");
}

// анимация победы
gsap.registerPlugin(ScrollTrigger);

gsap.from(".block__1", {
  duration: 1,
  y: "-100%",
  scrollTrigger: ".modal__btn",
});
