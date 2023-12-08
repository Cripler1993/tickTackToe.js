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

let currentPlayer = 1; //1 - x; 2 - o
let gameEnd = false;
let cross = `<span class="material-symbols-outlined"> close </span>`;
let circle = `<span class="material-symbols-outlined"> circle </span>`;

let cards = document.querySelectorAll(".card");

cards.forEach(function (elem) {
  elem.addEventListener("click", makeMove);
});

function makeMove(event) {
  let card = event.target;
  let container = card.querySelector(".back");
  if (!container.innerHTML) {
    if (currentPlayer == 1) {
      container.innerHTML = cross;
      currentPlayer = 2;
    } else {
      container.innerHTML = circle;
      currentPlayer = 1;
    }
    card.classList.add("flip");
  }
}
