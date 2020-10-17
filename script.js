"use strict";

window.addEventListener("load", start);

const introScreen = document.querySelector("#intro");
const startScreen = document.querySelector("#startscreen");
const menuScreen = document.querySelector("#mainmenu");

localStorage.setItem("lightMedal", "false");
localStorage.setItem("heatMedal", "false");
localStorage.setItem("waterMedal", "false");
localStorage.setItem("elMedal", "false");

function start() {
  document.querySelector("#startbutton").addEventListener("click", startClick);

  document.querySelector(".klikstartsound").play();
}

function startClick() {
  startScreen.classList.add("hide");
  introScreen.classList.remove("hide");
  document.querySelector(".klikstartsound").pause();

  document.querySelector(".bg-music").play();
  document.querySelector(".bg-music").volume = 0.2;

  // play intro sound
  document.querySelector(".introsound").play();

  document.querySelector("#startcreen_mouth").classList.add("talk");
  document.querySelector(".introsound").addEventListener("ended", snifStopTalking);
  document.querySelector("#startscreen_taleboble").classList.add("scaleUpStartScreen");
}

function snifStopTalking() {
  console.log("snifStopTalking");
  document.querySelector("#startcreen_mouth").classList.remove("talk");
  document.querySelector("#startscreen_taleboble").classList.remove("scaleUpStartScreen");
  document.querySelector("#startscreen_taleboble").classList.add("scaleDownStartScreen");
}
