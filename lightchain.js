"use strict";

// when start button is pressed
let lightChainPoints = 0;
let whackTimeout;
startWhackamole();

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

  console.log(randomBulb);

  // Bulbs start lighting up (randomly) and give them a random color
  if (randomBulb.classList.contains("coloredbulb")) {
    console.log("bulb already has color");
  } else {
    console.log("add color");
    randomBulb.querySelector(".bulb-bg").setAttribute("fill", randomcolor);
    randomBulb.querySelector(".bulb-bg").setAttribute("opacity", "1");
    sound.play();

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

  whackTimeout = setTimeout(randomLightBulbs, 2000);
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
  }

  // When the progress bar is full, you win
  if (lightChainPoints === 10) {
    whackAMoleEnd();
  }
}

function whackAMoleEnd() {
  console.log("game over");
  clearTimeout(whackTimeout);

  // You receive the light medal
}
