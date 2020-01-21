const firstColor = "rgb(237, 237, 238)";
const secondColor = "rgb(111, 181, 206)";
const thirdColor = "rgb(44, 138, 182)";
const fourthColor = "#176087";
const background1 = "rgb(19, 19, 34)";
const background2 = "rgb(14, 14, 27)";
const background3 = "rgb(87, 87, 99)";

const assets = [
  '/static/main/docs/iML1515-Map_deoC.json',
  '/static/main/docs/fluxes_pFBA.json'
];

Promise.all(assets.map(url => fetch(url).then(resp => resp.json())))
  .then(data => plotEscher(data));

function plotEscher(data) {

  const options = {
    // Just show the zoom buttons
    menu: 'zoom',
    // use the smooth pan and zoom option
    use_3d_transform: true,
    // No editing in this map
    enable_editing: false,
    // No keyboard shortcuts
    enable_keys: false,
    // No tooltips
    enable_tooltips: false,
    // reaction data
    reaction_data: data[1],
    // hide_secondary_metabolites: true,
    reaction_scale: [
      { type: "min", color: background3, size: 10 },
      { type: "max", color: secondColor, size: 30 },
      // { type: "max", color: firstColor, size: 20 },
    ],
    reaction_compare_style: "log2_fold"

  };

  const b = escher.Builder(data[0], null, null, escher.libs.d3_select('#escher-map'), options);
  console.log(b.settings.get("reaction_scale"));

}