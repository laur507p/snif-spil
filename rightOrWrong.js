"use strict";

const img_good = document.querySelector(".img_good");
const img_bad = document.querySelector(".img_bad");

let points = 0;
let counter = 0;

const xPositions = ["1012", "294"];

const cards = [
  {
    good: "assets/kitchen_cards_01.svg",
    bad: "assets/kitchen_cards_02.svg",
  },
  {
    good: "assets/kitchen_cards_04.svg",
    bad: "assets/kitchen_cards_03.svg",
  },
  {
    good: "assets/kitchen_cards_06.svg",
    bad: "assets/kitchen_cards_05.svg",
  },
  {
    good: "assets/kitchen_cards_09.svg",
    bad: "assets/kitchen_cards_10.svg",
  },
  {
    good: "assets/kitchen_cards_07.svg",
    bad: "assets/kitchen_cards_08.svg",
  },
];

let randomNumberX = Math.floor(Math.random() * xPositions.length);

// siger at lightmedaljen er false til at starte med

const lightMedal = localStorage.getItem("lightMedal");
const heatMedal = localStorage.getItem("heatMedal");
const waterMedal = localStorage.getItem("waterMedal");
const elMedal = localStorage.getItem("elMedal");

if (lightMedal === "true") {
  document.querySelector(".light-placeholder").classList.add("hide");
  document.querySelector(".light-icon").classList.remove("hide");
}
if (heatMedal === "true") {
  document.querySelector(".heat-placeholder").classList.add("hide");
  document.querySelector(".heat-icon").classList.remove("hide");
}
if (waterMedal === "true") {
  document.querySelector(".water-placeholder").classList.add("hide");
  document.querySelector(".water-icon").classList.remove("hide");
}
if (elMedal === "true") {
  document.querySelector(".el-placeholder").classList.add("hide");
  document.querySelector(".el-icon").classList.remove("hide");
}

window.addEventListener("load", start);

async function start() {
  document.querySelector(".bg-music").play();
  startSnifIntroduction();
  document.querySelector(".bg-music").volume = 0.1;

  createCards();

  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener("click", checkRightorWrong);
  });
}

function removeBubble() {
  document.querySelector(".taleboble").classList.add("hide");
}

function checkRightorWrong(clickedCard) {
  document.querySelector(".right_or_wrong_introduction").pause();
  console.log("test");
  counter++;
  if (this === img_good) {
    points++;
    // Sniff tells you you are right
    document.querySelector(".right_or_wrong_right").currentTime = 0;
    document.querySelector(".right_or_wrong_right").play();
    snifStartTalking();
    document.querySelector(".right_or_wrong_right").addEventListener("ended", snifStopTalking);
  } else {
    // Sniff tells you you are wrong
    document.querySelector(".right_or_wrong_wrong").currentTime = 0;
    document.querySelector(".right_or_wrong_wrong").play();
    snifStartTalking();
    document.querySelector(".right_or_wrong_wrong").addEventListener("ended", snifStopTalking);
  }

  //
  document.querySelector("#curtain_x5F_roll_x5F_down").classList.remove("curtain_rod_roll_up");
  document.querySelector(".curtain_roll_item").classList.remove("curtain_roll_up");

  document.querySelector("#curtain_x5F_roll_x5F_down").classList.add("curtain_rod_roll");
  document.querySelector(".curtain_roll_item").classList.add("curtain_roll");
  document.querySelector("#curtain_x5F_roll_x5F_down").addEventListener("animationend", addAnimationRollUp);
  checkPoints();
  removeBubble();
}

function addAnimationRollUp() {
  if (counter < 5) {
    console.log("if setning");
    document.querySelector("#curtain_x5F_roll_x5F_down").removeEventListener("animationend", addAnimationRollUp);
    document.querySelector("#curtain_x5F_roll_x5F_down").classList.remove("curtain_rod_roll");
    document.querySelector(".curtain_roll_item").classList.remove("curtain_roll");
  }
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
  const indexRC = cards.indexOf(rc);
  const randomX = randomizedXPosition();

  console.log(rc);
  img_good.setAttribute("href", rc.good);
  img_bad.setAttribute("href", rc.bad);

  cards.splice(indexRC, 1);

  return rc;
}

function randomizedCard() {
  let randomNumber = Math.floor(Math.random() * cards.length);
  let returnCard = cards[randomNumber];
  console.log(randomNumber);

  return returnCard;
}

function randomizedXPosition() {
  let returnCard = xPositions[randomNumberX];

  return returnCard;
}

function checkPoints() {
  console.log(counter);
  if (counter === 5) {
    if (points > 4) {
      if (heatMedal === "false") {
        document.querySelector(".heat-placeholder").classList.add("icon-hide");
        document.querySelector(".heat-icon").classList.remove("hide");
        document.querySelector(".heat-icon").classList.add("icon-show");
        // set localstorage
        localStorage.setItem("heatMedal", "true");
      }
      console.log("won");
      document.querySelector(".right_or_wrong_right").pause();
      document.querySelector(".right_or_wrong_completed").play();
      document.querySelector(".right_or_wrong_completed").addEventListener("ended", backToMenu);
    } else {
      document.querySelector(".right_or_wrong_wrong").pause();
      document.querySelector(".right_or_wrong_right").pause();
      document.querySelector(".right_or_wrong_game_over").play();
      console.log("lost");
      document.querySelector(".right_or_wrong_game_over").addEventListener("ended", test);
    }
  }
}

function startSnifIntroduction() {
  console.log("startSnifIntroduction");
  document.querySelector("#snif_container").classList.add("rotate");
  snifStartTalking();
  //   document.querySelector(".mouth").classList.add("talk");
  document.querySelector("#taleboble_container").classList.add("scaleUp");
  document.querySelector(".taleboble").classList.add("pulse-small");
  document.querySelector(".right_or_wrong_introduction").play();
  document.querySelector(".right_or_wrong_introduction").addEventListener("ended", endSnifIntroduction);
}

function endSnifIntroduction() {
  console.log("endSnifIntroduction");
  //   document.querySelector("#snif_container").classList.remove("rotate");
  //   document.querySelector(".mouth").classList.remove("talk");
  snifStopTalking();
  document.querySelector("#taleboble_container").classList.remove("scaleUp");
  document.querySelector("#taleboble_container").classList.add("scaleDown");
}

function snifStartTalking() {
  document.querySelector(".mouth").classList.add("talk");
  console.log("startTalking");
}
function snifStopTalking() {
  document.querySelector(".mouth").classList.remove("talk");
  console.log("stopTalking");
}

function test() {
  location.reload();
}

function backToMenu() {
  console.log("backToMenu");
  window.location.href = "mainmenu.html";
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
