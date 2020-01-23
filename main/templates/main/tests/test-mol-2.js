let mols;

drawMolecules();

async function drawMolecules() {
  const m_id = "fpram";

  const [jsonFiles, structFiles] = await fetchData();

  const config = {
    backgroundColor: "black"
  }

  const viewer = $3Dmol.createViewer("container-01", config);
  const model = viewer.addModel(structFiles[1], "sdf");
  console.log(model);
  viewer.setStyle({}, { stick: {} });
  // viewer.setStyle({ serial: match }, { sphere: {} });


  // Emphasis on substructure
  const atomSel = { serial: jsonFiles[0][m_id].match };
  const surfaceStyle = { opacity: 0.6, color: "white" };


  viewer.addSurface("VDW", surfaceStyle, atomSel, null, atomSel);
  viewer.zoomTo();
  viewer.render();
}


async function fetchData() {
  const jsonFiles = [
    "/static/main/science/substr/data_substr.json",
  ]
  const structFiles = [
    "/static/main/science/tubocurarine.sdf",
    "/static/main/science/substr/fpram.sdf",
  ]

  const jsonOut = await Promise.all(jsonFiles.map(url => fetch(url).then(resp => resp.json())));
  const structOut = await Promise.all(structFiles.map(url => fetch(url).then(resp => resp.text())));


  return [jsonOut, structOut];
}