import React, { useEffect, useState } from "react";
import "./feature.scss";
import PlayArrow from "@material-ui/icons/PlayArrow";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import axios from "axios";

const Feature = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2RhMGJhNmQwM2Y0ODQ5OWY5OWM0NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTQ5MzQ1MCwiZXhwIjoxNjQ5OTI1NDUwfQ.cc7ViLOxT9VzNRelNAGY-R3qdAQyp-jqDNWDsgBelK8",
          },
        });
        console.log(res.data);
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="feature">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="Life">Life</option>
            <option value="Hero">Hero</option>
            <option value="Drama">Drama</option>
            <option value="History">History</option>
            <option value="Honor">Horror</option>
            <option value="romance">Romance</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc link">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>

          <button className="information">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
