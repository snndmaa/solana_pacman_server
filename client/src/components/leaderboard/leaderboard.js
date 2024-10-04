import axios from "axios";
import "./leaderboard.css";
import React from "react";
import Game from "../game/game";
import Main from "../main/main";
import { useEffect, useState } from "react";
import { sendSolToWinner } from "../../utils/web3/performTransaction"

const scoresUrl = process.env.REACT_APP_URL
  ? `${process.env.REACT_APP_URL}/scores`
  : "http://localhost:9000/scores";

export default function Leaderboard({ variables }) {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await axios.get(scoresUrl);
      const scores = res.data;
      console.log(scores)
      const maxScore = Math.max(...scores.map(score => score.score));

      while (scores.length < 10) {
        scores.push({
          user: {
            username: "--"
          },
          score: "--",
        });
      }
      setScores(scores);

      if (variables.score === maxScore) {
        sendSolToWinner(variables);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const resetVariables = () => {
    variables.score = 0;
    variables.start = true;
  };

  const handlePlayAgain = () => {
    resetVariables();
    variables.reactRoot.render(
      <Game player={variables.player} reactRoot={variables.reactRoot} />
    );
  };

  const handleChangePlayer = () => {
    resetVariables();
    variables.reactRoot.render(
      <Main user={variables.player} reactRoot={variables.reactRoot} />
    );
  };

  return (
    <div className="leaderboard">
      <h1>Game Over</h1>
      <h4>You scored {variables.score} points</h4>
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
                    <td className="name">{score.user ? score.user.username : "--"}</td>
                    <td className="points">{score.score}</td>
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
        <button className="home" onClick={handleChangePlayer}>
          Home
        </button>
      </div>
    </div>
  );
}
