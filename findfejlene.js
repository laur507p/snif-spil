"use strict";

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
