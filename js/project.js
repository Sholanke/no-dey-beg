const projectNodes = Array.from(document.querySelectorAll("._project"));
const projectThumb = document.querySelector("._project_thumb");
const projectThumbNumbers = Array.from(
  document.querySelectorAll(".js__project_thumb__num")
);

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
