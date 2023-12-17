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
let turnName = document.querySelector("#turn__name");

let modalwrapper = document.querySelector(".modal__wrapper");
let winner = document.querySelector(".winner__name");
let closeBtn = document.querySelector(".modal__btn");

// в переменную player1 с помощью метода prompt присваиваем имя игрока или если false, то по умолчанию "игрок 1"
// в переменную player2 с помощью метода prompt присваиваем имя игрока или если false, то по умолчанию "игрок 2"
// во внутреннее содержимое документа у playerName 1 и 2 присваиваем значение переменной player 1 и 2
// переменной currentPlayer присваиваем значение 1
// открываем инструкцию if где если переменная currentPlayer == 1, то во внутреннее содержимое документа у turnName
// присваиваем значение из переменной player1 (показывает на экране кто ходит), в другом случае из player2

let player1 = prompt("Введите имя первого игрока?") || "игрок 1";
let player2 = prompt("Введите имя второго игрока?") || "игрок 2";
playerName1.innerHTML = player1;
playerName2.innerHTML = player2;
let currentPlayer = 1; //1 - x; 2 - o
if (currentPlayer == 1) {
  turnName.innerHTML = player1;
} else {
  turnName.innerHTML = player2;
}

// переменная gameEnd имеет изначальное значение false

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

// при клике на closeBtn (крестик) снимаем активный класс у переменной modalWrapper
//  и добавляем его у restartBtn

closeBtn.addEventListener("click", function () {
  modalwrapper.classList.remove("active");
  restartBtn.classList.add("active");
});

// добавляем переменной restartBtn обработчик события и параметром функцию restartGame

restartBtn.addEventListener("click", restartGame);

//локальную переменную card определяем как цель клика
// определяем переменную container как элемент back из html
// если переменная контейнер пустая и переменная gameEnd == false
// и если переменная currentPlayer равна 1, то добавляем в html переменной container переменную cross(изображение крестика)
// используем функцию checkWin
// и переменной currentPlayer присваиваем значение 2
// внутреннему значению документа у переменной turnName присваиваем значение из переменной player 2
// в другом случае добавляем в html переменной container переменную circle(круг)
// используем функцию checkWin
// и переменной currentPlayer присваиваем значение 1
// внутреннему значению документа у переменной turnName присваиваем значение из переменной player 1
// добавялем переменной card активный класс flip
// добавляем функцию checkDraw

function makeMove(event) {
  let card = event.target;
  let container = card.querySelector(".back");
  if (!container.innerHTML && !gameEnd) {
    if (currentPlayer == 1) {
      container.innerHTML = cross;
      checkWin();
      currentPlayer = 2;
      turnName.innerHTML = player2;
    } else {
      container.innerHTML = circle;
      checkWin();
      currentPlayer = 1;
      turnName.innerHTML = player1;
    }
    card.classList.add("flip");
    checkDraw();
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
    console.log(cell1);
    let back1 = cell1.querySelector(".back");
    let back2 = cell2.querySelector(".back");
    let back3 = cell3.querySelector(".back");
    if (
      back1.innerHTML == cross &&
      back2.innerHTML == cross &&
      back3.innerHTML == cross
    ) {
      cell1.classList.add("shake");
      cell2.classList.add("shake");
      cell3.classList.add("shake");
      youWin();
      break;
    } else if (
      back1.innerHTML == circle &&
      back2.innerHTML == circle &&
      back3.innerHTML == circle
    ) {
      cell1.classList.add("shake");
      cell2.classList.add("shake");
      cell3.classList.add("shake");
      youWin();
      break;
    }
  }
}
// winPosition.forEach(function(winOption){

// })

// объявляем функцию checkDraw на проверку ничьей
// в переменную присваиваем все элементы у которых есть класс flip
// в переменую cardCount присваиваем значение длины массива flipCards
// если cardCount == 9, то во внутренний текст документа у переменной winner будет присвоено "дружбой"
// во внутренний текст документа у переменной drawScore  заносим приведение этого же текста к числу и плюсуем единицу
// добавляем активный класс модальному окну
// переменной gameEnd присваиваем true (для блокировки поля)

function checkDraw() {
  let flipCards = document.querySelectorAll(".flip");
  let cardCount = flipCards.length;
  if (cardCount == 9) {
    winner.innerHTML = "дружбой";
    drawScore.innerHTML = Number(drawScore.innerHTML) + 1;
    modalwrapper.classList.add("active");
    gameEnd = true;
  }
}

// объявляем функцию youWin
// в которой если переменная currentPlayer == 1, то
// во внутренний текст документ переменной winner заносим значение переменной player 1
// во внутренний текст документа у переменной playerScore1 заносим приведение этого же текста к числу и плюсуем единицу
// в другом случае все то же самое, но для второго игрока
// применяем функцию setTimeout и осуществляем задержку добавления модальному окну активного класса в 1500 мс
// переменной gameEnd присваиваем значение true

function youWin() {
  if (currentPlayer == 1) {
    winner.innerHTML = player1;
    playerScore1.innerHTML = Number(playerScore1.innerHTML) + 1;
  } else {
    winner.innerHTML = player2;
    playerScore2.innerHTML = Number(playerScore2.innerHTML) + 1;
  }
  setTimeout(function () {
    modalwrapper.classList.add("active");
  }, 1500);
  gameEnd = true;
}

// объявляем функцию restartGame
// присваиваем переменной currentPlayer значение 1
// переменной gameEnd присваиваем значение true
// в цикле для всех переменных card убираем класс flip и shake
// опускаемся с помощью querySelector до элемента с классом бэк и заносим его значение в переменную container
// далее внутреннее содержимое документа у переменной container делаем пустым
// у кнопки перезагрузки убираем активный класс

function restartGame() {
  currentPlayer = 1;
  gameEnd = false;
  cards.forEach(function (elem) {
    elem.classList.remove("flip", "shake");
    let container = elem.querySelector(".back");
    container.innerHTML = "";
  });
  restartBtn.classList.remove("active");
}
