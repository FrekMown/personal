const sdfModels = {};
let molIds;
let dataSubstr;
const viewers = {};


drawMolecules();

function rotateAll() {
  Object.values(viewers).forEach((viewer, counter) => {
    const animDirections = [{ y: 1 }, { x: 1 }, { x: 1, z: 1 }];

    let randomNum = counter % animDirections.length;

    viewer.rotate(180, animDirections[randomNum], 2000, true)
  });
}

function drawOneMolecule(m_id) {
  // Create div and insert it into #chem-container

  // Parent Element
  const parentElem = document.createElement("div");
  parentElem.classList.add("mol-element");

  // Info Element
  const nameElem = document.createElement("div");
  nameElem.classList.add("mol-name");
  m_id !== "substr" ?
    nameElem.innerHTML = `<strong>${m_id}</strong>` :
    nameElem.innerHTML = `<strong>Objective</strong>`;
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
    backgroundColor: "0x1b1b27",
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

  const animDirections = [{ y: 1 }, { x: 1 }, { x: 1, z: 1 }];

  // let randomNum = molIds.indexOf(m_id) % animDirections.length;

  // Animation
  // setInterval(() => {
  //   viewers[m_id].rotate(180, animDirections[randomNum], 5000, true);
  // }, 5000);

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