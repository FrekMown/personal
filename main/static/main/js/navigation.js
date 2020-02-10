// First of all, fetch all background images and create an object with URLs
let BACKGROUND_URL = null;
let allSections = null;
let sectionCoordinates = null;
getBackgroundImages();

document.addEventListener('DOMContentLoaded', function () {
  // Get coordinates of sections
  allSections = Array.from(document.querySelectorAll('.section')).filter(s => s.id.length > 0);
  calculateSectionCoordinates();

  console.log("sectionCoordinates:", sectionCoordinates);

})

document.addEventListener('resize', calculateSectionCoordinates)



// Now, add event listeners for keys up and down
document.body.onkeyup = e =>{
  if (e.key.indexOf("Arrow") > -1 || e.key.indexOf("Page") > -1) {
    e.key.indexOf("Up") > -1 ? handleChangePosition("up") : handleChangePosition("down");
  }
};
window.onwheel = e => e.deltaY < 0 ? handleChangePosition("up") : handleChangePosition("down");

// window.onkeyup = e => e.key.indexOf("Arrow") > -1 ? handleChangePosition(e.key.replace("Arrow", "").toLowerCase()) : null;


// Definition of functions

function calculateSectionCoordinates() {
  sectionCoordinates = allSections.reduce((acc, section) => {
    acc[section.id] = offset(section);
    return acc;
  }, {});
  console.log(sectionCoordinates);
}

// Get images and populate BACKGROUND_URLs via ajax requests
async function getBackgroundImages() {
  const BACKGROUND_IMG = {
    "presentation": "/static/main/background/background-presentation.jpg",
    "data-science": "/static/main/background/background-data-science.jpg",
    "web-development": "/static/main/background/background-webdev.jpg",
    "network-analysis": "/static/main/background/background-network.jpg",
    "computational-biology": "/static/main/background/background-biology.jpg",
    "chemoinformatics": "/static/main/background/background-chemistry.jpg",
    "experience": "/static/main/background/background-education.jpg",
    "chemocobra": "/static/main/background/background-webdev.jpg",
    "webdev-workshop": "/static/main/background/background-webdev.jpg",
    "museo-solidaridad": "/static/main/background/background-webdev.jpg",
    "pictures": "/static/main/background/background-presentation.jpg",
    "contact": "/static/main/background/background-presentation.jpg",
  }

  const promises = Object.keys(BACKGROUND_IMG).map(key => (
    fetch(BACKGROUND_IMG[key])
      .then(resp => resp.blob())
      .then(blob => [key, URL.createObjectURL(blob)])
  ));

  const respImages = await Promise.all(promises);

  BACKGROUND_URL = respImages.reduce((acc, val) => {
    acc[val[0]] = val[1];
    return acc;
  }, {});

}

// Get coordinates of each section
function offset(el) {
  const rect = el.getBoundingClientRect(),
    // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, bottom: rect.bottom + scrollTop }
}


let oldPosition = "";

// Function to move position and change background
// direction can be up or down
function handleChangePosition(direction) {
  // Get next element
  console.log("handleChangePosition", direction);
  console.log(window.scrollY);
  // console.log(window.scrollY)
  let nextElem = null;
  if (direction === "up") {
    const distances = allSections.map(section => sectionCoordinates[section.id].top - window.scrollY);
    const minDist = Math.max(...distances.filter(dist => dist < 0));
    nextElem = allSections[distances.indexOf(minDist)];
  }
  else {
    const distances = allSections.map(section => sectionCoordinates[section.id].bottom - window.scrollY);
    const minDist = Math.min(...distances.filter(dist => dist > 0));
    nextElem = allSections[distances.indexOf(minDist)];
  }

  nextElem.scrollIntoView({
    behavior: "smooth",
    block: "center",
    // inline: "center"
  });

  if (BACKGROUND_URL && nextElem.id in BACKGROUND_URL) {
    document.body.style.backgroundImage = `url(${BACKGROUND_URL[nextElem.id]})`;
  }
}

