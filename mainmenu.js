"use strict";

// tjekker om light medaljen er true eller false
// OBS skulle måske laves om til session storage så at den resetter når man lukker vinduet
const lightMedal = localStorage.getItem("lightMedal");
const heatMedal = localStorage.getItem("heatMedal");
const waterMedal = localStorage.getItem("waterMedal");
const elMedal = localStorage.getItem("elMedal");

console.log(lightMedal);

// tjekke om alle er true og vise rigtigt!!
