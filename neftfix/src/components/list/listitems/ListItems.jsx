import React, { useEffect, useState } from "react";
import "./listitems.scss";
import PlayCircleFilledOutlined from "@material-ui/icons/PlayCircleFilledOutlined";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItems = ({ index, item }) => {
  const [isHovered, setHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2RhMGJhNmQwM2Y0ODQ5OWY5OWM0NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTQ5MzQ1MCwiZXhwIjoxNjQ5OTI1NDUwfQ.cc7ViLOxT9VzNRelNAGY-R3qdAQyp-jqDNWDsgBelK8",
          },
        });
        // console.log(res);
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link
      to={{
        pathname: "/Watch",
      }}
      state={{ movie: movie }}
    >
      <div
        className="listitems"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true}></video>
            <div className="item-info">
              <div className="icons">
                <PlayCircleFilledOutlined className="icon" />
                <ThumbUpSharpIcon className="icon" />
                <ThumbDownAlt className="icon" />
                <AddIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.genre}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre} </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItems;
