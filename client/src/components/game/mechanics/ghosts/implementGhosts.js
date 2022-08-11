import checkPacmanGhostCollision from "./collisions/checkPacmanGhostCollision";
import updateCollisions from "./movement/updateCollisions";
import implementTunnel from "../implementTunnel";
import checkSpeedMatchesState from "./movement/checkSpeedMatchesState";
import chooseMovement from "./movement/chooseMovement";

export default function implementGhosts(
  ghosts,
  boundaries,
  ctx,
  variables,
  pacman,
  pellets,
  powerUps,
  redGhost,
  cycleTimer,
  callbackOne = checkSpeedMatchesState,
  callbackTwo = implementTunnel,
  callbackThree = updateCollisions,
  callbackFour = chooseMovement,
  callbackFive = checkPacmanGhostCollision
) {
  ghosts.forEach((ghost) => {
    callbackOne(ghost, variables.length);
    const collisions = [];
    ghost.update(ctx);
    callbackTwo(ghost, variables.length);
    callbackThree(boundaries, collisions, ghost);
    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      callbackFour(ghost, pacman, collisions, variables.length, redGhost);
    }
    callbackFive(
      ghost,
      pacman,
      variables,
      ghosts,
      pellets,
      powerUps,
      cycleTimer
    );
  });
}
