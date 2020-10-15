"use strict";

document.addEventListener("DOMContentLoaded", loadSVG);

let resultDisplay = document.querySelector("#result");
let cardHasFlipped = false;

let firstChosenCard;
let secondChosenCard;
let cardsChosen = [];
let cardsMatched = [];
const cardsArray = [
  { name: "#image_01", id: 1 },
  { name: "#image_01", id: 1 },
  { name: "#image_02", id: 2 },
  { name: "#image_02", id: 2 },
  { name: "#image_03", id: 3 },
  { name: "#image_03", id: 3 },
  { name: "#image_04", id: 4 },
  { name: "#image_04", id: 4 },
  { name: "#image_05", id: 5 },
  { name: "#image_05", id: 5 },
];

async function loadSVG() {
  console.log("loadSVG");
  let response = await fetch("images/bathroom_background.svg");
  let response2 = await fetch("images/bathroom_cards_01.svg");

  let mySVGData = await response.text();
  let mySVGData2 = await response2.text();

  document.querySelector("#board").innerHTML = mySVGData;
  document.querySelector("#images").innerHTML = mySVGData2;

  start();
  console.log(cardsArray);
}

function start() {
  console.log("start");

  document.querySelectorAll(".tile").forEach((tile) => tile.addEventListener("click", flipCard));
  randomizeCards();
  displayCards();
}

function displayCards() {
  console.log("displayCards");
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach((tile, index) => {
    tile.querySelector("use").setAttribute("href", cardsArray[index].name);
    tile.dataset.id = cardsArray[index].id;
  });
}

function flipCard() {
  console.log("flipCard");

  this.classList.add("flip");

  if (!cardHasFlipped) {
    cardHasFlipped = true;
    firstChosenCard = this;
    console.log("firstChosenCard", this);
    //Remove eventlistener of first chosen card, to make sure you can't click the same card twice
    this.removeEventListener("click", flipCard);
    return;
  }

  secondChosenCard = this;

  //Remove eventlistener of second chosen card, to make sure you can't click the same card twice
  this.removeEventListener("click", flipCard);
  cardHasFlipped = false;

  //Pushing the chosen cards to cardsChosen array
  cardsChosen.push(firstChosenCard, secondChosenCard);
  console.log("firstChosenCard", firstChosenCard);
  console.log("secondChosenCard", secondChosenCard);

  //If two cards are chosen, check if they match
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
    //Locking the board when two cards are chosen
    lockBoard();
  }
}

function checkForMatch() {
  console.log("checkForMatch");
  //Checking if cards match
  if (firstChosenCard.dataset.id === secondChosenCard.dataset.id) {
    alert("Du har fundet et match");
    //If cards match, push to cards matched cards array, to keep count of how many matches have been made
    cardsMatched.push(cardsChosen);
    console.log("cards matched", cardsMatched);
    //Disableing cards if they match
    disableCards();
  } else {
    //If they don't match, unflip the cards
    setTimeout(unflipCards, 500);
  }
  //Emptying the cards chosen array after checking for match
  cardsChosen = [];

  //Updating the score
  updateScore();
}

function disableCards() {
  console.log("disableCards");

  firstChosenCard.removeEventListener("click", flipCard);
  secondChosenCard.removeEventListener("click", flipCard);
  console.log("disable cards firstChosenCard", firstChosenCard);

  //Unlocking board
  unlockBoard();
}

function unflipCards() {
  console.log("unflipCards");
  firstChosenCard.classList.remove("flip");
  secondChosenCard.classList.remove("flip");
  firstChosenCard.addEventListener("click", flipCard);
  secondChosenCard.addEventListener("click", flipCard);
  //Unlocking board
  unlockBoard();
}

function randomizeCards() {
  console.log("randomizeCards");

  cardsArray.sort(() => Math.random() - 0.5);
}

function updateScore() {
  console.log("updateScore");
  resultDisplay.textContent = cardsMatched.length;
  if (cardsMatched.length === 5) {
    resultDisplay.textContent = "Tillykke, du har vundet spillet!";
  }
}

function lockBoard() {
  console.log("lockBoard");
  document.querySelectorAll(".tile").forEach((tile) => tile.removeEventListener("click", flipCard));
}

function unlockBoard() {
  console.log("unlockBoard");
  document.querySelectorAll(".tile").forEach((tile) => tile.addEventListener("click", flipCard));
}
