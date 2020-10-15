"use strict";

// tjekker om light medaljen er true eller false
// OBS skulle måske laves om til session storage så at den resetter når man lukker vinduet
const lightMedal = localStorage.getItem("lightMedal");
const heatMedal = localStorage.getItem("heatMedal");
const waterMedal = localStorage.getItem("waterMedal");
const elMedal = localStorage.getItem("elMedal");

if (lightMedal === "true") {
    document.querySelector("#light-icon").classList.remove("grayscale");
   
  }
  if (heatMedal === "true") {
    document.querySelector("#heat-icon").classList.remove("grayscale");

  }
  if (waterMedal === "true") {
    document.querySelector("#water-icon").classList.remove("grayscale");

  }
  if (elMedal === "true") {
    document.querySelector("#el-icon").classList.remove("grayscale");
  }


  if (lightMedal === "false") {
    document.querySelector("#light-icon").classList.add("grayscale");
   
  }
  if (heatMedal === "false") {
    document.querySelector("#heat-icon").classList.add("grayscale");

  }
  if (waterMedal === "false") {
    document.querySelector("#water-icon").classList.add("grayscale");

  }
  if (elMedal === "false") {
    document.querySelector("#el-icon").classList.add("grayscale");
  }

if (elMedal === "true" && waterMedal === "true" && heatMedal === "true" && lightMedal === "true") {
    window.location.href = "final.html";
  }

// tjekke om alle er true og vise rigtigt!!

window.addEventListener("load", start);

function start() {
    document.querySelector(".intro-sound").play();
    document.querySelector(".bg-music").play();
    document.querySelector(".bg-music").volume = 0.1;
    
    if (elMedal === "true" || waterMedal === "true" || heatMedal === "true" || lightMedal === "true") {
        document.querySelector(".intro-sound").pause();
      }
}
