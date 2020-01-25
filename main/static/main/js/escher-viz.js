const firstColor = "rgb(237, 237, 238)";
const secondColor = "rgb(111, 181, 206)";
const thirdColor = "rgb(44, 138, 182)";
const fourthColor = "#176087";
const background1 = "rgb(19, 19, 34)";
const background2 = "rgb(14, 14, 27)";
const background3 = "rgb(87, 87, 99)";

let escherBuilder;
let counterFluxes = 0;
let fluxes;


const fluxesURL = [
  "/static/main/science/modelling/fluxes_pFBA_bm-wt.json",
  "/static/main/science/modelling/fluxes_pFBA_bm-pkt.json",
  "/static/main/science/modelling/fluxes_pFBA_acetone-wt.json",
  "/static/main/science/modelling/fluxes_pFBA_acetone-pkt.json",
];

const modelURL = "/static/main/science/modelling/iML1515_PKT.json";

const fluxesTitle = [
  "Maximize Biomass Production<br>Wild-Type Strain",
  "Maximize Biomass Production<br>PKT Strain",
  "Maximize Acetone Production<br>Wild-Type Strain",
  "Maximize Acetone Production<br>PKT Strain",
]

const mapURL = '/static/main/science/modelling/iML1515-Map_EM.json';

// Set Initial Title
const initialTitle = "Central Metabolism for Escherichia Coli<br>Model iML1515";
const escherTitleElem = document.querySelector("#escher-title");
escherTitleElem.innerHTML = initialTitle;


plotEscher();

function animateEscher() {
  let flux = null;
  counterFluxes = (counterFluxes + 1) % (fluxes.length + 1);

  if (counterFluxes !== fluxes.length) {
    escherTitleElem.innerHTML = fluxesTitle[counterFluxes];
    flux = fluxes[counterFluxes];
  }

  else {
    escherTitleElem.innerHTML= initialTitle;
  }
  escherBuilder.set_reaction_data(flux);

}


async function plotEscher() {
  const map = await fetch(mapURL).then(resp => resp.json());
  fluxes = await Promise.all(fluxesURL.map(url => fetch(url).then(resp=>resp.json())));  

  const options = {
    // Just show the zoom buttons
    menu: "all",
    reaction_scale: [
      { type: "min",  color: background3, size: 10},
      { type: "mean", color: secondColor, size: 20},
      { type: "max", color: firstColor, size: 30},
    ],
    reaction_compare_style: "log2_fold",
    reaction_no_data_color: background3,
    scroll_behavior: "zoom",
    never_ask_before_quit: true,
  };

  // Initialize escher
  escherBuilder = escher.Builder(map, null, null, escher.libs.d3_select('#escher-map'), options);
  
  // launch animation
  setInterval(animateEscher, 3000);

}