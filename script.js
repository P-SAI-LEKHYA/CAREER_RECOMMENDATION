const cookingState = {
  crackedEggs: 0,
  gasOn: false,
  cookingStartedAt: null,
  cookingElapsed: 0,
  cookResult: "raw",
  plated: false,
  finished: false,
  score: 0,
  timeline: { firstEggAt: null, gasStartAt: null, gasStopAt: null, platedAt: null },
  timerId: null,
  startedAt: 0,
};

const interiorState = {
  selectedItem: null,
  draggedItem: null,
  placements: {
    "window-left": null,
    "window-center": null,
    "window-right": null,
    "center-left": null,
    center: null,
    "center-right": null,
    "floor-left": null,
    "floor-center": null,
    "floor-right": null,
  },
  finished: false,
  score: 0,
};

const PERFECT_MIN = 4200;
const PERFECT_MAX = 6200;
const MAX_COOK = 9000;
const furnitureItems = ["bed", "lamp", "fan", "stairs", "curtains"];
const zonePositions = {
  "window-left": { left: "8%", top: "16%" },
  "window-center": { left: "39%", top: "14%" },
  "window-right": { left: "72%", top: "16%" },
  "center-left": { left: "14%", top: "42%" },
  center: { left: "43%", top: "42%" },
  "center-right": { left: "73%", top: "42%" },
  "floor-left": { left: "14%", top: "68%" },
  "floor-center": { left: "43%", top: "70%" },
  "floor-right": { left: "73%", top: "68%" },
};

const ui = {
  showCookingBtn: document.getElementById("showCookingBtn"),
  showInteriorBtn: document.getElementById("showInteriorBtn"),
  cookingSim: document.getElementById("cookingSim"),
  interiorSim: document.getElementById("interiorSim"),

  eggCount: document.getElementById("eggCount"),
  heatState: document.getElementById("heatState"),
  cookState: document.getElementById("cookState"),
  score: document.getElementById("score"),
  taskTag: document.getElementById("taskTag"),
  taskSteps: document.getElementById("taskSteps"),
  stationStatus: document.getElementById("stationStatus"),
  progressLabel: document.getElementById("progressLabel"),
  cookFill: document.getElementById("cookFill"),
  crackBtn: document.getElementById("crackBtn"),
  gasBtn: document.getElementById("gasBtn"),
  stopBtn: document.getElementById("stopBtn"),
  plateBtn: document.getElementById("plateBtn"),
  analysis: document.getElementById("analysis"),
  analysisTag: document.getElementById("analysisTag"),
  log: document.getElementById("log"),
  flame: document.getElementById("flame"),
  omelette: document.getElementById("omelette"),
  servedOmelette: document.getElementById("servedOmelette"),
  egg1: document.getElementById("egg1"),
  egg2: document.getElementById("egg2"),

  placedCount: document.getElementById("placedCount"),
  selectedItem: document.getElementById("selectedItem"),
  interiorScore: document.getElementById("interiorScore"),
  interiorStatus: document.getElementById("interiorStatus"),
  designTag: document.getElementById("designTag"),
  designSteps: document.getElementById("designSteps"),
  designStation: document.getElementById("designStation"),
  designAnalysis: document.getElementById("designAnalysis"),
  designAnalysisTag: document.getElementById("designAnalysisTag"),
  designLog: document.getElementById("designLog"),
  submitDesignBtn: document.getElementById("submitDesignBtn"),
  resetDesignBtn: document.getElementById("resetDesignBtn"),
  furnitureButtons: [...document.querySelectorAll(".furniture-btn")],
  roomZones: [...document.querySelectorAll(".room-zone")],
  dropSpots: [...document.querySelectorAll(".drop-spot")],
  placedItemsLayer: document.getElementById("placedItemsLayer"),
  restartBtn: document.getElementById("restartBtn"),
};

function showSimulation(name) {
  const cookingActive = name === "cooking";
  ui.cookingSim.classList.toggle("hidden", !cookingActive);
  ui.interiorSim.classList.toggle("hidden", cookingActive);
  ui.showCookingBtn.classList.toggle("active", cookingActive);
  ui.showInteriorBtn.classList.toggle("active", !cookingActive);
}

function logMessage(target, title, message) {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `<strong>${title}</strong><br>${message}`;
  target.prepend(entry);
}

function animateEggCrack(index) {
  const egg = index === 1 ? ui.egg1 : ui.egg2;
  egg.classList.remove("cracking");
  void egg.offsetWidth;
  egg.classList.add("cracking");
}

function setCookingStatus(status, label) {
  ui.stationStatus.textContent = status;
  ui.progressLabel.textContent = label;
}

function updateCookingProgress() {
  const percent = Math.min(100, (cookingState.cookingElapsed / MAX_COOK) * 100);
  ui.cookFill.style.width = `${percent}%`;
}

function getHeatLevel() {
  if (!cookingState.gasOn) return 0;
  return Math.min(1, cookingState.cookingElapsed / MAX_COOK);
}

function applyCookingColors(heatLevel) {
  const center = heatLevel < 0.45 ? "#fff6b5" : heatLevel < 0.75 ? "#ffe78d" : "#f1cb62";
  const mid = heatLevel < 0.45 ? "#f8df73" : heatLevel < 0.75 ? "#efcb53" : "#d49a38";
  const edge = heatLevel < 0.45 ? "#eab83a" : heatLevel < 0.75 ? "#d99e32" : "#a86b24";
  ui.omelette.style.setProperty("--cook-center", center);
  ui.omelette.style.setProperty("--cook-mid", mid);
  ui.omelette.style.setProperty("--cook-edge", edge);
}

function getCookLabel() {
  if (cookingState.cookResult === "perfect") return "Perfect";
  if (cookingState.cookResult === "undercooked") return "Undercooked";
  if (cookingState.cookResult === "overcooked") return "Overcooked";
  if (cookingState.gasOn) return "Cooking";
  if (cookingState.crackedEggs === 2) return "In Pan";
  return "Raw";
}

function renderCookingSteps() {
  const steps = [
    ["Crack two eggs", cookingState.crackedEggs === 2],
    ["Start the gas", cookingState.timeline.gasStartAt !== null],
    ["Stop the gas at the right time", cookingState.timeline.gasStopAt !== null],
    ["Plate the omelette", cookingState.plated],
  ];
  ui.taskSteps.innerHTML = steps.map(([label, done]) => `<li>${done ? "✓" : "•"} ${label}</li>`).join("");
}

function updateCookingScene() {
  ui.egg1.classList.toggle("cracked", cookingState.crackedEggs >= 1);
  ui.egg2.classList.toggle("cracked", cookingState.crackedEggs >= 2);
  ui.flame.className = `flame ${cookingState.gasOn ? "on" : "off"}`;
  const heatLevel = getHeatLevel();
  ui.flame.style.setProperty("--heat-level", heatLevel.toFixed(2));
  ui.omelette.style.setProperty("--heat-level", heatLevel.toFixed(2));
  applyCookingColors(heatLevel);
  ui.flame.parentElement.style.setProperty("--heat-level", heatLevel.toFixed(2));
  ui.flame.parentElement.classList.toggle("heating", cookingState.gasOn);

  let omeletteClass = "omelette raw";
  if (cookingState.crackedEggs === 2) omeletteClass = "omelette mixing";
  if (cookingState.gasOn) omeletteClass = "omelette cooking";
  if (cookingState.cookResult === "perfect") omeletteClass = "omelette perfect";
  if (cookingState.cookResult === "undercooked") omeletteClass = "omelette undercooked";
  if (cookingState.cookResult === "overcooked") omeletteClass = "omelette overcooked";
  if (cookingState.plated) omeletteClass += " plated";
  ui.omelette.className = omeletteClass;

  ui.servedOmelette.className = cookingState.plated
    ? `served-omelette visible ${cookingState.cookResult}`
    : "served-omelette";
}

function renderCooking() {
  ui.eggCount.textContent = `${cookingState.crackedEggs} / 2`;
  ui.heatState.textContent = cookingState.gasOn ? "On" : "Off";
  ui.cookState.textContent = getCookLabel();
  ui.score.textContent = cookingState.score;
  ui.taskTag.textContent = cookingState.finished ? "Complete" : "In Progress";
  ui.crackBtn.disabled = cookingState.finished || cookingState.crackedEggs >= 2 || cookingState.gasOn;
  ui.gasBtn.disabled = cookingState.finished || cookingState.crackedEggs < 2 || cookingState.gasOn || cookingState.timeline.gasStartAt !== null;
  ui.stopBtn.disabled = cookingState.finished || !cookingState.gasOn;
  ui.plateBtn.disabled = cookingState.finished || cookingState.gasOn || cookingState.timeline.gasStopAt === null || cookingState.plated;
  renderCookingSteps();
  updateCookingScene();
  updateCookingProgress();
}

function crackEgg() {
  if (cookingState.crackedEggs >= 2 || cookingState.gasOn || cookingState.finished) return;
  cookingState.crackedEggs += 1;
  animateEggCrack(cookingState.crackedEggs);
  if (cookingState.timeline.firstEggAt === null) cookingState.timeline.firstEggAt = Date.now();
  if (cookingState.crackedEggs < 2) {
    setCookingStatus("Prep", "One egg cracked. Add the second egg.");
    logMessage(ui.log, "Prep", "You cracked the first egg cleanly.");
  } else {
    setCookingStatus("Ready To Cook", "Both eggs are in the bowl. Start the gas.");
    logMessage(ui.log, "Prep", "Both eggs are cracked and ready for the pan.");
  }
  renderCooking();
}

function startGas() {
  if (cookingState.crackedEggs < 2 || cookingState.gasOn || cookingState.finished) return;
  cookingState.gasOn = true;
  cookingState.cookResult = "raw";
  cookingState.cookingStartedAt = Date.now();
  cookingState.timeline.gasStartAt = cookingState.cookingStartedAt;
  setCookingStatus("Cooking", "Watch the omelette and stop the gas before it overcooks.");
  logMessage(ui.log, "Heat On", "The flame is on. The omelette is now cooking.");
  clearInterval(cookingState.timerId);
  cookingState.timerId = setInterval(() => {
    cookingState.cookingElapsed = Date.now() - cookingState.cookingStartedAt;
    if (cookingState.cookingElapsed >= MAX_COOK) {
      stopGas(true);
      return;
    }
    renderCooking();
  }, 100);
  renderCooking();
}

function stopGas(autoStopped = false) {
  if (!cookingState.gasOn || cookingState.finished) return;
  cookingState.gasOn = false;
  cookingState.cookingElapsed = Date.now() - cookingState.cookingStartedAt;
  cookingState.timeline.gasStopAt = Date.now();
  clearInterval(cookingState.timerId);

  if (cookingState.cookingElapsed < PERFECT_MIN) {
    cookingState.cookResult = "undercooked";
    setCookingStatus("Heat Off", "The eggs are still a bit loose. Plate to finish the task.");
    logMessage(ui.log, "Heat Off", "You stopped the gas early, so the omelette is undercooked.");
  } else if (cookingState.cookingElapsed <= PERFECT_MAX) {
    cookingState.cookResult = "perfect";
    setCookingStatus("Heat Off", "Nice timing. The omelette looks ready to plate.");
    logMessage(ui.log, "Heat Off", "You stopped the gas at a strong moment for a soft omelette.");
  } else {
    cookingState.cookResult = "overcooked";
    setCookingStatus("Heat Off", "The pan stayed hot too long. Plate it and review the result.");
    logMessage(ui.log, "Heat Off", autoStopped ? "The omelette stayed on the gas too long and overcooked." : "You stopped the gas late, so the omelette is overcooked.");
  }
  renderCooking();
}

function buildCookingAnalysis() {
  const totalTime = ((cookingState.timeline.platedAt - cookingState.startedAt) / 1000).toFixed(1);
  const cookSeconds = (cookingState.cookingElapsed / 1000).toFixed(1);
  let qualityText = "";
  let score = 0;

  if (cookingState.cookResult === "perfect") {
    qualityText = "The omelette was cooked well. You controlled the gas at the right time.";
    score += 60;
  } else if (cookingState.cookResult === "undercooked") {
    qualityText = "The omelette came off the heat too soon. It needed a little more time in the pan.";
    score += 30;
  } else {
    qualityText = "The omelette stayed on the gas for too long. The texture would be too firm for a soft finish.";
    score += 18;
  }

  score += 15;
  score += 10;
  score += parseFloat(totalTime) <= 14 ? 15 : parseFloat(totalTime) <= 20 ? 10 : 4;
  cookingState.score = score;
  const summary = score >= 85 ? "Strong job. Your pace and stove timing were both solid." : score >= 60 ? "Decent job. The workflow was right, but your timing can improve." : "Needs practice. The main improvement is learning when to stop the gas.";
  ui.analysis.innerHTML = `<p><strong>Overall:</strong> ${summary}</p><p><strong>Egg handling:</strong> You cracked ${cookingState.crackedEggs} out of 2 eggs before heating the pan.</p><p><strong>Cooking time:</strong> The gas was on for ${cookSeconds}s.</p><p><strong>Dish quality:</strong> ${qualityText}</p><p><strong>Work speed:</strong> You finished the order in ${totalTime}s.</p><p><strong>Final score:</strong> ${score} / 100</p>`;
  ui.analysisTag.textContent = score >= 85 ? "Excellent" : score >= 60 ? "Fair" : "Needs Practice";
}

function plateDish() {
  if (cookingState.finished || cookingState.gasOn || cookingState.timeline.gasStopAt === null) return;
  cookingState.plated = true;
  cookingState.finished = true;
  cookingState.timeline.platedAt = Date.now();
  setCookingStatus("Served", "The omelette is plated. Review the analysis.");
  logMessage(ui.log, "Service", "You plated the omelette and sent it out.");
  buildCookingAnalysis();
  renderCooking();
}

function resetCooking() {
  clearInterval(cookingState.timerId);
  cookingState.crackedEggs = 0;
  cookingState.gasOn = false;
  cookingState.cookingStartedAt = null;
  cookingState.cookingElapsed = 0;
  cookingState.cookResult = "raw";
  cookingState.plated = false;
  cookingState.finished = false;
  cookingState.score = 0;
  cookingState.timeline = { firstEggAt: null, gasStartAt: null, gasStopAt: null, platedAt: null };
  cookingState.startedAt = Date.now();
  ui.log.innerHTML = "";
  ui.analysis.textContent = "Finish the omelette to see your cooking review.";
  ui.analysisTag.textContent = "Waiting";
  setCookingStatus("Ready", "Crack two eggs into the bowl to begin.");
  logMessage(ui.log, "Round Start", "The order is in. Make one soft omelette for the customer.");
  renderCooking();
}

function placedCount() {
  return Object.values(interiorState.placements).filter(Boolean).length;
}

function renderDesignSteps() {
  const hasItem = item => Boolean(Object.values(interiorState.placements).find(placed => placed === item));
  const steps = [
    ["Place the bed", hasItem("bed")],
    ["Add the lamp", hasItem("lamp")],
    ["Add the fan", hasItem("fan")],
    ["Add the stairs", hasItem("stairs")],
    ["Hang the curtains", hasItem("curtains")],
  ];
  ui.designSteps.innerHTML = steps.map(([label, done]) => `<li>${done ? "✓" : "•"} ${label}</li>`).join("");
}

function renderInterior() {
  ui.placedCount.textContent = `${placedCount()} / 5`;
  ui.selectedItem.textContent = interiorState.selectedItem ? interiorState.selectedItem.replace("-", " ") : "None";
  ui.interiorScore.textContent = interiorState.score;
  ui.interiorStatus.textContent = interiorState.finished ? "Reviewed" : "Planning";
  ui.designTag.textContent = interiorState.finished ? "Submitted" : "Arrange Room";

  ui.furnitureButtons.forEach(button => {
    const item = button.dataset.item;
    const used = Object.values(interiorState.placements).includes(item);
    button.disabled = interiorState.finished;
    button.classList.toggle("selected", interiorState.selectedItem === item);
    button.classList.toggle("placed", used);
    button.classList.toggle("dragging", interiorState.draggedItem === item);
  });

  ui.dropSpots.forEach(spot => {
    spot.classList.toggle("active-target", interiorState.selectedItem !== null);
    spot.disabled = interiorState.finished;
  });

  ui.placedItemsLayer.innerHTML = Object.entries(interiorState.placements)
    .filter(([, item]) => item)
    .map(([zone, item]) => {
      const position = zonePositions[zone];
      const label = item.replace(/\b\w/g, c => c.toUpperCase());
      return `<div class="placed-item ${item}" style="left:${position.left}; top:${position.top};">${label}</div>`;
    })
    .join("");

  renderDesignSteps();
}

function selectFurniture(item) {
  if (interiorState.finished) return;
  interiorState.selectedItem = item;
  ui.designStation.textContent = `Place ${item} in the room`;
  logMessage(ui.designLog, "Selected", `${item} is ready. Click a zone to place it.`);
  renderInterior();
}

function startDraggingItem(item) {
  if (interiorState.finished) return;
  interiorState.draggedItem = item;
  interiorState.selectedItem = item;
  ui.designStation.textContent = `Drag ${item} into the room`;
  renderInterior();
}

function stopDraggingItem() {
  interiorState.draggedItem = null;
  renderInterior();
}

function placeFurniture(zone) {
  if (interiorState.finished || !interiorState.selectedItem) return;
  const existingItem = interiorState.placements[zone];
  if (existingItem) {
    logMessage(ui.designLog, "Replaced", `${existingItem} was moved out of ${zone}.`);
  }

  const previousZone = Object.entries(interiorState.placements).find(([, item]) => item === interiorState.selectedItem)?.[0];
  if (previousZone) {
    interiorState.placements[previousZone] = null;
  }
  interiorState.placements[zone] = interiorState.selectedItem;
  logMessage(ui.designLog, "Placed", `${interiorState.selectedItem} was placed in ${zone}.`);
  interiorState.selectedItem = null;
  interiorState.draggedItem = null;
  ui.designStation.textContent = "Arrange Furniture";
  renderInterior();
}

function buildDesignAnalysis() {
  const getZoneFor = item => Object.entries(interiorState.placements).find(([, placed]) => placed === item)?.[0];
  const bedZone = getZoneFor("bed");
  const lampZone = getZoneFor("lamp");
  const fanZone = getZoneFor("fan");
  const stairsZone = getZoneFor("stairs");
  const curtainsZone = getZoneFor("curtains");
  let score = 0;
  const notes = [];

  if (placedCount() === 5) {
    score += 30;
    notes.push("You placed every required piece, so the room feels complete.");
  } else {
    notes.push("Some furniture is missing, which makes the bedroom feel unfinished.");
  }

  if (curtainsZone && curtainsZone.startsWith("window")) {
    score += 20;
    notes.push("The curtains are on the window side, which makes sense visually and functionally.");
  } else {
    notes.push("Curtains are away from the window wall, so they do not support the room properly.");
  }

  if (bedZone === "floor-left" || bedZone === "floor-center" || bedZone === "floor-right") {
    score += 20;
    notes.push("The bed is in the calmer lower half of the room, which works well for rest.");
  } else {
    notes.push("The bed is too close to the upper wall, so the room feels less restful.");
  }

  if (lampZone && bedZone && lampZone !== bedZone && lampZone.includes("floor")) {
    score += 10;
    notes.push("The lamp supports the bed area without sitting directly on top of it.");
  } else if (lampZone) {
    notes.push("The lamp position is not helping the resting side enough.");
  }

  if (fanZone === "center") {
    score += 15;
    notes.push("The fan is near the center, so air flow would reach more of the room.");
  } else {
    notes.push("The fan is off-center, so comfort would feel uneven.");
  }

  if (stairsZone === "center-left" || stairsZone === "center-right") {
    score += 10;
    notes.push("The stairs are set to the side instead of blocking the main middle path.");
  } else if (stairsZone) {
    notes.push("The stairs could block circulation where they are now.");
  }

  if (
    (bedZone === "floor-left" && lampZone === "floor-center") ||
    (bedZone === "floor-right" && lampZone === "floor-center") ||
    (bedZone === "floor-center" && (lampZone === "floor-left" || lampZone === "floor-right"))
  ) {
    score += 10;
    notes.push("The bed and lamp relate nicely, which makes the sleeping zone feel intentional.");
  }

  interiorState.score = score;
  const summary = score >= 85 ? "Strong layout. It feels balanced and practical." : score >= 60 ? "Good start. The main layout works, but one or two placements could be better." : "Needs more planning. The furniture arrangement is not using the room well yet.";
  ui.designAnalysis.innerHTML = `<p><strong>Overall:</strong> ${summary}</p><p><strong>Bed:</strong> ${bedZone || "Not placed"}</p><p><strong>Lamp:</strong> ${lampZone || "Not placed"}</p><p><strong>Fan:</strong> ${fanZone || "Not placed"}</p><p><strong>Stairs:</strong> ${stairsZone || "Not placed"}</p><p><strong>Curtains:</strong> ${curtainsZone || "Not placed"}</p><p><strong>Assessment:</strong> ${notes.join(" ")}</p><p><strong>Final score:</strong> ${score} / 100</p>`;
  ui.designAnalysisTag.textContent = score >= 85 ? "Excellent" : score >= 60 ? "Fair" : "Needs Work";
}

function submitDesign() {
  if (interiorState.finished) return;
  interiorState.finished = true;
  ui.designStation.textContent = "Review Complete";
  logMessage(ui.designLog, "Submitted", "The bedroom layout was submitted for review.");
  buildDesignAnalysis();
  renderInterior();
}

function resetDesign() {
  interiorState.selectedItem = null;
  interiorState.draggedItem = null;
  interiorState.finished = false;
  interiorState.score = 0;
  interiorState.placements = {
    "window-left": null,
    "window-center": null,
    "window-right": null,
    "center-left": null,
    center: null,
    "center-right": null,
    "floor-left": null,
    "floor-center": null,
    "floor-right": null,
  };
  ui.designLog.innerHTML = "";
  ui.designAnalysis.textContent = "Arrange the furniture and submit the layout to see your review.";
  ui.designAnalysisTag.textContent = "Waiting";
  ui.designStation.textContent = "Arrange Furniture";
  logMessage(ui.designLog, "Brief", "Design the plain room with bed, lamp, fan, stairs, and curtains. Try to keep the bed restful, the curtains near the window, and the center easy to move through.");
  renderInterior();
}

ui.showCookingBtn.addEventListener("click", () => showSimulation("cooking"));
ui.showInteriorBtn.addEventListener("click", () => showSimulation("interior"));
ui.crackBtn.addEventListener("click", crackEgg);
ui.gasBtn.addEventListener("click", startGas);
ui.stopBtn.addEventListener("click", () => stopGas(false));
ui.plateBtn.addEventListener("click", plateDish);
ui.restartBtn.addEventListener("click", resetCooking);
ui.furnitureButtons.forEach(button => button.addEventListener("click", () => selectFurniture(button.dataset.item)));
ui.furnitureButtons.forEach(button => button.addEventListener("dragstart", event => {
  startDraggingItem(button.dataset.item);
  event.dataTransfer.setData("text/plain", button.dataset.item);
  event.dataTransfer.effectAllowed = "move";
}));
ui.furnitureButtons.forEach(button => button.addEventListener("dragend", () => {
  stopDraggingItem();
}));
ui.dropSpots.forEach(spot => spot.addEventListener("click", () => placeFurniture(spot.dataset.zone)));
ui.dropSpots.forEach(spot => spot.addEventListener("dragover", event => {
  if (interiorState.finished) return;
  event.preventDefault();
  spot.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
}));
ui.dropSpots.forEach(spot => spot.addEventListener("dragleave", () => {
  spot.classList.remove("drag-over");
}));
ui.dropSpots.forEach(spot => spot.addEventListener("drop", event => {
  if (interiorState.finished) return;
  event.preventDefault();
  const item = event.dataTransfer.getData("text/plain");
  if (item) {
    interiorState.selectedItem = item;
    placeFurniture(spot.dataset.zone);
  }
  spot.classList.remove("drag-over");
}));
ui.submitDesignBtn.addEventListener("click", submitDesign);
ui.resetDesignBtn.addEventListener("click", resetDesign);

resetCooking();
resetDesign();
showSimulation("cooking");
