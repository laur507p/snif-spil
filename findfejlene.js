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

function start() {
  const fejl = document.querySelectorAll(".fejl");

  fejl.forEach((elm) => {
    elm.addEventListener("click", clickFejl);
  });
}

function clickFejl() {
  console.log("findfejl");
  if (this.classList.contains("fundet")) {
    console.log("den er allerede fundet");
  } else {
    console.log("du fandt en fejl");
    this.classList.add("fundet");
    this.style.backgroundColor = "blue";
  }
}
