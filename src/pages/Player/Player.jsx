import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    pubished_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmIxYzU5ZWM2NmE1MDg1NzJhMmEyYTdkNjUxMWMxMCIsIm5iZiI6MTc0MTI1NTcwMS45MzkwMDAxLCJzdWIiOiI2N2M5NzQxNTZmYjQwMDEzOTIwY2UzOTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.SP2wLgsdLvkG7j-Tu5utYtGA9pFt_vsRtmXpV3LqMRk",
    },
  };

  useEffect(() => {}, []);

  fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  )
    .then((res) => res.json())
    .then((res) => setApiData(res.results[0]))
    .catch((err) => console.error(err));

  return (
    <div className="player">
      <img
        src={back_arrow}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        frameborder="0"
        width="90%"
        height="90%"
        title="trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.pubished_at}</p>
        <p> {apiData.name}</p>
        <p> {apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
