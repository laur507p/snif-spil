"use strict";

// tjek hvilke medaljer er allerede vundet
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

const tv = document.querySelector("#tv");
const NSwitch = document.querySelector("#switch");
const lamp = document.querySelector("#lamp");
const playstation = document.querySelector("#playstation");
const computer = document.querySelector("#computer");

const tvOutline = document.querySelector(".tv-outline");
const switchOutline = document.querySelector(".switch-outline");
const lampOutline = document.querySelector(".lamp-outline");
const playstationOutline = document.querySelector(".playstation-outline");
const computerOutline = document.querySelector(".computer-outline");

const allObjects = [tv, NSwitch, lamp, playstation, computer];

const introAudio = document.querySelector(".intro-audio");
const rightAudio = document.querySelector(".right-audio");
const lvlComplAudio = document.querySelector(".lvl-complete-audio");

let points = 0;

function start() {
  console.log("start");

  startSnifIntroduction();

  document.querySelector(".bg-music").volume = 0.1;
  document.querySelector(".bg-music").play();

  document.querySelector(".tv-sound").volume = 1;
  document.querySelector(".tv-sound").play();

  allObjects.forEach((elm) => {
    elm.addEventListener("click", clickObject);
  });
}

function startSnifIntroduction() {
  console.log("startSnifIntroduction");
  document.querySelector("#snif_container").classList.add("rotate");
  snifStartTalking();
  //   document.querySelector(".mouth").classList.add("talk");
  document.querySelector("#taleboble_container").classList.add("scaleUp");
  document.querySelector(".taleboble").classList.add("pulse-small");
  introAudio.play();
  introAudio.addEventListener("ended", endSnifIntroduction);
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

function clickObject() {
  if (this.classList.contains("hasbeenclicked")) {
    console.log("alredyfound");
  } else {
    introAudio.pause();

    rightAudio.currentTime = 0;
    snifStartTalking();
    rightAudio.play();
    rightAudio.addEventListener("ended", snifStopTalking);

    this.classList.add("hasbeenclicked");

    points++;

    console.log("Object found");
    if (this === tv) {
      tvOutline.classList.remove("hide");
      document.querySelector(".tv-sound").pause();
      document.querySelector(".tv-light").setAttribute("fill", "#212121")
      document.querySelector(".tv-dark").setAttribute("fill", "#161616")
      document.querySelector(".tv-button").setAttribute("fill", "#FF0000")
    } else if (this === computer) {
      computerOutline.classList.remove("hide");
      document.querySelector(".computer-button").setAttribute("fill", "#FF0000")
      document.querySelector(".computer-light").setAttribute("fill", "#212121")
      document.querySelector(".computer-dark").setAttribute("fill", "#161616")

    } else if (this === NSwitch) {
      switchOutline.classList.remove("hide");
      document.querySelector(".switch-power").classList.add("hide")
      document.querySelector(".switch-light").setAttribute("fill", "#212121")
      document.querySelector(".switch-dark").setAttribute("fill", "#161616")

    } else if (this === playstation) {
      playstationOutline.classList.remove("hide");
      document.querySelector(".playstation-button").setAttribute("fill", "#FF0000")

    } else if (this === lamp) {
      lampOutline.classList.remove("hide");
      document.querySelector(".lamp-shadow").classList.add("hide");
    }
  }

  if (points === 5) {
    rightAudio.addEventListener("ended", levelComplete);
  }
}

function levelComplete() {
  console.log("level complete");

  if (elMedal === "false") {
    lvlComplAudio.play();
    snifStartTalking();
    lvlComplAudio.addEventListener("ended", snifStopTalking);
    document.querySelector(".el-placeholder").classList.add("icon-hide");
    document.querySelector(".el-icon").classList.remove("hide");
    document.querySelector(".el-icon").classList.add("icon-show");
    // set localstorage
    localStorage.setItem("elMedal", "true");

    lvlComplAudio.addEventListener("ended", backToMenu);

  }
}

function backToMenu() {
  window.location.href = "mainmenu.html";
}