import endGame from "../endGame";
import resetAfterDeath from "../resetAfterDeath";

export default function checkPacmanLives(
  pacman,
  variables,
  pellets,
  powerUps,
  ghosts,
  cycleTimer,
  scaredTimer,
  ghostAudioObjects,
  pacmanDeathAudio,
  callbackOne = endGame,
  callbackTwo = resetAfterDeath
) {
  if (pacman.lives <= 0) {
    callbackOne(
      variables,
      pellets,
      powerUps,
      ghosts,
      pacman,
      cycleTimer,
      scaredTimer,
      pacmanDeathAudio
    );
  } else {
    pacman.lives--;
    callbackTwo(
      pacman,
      variables,
      ghosts,
      cycleTimer,
      scaredTimer,
      ghostAudioObjects
    );
  }
}
