"use strict";

let cell = document.querySelectorAll(".cell");
let box = document.querySelector(".box");
let secondScreen = document.querySelector(".secondScreen");
let message = document.querySelector(".msg");
let reset = document.querySelector(".again");
let audio = new Audio("ting.mp3");

secondScreen.classList.add("remove");

let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = "o";

cell.forEach((element) => {
  element.addEventListener(
    "click",
    () => {
      audio.play();

      changeTurn();

      if (turn === "x") {
        element.classList.add("x");
        element.classList.remove("o");
        box.classList.remove("x");
        box.classList.add("o");
      } else {
        element.classList.add("o");
        element.classList.remove("x");
        box.classList.remove("o");
        box.classList.add("x");
      }

      if (checkWin(turn)) {

        box.classList.add("remove");
        secondScreen.classList.add("active1");
        secondScreen.classList.remove("remove");
        message.innerText = turn + " wins";
      } else if (checkDraw()) {
        console.log("Draw");
        box.classList.add("remove");
        secondScreen.classList.add("active1");
        secondScreen.classList.remove("remove");

        message.innerText =" Draw";
      }
    },
    { once: true }
  );
});

reset.addEventListener("click", () => {
  turn = "o";
  box.classList.add("x");
  box.classList.remove("o");
  box.classList.add("active2");
  box.classList.remove("remove");
  secondScreen.classList.add("remove");

  cell.forEach((element) => {
    element.classList.remove("x");
    element.classList.remove("o");
  });
});

let changeTurn = () => {
  turn = turn === "x" ? "o" : "x";
  return turn;
};

let checkWin = () => {
  return win.some((combination) => {
    return combination.every((index) => {
      return cell[index].classList.contains(turn);
    });
  });
};

let checkDraw = () => {
  return [...cell].every((ele) => {
    return ele.classList.contains("x") || ele.classList.contains("o");
  });
};
