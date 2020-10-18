"use strict";

// tjek hvilke medals er vundet
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

// when start button is pressed
let lightChainPoints = 0;
let whackTimeout;
let energy = 0;

window.addEventListener("load", start);

function start() {
  startSnifIntroduction();
  // document.querySelector(".intro-lightchain").play();
  document.querySelector(".bg-music").play();

  document.querySelector(".bg-music").volume = 0.1;

  document.querySelector(".intro-lightchain").addEventListener("ended", startWhackamole);
}

function startWhackamole() {
  console.log("start");

  // call a random lightbulb
  whackTimeout = setTimeout(randomLightBulbs, 500);

  const bulbs = document.querySelectorAll(".bulb");

  bulbs.forEach((bulb) => {
    bulb.addEventListener("click", clickBulb);
  });
}

function randomLightBulbs() {
  const colors = ["#ACED58", "#FFE966", "#FFA180", "#71E2D0", "#FFBCBA", "#A9A9FC"];
  const randomcolor = colors[Math.floor(Math.random() * colors.length)];
  const bulbs = document.querySelectorAll(".bulb");
  const randomBulb = bulbs[Math.floor(Math.random() * bulbs.length)];
  const sound = document.querySelector(".ding-sound");

  // Bulbs start lighting up (randomly) and give them a random color
  if (randomBulb.classList.contains("coloredbulb")) {
    console.log("bulb already has color");
  } else {
    console.log("add color");
    randomBulb.querySelector(".bulb-bg").setAttribute("fill", randomcolor);
    randomBulb.querySelector(".bulb-bg").setAttribute("opacity", "1");
    sound.currentTime = 0;
    sound.volume = 0.1;
    sound.play();

    // check which color so that the right color can be set for highlights
    if (randomcolor === "#FFA180") {
      randomBulb.querySelectorAll(".highlight").forEach((highlight) => {
        highlight.setAttribute("fill", "#FFBFA9");
      });
    } else if (randomcolor === "#71E2D0") {
      randomBulb.querySelectorAll(".highlight").forEach((highlight) => {
        highlight.setAttribute("fill", "#BBFFEF");
      });
    } else if (randomcolor === "#FFE966") {
      randomBulb.querySelectorAll(".highlight").forEach((highlight) => {
        highlight.setAttribute("fill", "#FFF8A4");
      });
    } else if (randomcolor === "#ACED58") {
      randomBulb.querySelectorAll(".highlight").forEach((highlight) => {
        highlight.setAttribute("fill", "#C4FF78");
      });
    } else if (randomcolor === "#FFBCBA") {
      randomBulb.querySelectorAll(".highlight").forEach((highlight) => {
        highlight.setAttribute("fill", "#FFD9DB");
      });
    } else if (randomcolor === "#A9A9FC") {
      randomBulb.querySelectorAll(".highlight").forEach((highlight) => {
        highlight.setAttribute("fill", "#CCCCFF");
      });
    }

    randomBulb.classList.add("coloredbulb");
  }

  whackTimeout = setTimeout(randomLightBulbs, 1200);
}

function clickBulb() {
  console.log("clickbulb");

  // If a lit bulb is clicked, you get a point
  if (this.classList.contains("coloredbulb")) {
    this.classList.remove("coloredbulb");

    // remove background color and set to grey
    this.querySelector(".bulb-bg").setAttribute("fill", "#C4B9B1");
    this.querySelector(".bulb-bg").setAttribute("opacity", "0.8");

    // removes higlights and sets correct fill
    const highlights = this.querySelectorAll(".highlight");
    highlights[0].setAttribute("fill", "none");
    highlights[1].setAttribute("fill", "none");
    highlights[2].setAttribute("fill", "#E2D8D0");
    highlights[3].setAttribute("fill", "#E2D8D0");

    // points up
    lightChainPoints++;
    energy += 25;
    console.log(energy);
    document.querySelector(".fill").setAttribute("width", energy);
  }

  // When the progress bar is full, you win
  if (lightChainPoints === 20) {
    // remove click event listeners from bulb
    const bulbs = document.querySelectorAll(".bulb");
    bulbs.forEach((bulb) => {
      bulb.removeEventListener("click", clickBulb);
    });

    // calls end function
    whackAMoleEnd();
  }
}

function whackAMoleEnd() {
  console.log("game over");
  if (lightMedal === "false") {
    snifStartTalking();
    document.querySelector(".level-complete").play();
    document.querySelector(".level-complete").addEventListener("ended", snifStopTalking);

    // You receive the light medal
    document.querySelector(".light-placeholder").classList.add("icon-hide");
    document.querySelector(".light-icon").classList.remove("hide");
    document.querySelector(".light-icon").classList.add("icon-show");

    // set localstorage
    localStorage.setItem("lightMedal", "true");

    document.querySelector(".level-complete").addEventListener("ended", backToMenu);
  }

  clearTimeout(whackTimeout);
}

function backToMenu() {
  window.location.href = "mainmenu.html";
}

function startSnifIntroduction() {
  console.log("startSnifIntroduction");
  document.querySelector("#snif_container").classList.add("rotate");
  snifStartTalking();
  //   document.querySelector(".mouth").classList.add("talk");
  document.querySelector("#taleboble_container").classList.add("scaleUp");
  document.querySelector(".taleboble").classList.add("pulse-small");
  document.querySelector(".intro-lightchain").play();
  document.querySelector(".intro-lightchain").addEventListener("ended", endSnifIntroduction);
}

function endSnifIntroduction() {
  console.log("endSnifIntroduction");
  //   document.querySelector("#snif_container").classList.remove("rotate");
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
