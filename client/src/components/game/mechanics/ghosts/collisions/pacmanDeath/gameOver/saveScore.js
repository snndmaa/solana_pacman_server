import axios from "axios";
import getBackendUrl from "./getBackendUrl";

export default async function saveScore(variables, callback = getBackendUrl) {
  const data = {
    userName: variables.player.username,
    score: variables.score,
  };
  try {
    const res = await axios.post(callback(process.env.REACT_APP_URL), data);
    return `Success: ${res.data.message}`;
  } catch (err) {
    return `Error: ${err.response.statusText}`;
  }
}
