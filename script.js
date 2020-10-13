"use strict";

window.addEventListener("load", start);

const introScreen = document.querySelector("#intro");
const startScreen = document.querySelector("#startscreen");
const menuScreen = document.querySelector("#mainmenu");

function start() {
  document.querySelector("#startbutton").addEventListener("click", startClick);

  document.querySelector(".klikstartsound").play();
}

function startClick() {
  startScreen.classList.add("hide");
  introScreen.classList.remove("hide");

  // play intro sound
  document.querySelector(".introsound").play();
}
