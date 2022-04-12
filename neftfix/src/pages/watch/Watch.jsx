import React from "react";
import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useLocation } from "react-router-dom";
const Watch = () => {
  const location = useLocation();
  const movies = location.state;
  const movieDetail = movies.movie;

  return (
    <div className="watch">
      <Link className="link" to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress="true" controls src={movieDetail.video} />
    </div>
  );
};

export default Watch;
