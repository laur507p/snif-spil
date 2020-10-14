"use strict";

const img_good = document.querySelector(".img_good");
const img_bad = document.querySelector(".img_bad");

let points = 0;

const xPositions = ["1012", "294"];

const cards = [
  {
    good: "assets/kitchen_cards_01.svg",
    bad: "assets/kitchen_cards_02.svg",
  },
  {
    good: "assets/kitchen_cards_03.svg",
    bad: "assets/kitchen_cards_04.svg",
  },
  {
    good: "assets/kitchen_cards_05.svg",
    bad: "assets/kitchen_cards_06.svg",
  },
  {
    good: "assets/kitchen_cards_07.svg",
    bad: "assets/kitchen_cards_08.svg",
  },
  {
    good: "assets/kitchen_cards_09.svg",
    bad: "assets/kitchen_cards_10.svg",
  },
];

let randomNumber = Math.floor(Math.random() * cards.length);
let randomNumberX = Math.floor(Math.random() * xPositions.length);

window.addEventListener("load", start);

async function start() {
  createCards();
  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener("click", checkRightorWrong);
  });
}

function checkRightorWrong(clickedCard) {
  if (this === img_good) {
    points++;
    // Sniff tells you you are right
  } else {
    // Sniff tells you you are wrong
  }
  document.querySelector(".points").textContent = points;
  document.querySelector("#curtain_x5F_roll_x5F_down").classList.add("curtain_rod_roll");
  document.querySelector(".curtain_roll_item").classList.add("curtain_roll");
  document.querySelector("#curtain_x5F_roll_x5F_down").addEventListener("animationend", addAnimationRollUp);
  checkPoints();
}

function addAnimationRollUp() {
  document.querySelector("#curtain_x5F_roll_x5F_down").removeEventListener("animationend", addAnimationRollUp);
  document.querySelector("#curtain_x5F_roll_x5F_down").classList.remove("curtain_rod_roll");
  document.querySelector(".curtain_roll_item").classList.remove("curtain_roll");
  createCards();
  addCurtainUp();
}

function addCurtainUp() {
  document.querySelector("#curtain_x5F_roll_x5F_down").classList.add("curtain_rod_roll_up");
  document.querySelector(".curtain_roll_item").classList.add("curtain_roll_up");
}

function createCards() {
  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener("click", checkRightorWrong);
  });

  const rc = randomizedCard();

  console.log(rc);
  img_good.setAttribute("href", rc.good);
  img_bad.setAttribute("href", rc.bad);

  cards.splice(rc, 1);

  return rc;
}

function randomizedCard() {
  let returnCard = cards[randomNumber];
  console.log(cards);

  return returnCard;
}

function randomizedXPosition() {
  let returnCard = xPositions[randomNumber];

  return returnCard;
}

function checkPoints() {
  if (cards.length === 0) {
    console.log("stop");
    document.querySelector(".level_complete").style.visibility = "visible";
  }
}

//  Kode jeg måske behøver??

// function createCards() {
//   const rc = randomizedCard();
//   const img_good = document.querySelector(".img_good");

//   console.log(rc);

//   img_good.classList.add("card");
//   img_good.style.width = "10vw";
//   img_good.style.height = "20vw";
//   img_good.style.position = "relative";
//   img_good.src = rc.good;

//   document.querySelector("#cards").append(img_good);

//   const img_bad = document.querySelector(".img_bad");

//   img_bad.classList.add("card");
//   img_bad.style.width = "10vw";
//   img_bad.style.height = "20vw";
//   img_bad.style.position = "relative";
//   img_bad.src = rc.bad;

//   document.querySelector("#cards").append(img_bad);
// }
