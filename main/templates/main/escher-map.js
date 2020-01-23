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
const escherTitleElem = document.querySelector("#escher-title");

const fluxesURL = [
  "/main/static/main/science/fluxes_pFBA_bm-wt.json",
  "/main/static/main/science/fluxes_pFBA_bm-pkt.json",
  "/main/static/main/science/fluxes_pFBA_acetone-wt.json",
  "/main/static/main/science/fluxes_pFBA_acetone-pkt.json",
];

const fluxesTitle = [
  "Maximize Biomass Production Wild-Type Strain",
  "Maximize Biomass Production PKT Strain",
  "Maximize Acetone Production Wild-Type Strain",
  "Maximize Acetone Production PKT Strain",
]

const mapURL = '/main/static/main/science/iML1515-Map_EM.json';


plotEscher();

function animateEscher() {
  let title = "Central Metabolism for Escherichia Coli", flux = null;
  counterFluxes = (counterFluxes + 1) % (fluxes.length + 1);

  if (counterFluxes !== fluxes.length) {
    title = fluxesTitle[counterFluxes];
    flux = fluxes[counterFluxes];
  }

  escherBuilder.set_reaction_data(flux);
  escherTitleElem.textContent = title;
}


// function launchAnimation()

async function plotEscher() {
  const map = await fetch(mapURL).then(resp => resp.json());
  
  fluxes = await Promise.all(fluxesURL.map(url => fetch(url).then(resp=>resp.json())));  

  const options = {
    // Just show the zoom buttons
    menu: "none",
    // use the smooth pan and zoom option
    use_3d_transform: true,
    // No editing in this map
    enable_editing: false,
    // No keyboard shortcuts
    enable_keys: false,
    // No tooltips
    enable_tooltips: false,
    full_screen_button: true,
    // reaction data
    // reaction_data: data[1],
    // hide_secondary_metabolites: true,
    reaction_scale: [
      { type: "min",  color: background3, size: 10},
      { type: "mean", color: secondColor, size: 20},
      { type: "max", color: firstColor, size: 30},
    ],
    reaction_compare_style: "log2_fold",
    reaction_no_data_color: background3,
    scroll_behavior: "zoom",
  };

  // Initialize escher
  escherBuilder = escher.Builder(map, null, null, escher.libs.d3_select('#escher-map'), options);
  
  // launch animation
  setInterval(animateEscher, 2000);

}