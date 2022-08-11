import makeBoundaries from "./boundaries/makeBoundaries";
import makePellets from "./pellets/makePellets";
import makePowerUps from "./powerUps/makePowerUps";
import makeGhosts from "./ghosts/makeGhosts";
import makePacman from "./pacman/makePacman";
import CycleTimer from "../models/cycleTimer";
import implementBoundaries from "./boundaries/implementBoundaries";
import implementPellets from "./pellets/implementPellets";
import implementPowerUps from "./powerUps/implementPowerUps";
import implementGhosts from "./ghosts/implementGhosts";
import implementPacman from "./pacman/implementPacman";
import displayScore from "./displayScore";
import displayLives from "./displayLives";
import displayLevel from "./displayLevel";

const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2", "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "-", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "-", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", "o", "|", " ", " ", "|", ".", "|", " ", " ", " ", "|", ".", "|", "|", ".", "|", " ", " ", " ", "|", ".", "|", " ", " ", "|", "o", "|"],
  ["|", ".", "4", "-", "-", "3", ".", "4", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "3", ".", "4", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "2", ".", "1", "-", "-", "-", "-", "-", "-", "2", ".", "1", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "-", "3", ".", "|", "|", ".", "4", "-", "-", "2", "1", "-", "-", "3", ".", "|", "|", ".", "4", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "2", ".", "|", "4", "-", "-", "2", " ", "|", "|", " ", "1", "-", "-", "3", "|", ".", "1", "-", "-", "-", "-", "3"],
  [" ", " ", " ", " ", " ", "|", ".", "|", "1", "-", "-", "3", " ", "4", "3", " ", "4", "-", "-", "2", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "1", "-", "-", "-", "-", "-", "-", "2", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  ["-", "-", "-", "-", "-", "3", ".", "4", "3", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", "4", "3", ".", "4", "-", "-", "-", "-", "-"],
  [" ", " ", " ", " ", " ", " ", ".", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", ".", " ", " ", " ", " ", " ", " "],
  ["-", "-", "-", "-", "-", "2", ".", "1", "2", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", "1", "2", ".", "1", "-", "-", "-", "-", "-"],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "4", "-", "-", "-", "-", "-", "-", "3", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "1", "-", "-", "-", "-", "-", "-", "2", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  ["1", "-", "-", "-", "-", "3", ".", "4", "3", " ", "4", "-", "-", "2", "1", "-", "-", "3", " ", "4", "3", ".", "4", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "-", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "-", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "2", "|", ".", "4", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "3", ".", "|", "1", "-", "3", ".", "|"],
  ["|", "o", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", " ", " ", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", "o", "|"],
  ["4", "-", "2", ".", "|", "|", ".", "1", "2", ".", "1", "-", "-", "-", "-", "-", "-", "2", ".", "1", "2", ".", "|", "|", ".", "1", "-", "3"],
  ["1", "-", "3", ".", "4", "3", ".", "|", "|", ".", "4", "-", "-", "2", "1", "-", "-", "3", ".", "|", "|", ".", "4", "3", ".", "4", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "-", "-", "3", "4", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "3", "4", "-", "-", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "-", "-", "-", "-", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "-", "-", "-", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

const variables = {
  length: 32,
  score: 0,
  lastKeyPressed: "",
  level: 1,
  playerName: "",
  reactRoot: null,
  killCount: 0,
  start: true,
  animationId: null,
}

const boundaries = makeBoundaries(map, variables.length);
const pellets = makePellets(map, variables.length);
const powerUps = makePowerUps(map, variables.length);
const ghosts = makeGhosts(variables.length);
const pacman = makePacman(variables.length);
const cycleTimer = new CycleTimer();

export default function playGame(name, mainEl) {
  if (variables.start === true) {
    variables.playerName = name;
    variables.reactRoot.mainEl = mainEl;
    cycleTimer.start(ghosts);
    variables.start = false;
  }
  variables.animationId = requestAnimationFrame(playGame);
  const board = document.querySelector("#board");
  const ctx = board.getContext("2d");
  ctx.clearRect(0, 0, 896, 992);

  implementBoundaries(boundaries, ctx, pacman);
  implementPellets(pellets, ctx, pacman, variables, ghosts, powerUps, cycleTimer);
  implementPowerUps(powerUps, ctx, pacman, variables, ghosts);
  implementGhosts(ghosts, boundaries, ctx, variables, pacman, pellets, powerUps, ghosts[0], cycleTimer);
  implementPacman(variables, pacman, boundaries, ctx, pellets);
  displayScore(variables);
  displayLives(pacman);
  displayLevel(variables);
};
