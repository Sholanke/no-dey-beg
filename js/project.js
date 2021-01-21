const projectNodes = Array.from(document.querySelectorAll("._project"));
const projectThumb = document.querySelector("._project_thumb");
const indexNode = document.querySelector(".js_project_index");
const lineBgNode = document.querySelector(".line_bg");
const projectThumbNumbers = Array.from(
  document.querySelectorAll(".js__project_thumb__num")
);
let activeProjectIndex = 0;

const wheelEventHandler = debouncer(updateInterface, 40);

window.addEventListener("wheel", (event) => {
  wheelEventHandler(event);
});

function updateInterface(event) {
  updateProjectIndex(event);
  shiftBackground();
  updateProjectInterface();
  moveProjectThumb();
}

function updateProjectIndex(event) {
  event.deltaY >= 0 ? goToNextProject() : goToPreviousProject();
}

function goToNextProject() {
  activeProjectIndex < projectNodes.length - 1 && activeProjectIndex++;
}

function goToPreviousProject() {
  activeProjectIndex > 0 && activeProjectIndex--;
}

function shiftBackground() {
  anime({
    targets: lineBgNode,
    translateX: -180 * activeProjectIndex,
    duration: 1500,
  });
}

function updateProjectInterface() {
  activateNode(activeProjectIndex, projectNodes);
}

function moveProjectThumb() {
  const widthInPercent = (100 / (projectNodes.length - 1)) * activeProjectIndex;
  projectThumb.style.width = `${widthInPercent}%`;
  activateNode(activeProjectIndex, projectThumbNumbers);
}

function activateNode(indexToActivate, nodeArray, className = "active") {
  nodeArray.forEach((_node) => {
    _node.classList.remove(className);
  });
  nodeArray[indexToActivate].classList.add(className);
}

function moveToNextProject() {
  goToNextProject();
  shiftBackground();
  updateProjectInterface();
  moveProjectThumb();
}

function moveToPrevious() {
  goToPreviousProject();
  shiftBackground();
  updateProjectInterface();
  moveProjectThumb();
}

window.addEventListener("keydown", (event) => {
  const rightKeyCodes = [39, 40];
  const leftKeyCodes = [38, 37];
  const goRight = rightKeyCodes.includes(event.keyCode);
  const goLeft = leftKeyCodes.includes(event.keyCode);
  goRight && moveToNextProject();
  goLeft && moveToPrevious();
});

projectThumbNumbers.forEach((numberNode, index) => {
  numberNode.addEventListener("click", () => {
    activeProjectIndex = index;
    shiftBackground();
    updateProjectInterface();
    moveProjectThumb();
  });
});