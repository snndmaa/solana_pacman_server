import "./leaderboard.css";
import React from "react";
import Game from "../game/game";
import { useEffect, useState } from "react";

let url;
if (process.env.REACT_APP_URL) {
  url = `${process.env.REACT_APP_URL}/backend/scores`;
} else {
  url = "http://localhost:9000/backend/scores";
}

export default function Leaderboard({
  score,
  mainEl,
  name,
  ghosts,
  cycleTimer,
}) {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        while (data.scores.length < 10) {
          data.scores.push({
            name: "--",
            points: "--",
          });
        }
        return data.scores;
      })
      .then((scores) => setScores(scores))
      .catch(() => setError(true));
  }, []);

  const handlePlayAgain = () => {
    score.points = 0;
    cycleTimer.start(ghosts);
    mainEl.render(<Game name={name} mainEl={mainEl} />);
  };

  const handleChangePlayer = () => {
    window.location.reload();
  };

  return (
    <div className="leaderboard">
      <h1>Game Over</h1>
      <h4>You scored {score.points} points</h4>
      {error ? (
        <p className="error" data-testid="error">
          Oops, something went wrong!
        </p>
      ) : (
        <table className="list">
          {scores.length !== 10 ? (
            <tbody>
              <tr>
                <td className="wait-message" data-testid="wait-message">
                  Please wait a moment...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr>
                <th className="rank-header">Rank</th>
                <th className="name-header">Name</th>
                <th className="score-header">Score</th>
              </tr>
              {scores.map((score, index) => {
                return (
                  <tr className="entry" key={index} aria-label={index}>
                    <td className="rank">{index + 1}</td>
                    <td className="name">{score.name}</td>
                    <td className="points">{score.points}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      )}
      <div className="buttons">
        <button className="play-again" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="change-player" onClick={handleChangePlayer}>
          Change Player
        </button>
      </div>
    </div>
  );
}
