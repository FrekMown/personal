const sdfModels = {};
let molIds;
let dataSubstr;
const viewers = {};


drawMolecules();

function drawOneMolecule(m_id) {
  // Create div and insert it into #chem-container

  // Parent Element
  const parentElem = document.createElement("div");
  parentElem.classList.add("mol-element");
  parentElem.id = `mol-${m_id}`;

  // Info Element
  const nameElem = document.createElement("div");
  nameElem.classList.add("mol-name");
  m_id !== "substr" ?
    nameElem.innerHTML = `<strong>${m_id}</strong><br><em>${dataSubstr[m_id].name}</em>` :
    nameElem.innerHTML = `<strong>Objective<br>Substructure</strong>`;
  parentElem.append(nameElem);

  // Chem Element
  const ChemElem = document.createElement("div");
  ChemElem.classList.add("mol-container");
  ChemElem.id = `mol-${m_id}`;
  parentElem.append(ChemElem);

  // Insert Parent Element
  document.querySelector("#chem-container").append(parentElem);

  // Create 3DMoljs viewer
  const config = {
    backgroundColor: "rgb(19, 19, 34)",
  }

  // Creation of viewer and application of styles
  let viewer = $3Dmol.createViewer(`mol-${m_id}`, config);
  viewers[m_id] = viewer;
  viewer.addModel(sdfModels[m_id], "sdf");
  viewer.setStyle({}, { stick: { radius: 0.2 } });

  // Emphasis on substructure
  if (m_id !== "substr") {
    const atomSel = { serial: dataSubstr[m_id].match };
    const surfaceStyle = { opacity: 0.8, color: "white" };
    viewer.addSurface("VDW", surfaceStyle, atomSel, null, atomSel);
  }

  const animDirections = [{ x: 1 }, { y: 1 }, {x:1, z: 1 }];

  let randomNum = Math.floor(Math.random() * (animDirections.length + 1));
  console.log(randomNum);
  randomNum = molIds.indexOf(m_id) % animDirections.length;

  // Animation
  setInterval(() => {
    viewers[m_id].rotate(34, animDirections[randomNum], 1000);
  }, 1000);

  // viewer.center();
  // viewer.resize();
  // viewer.zoomTo();
  // viewer.render();
}

async function drawMolecules() {
  await fetchData();

  // First draw substructure
  drawOneMolecule("substr");
  // Then the rest
  molIds.forEach(m_id => drawOneMolecule(m_id));

  Object.values(viewers).forEach(viewer => {
    viewer.resize();
    viewer.zoomTo();
    viewer.center();
    viewer.render();


  });




}




async function fetchData() {
  const dataSubstrURL = "/static/main/science/substr/data_substr.json";
  const structsURL = (m_id) => `/static/main/science/substr/${m_id}.sdf`;

  dataSubstr = await fetch(dataSubstrURL).then(resp => resp.json());
  sdfModels["substr"] = await fetch(structsURL("substr")).then(resp => resp.text());

  // Fetch all substructures
  molIds = Object.keys(dataSubstr);
  let promises = molIds.map(m_id => fetch(structsURL(m_id)).then(resp => resp.text()));
  let responses = await Promise.all(promises);
  responses.forEach((model, counter) => sdfModels[molIds[counter]] = model);
}