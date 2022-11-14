import React, { useState } from "react";
import axios from "axios";

const ValRecentMatches = () => {
  const [valGameNameText, setValGameNameText] = useState("");
  const [valTagLineText, setValTagLineText] = useState("");
  const [matchList, setMatchList] = useState([]);

  const valGameNameTextHandler = (e) => setValGameNameText(e.target.value);
  const valTagLineTextHandler = (e) => setValTagLineText(e.target.value);

  const getMatchList = (e) => {
    axios
      .get("http://localhost:1337/recentMatches", {
        params: { gamename: valGameNameText, tagline: valTagLineText },
      })
      .then((reponse) => setMatchList(reponse.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Valorant Player's Recent Matches</h2>
      <input
        type="text"
        onChange={valGameNameTextHandler}
      />
      <input
        type="text"
        onChange={valTagLineTextHandler}
      />
      <button onClick={getMatchList}>Request</button>
    </div>
  );
};

export default ValRecentMatches;
