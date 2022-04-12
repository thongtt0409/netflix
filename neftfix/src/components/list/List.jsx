import React, { useRef, useState } from "react";
import "./list.scss";
import ListItems from "./listitems/ListItems";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import ArrowForwardOutlined from "@material-ui/icons/ArrowForwardOutlined";

const List = ({ list }) => {
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    setIsMoved(true);
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${distance + 230}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);

      listRef.current.style.transform = `translateX(${distance - 230}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackOutlinedIcon
          className="sliderArrow left"
          onClick={() => {
            handleClick("left");
          }}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => (
            <ListItems index={index} item={item} />
          ))}
        </div>
        <ArrowForwardOutlined
          className="sliderArrow right"
          onClick={() => {
            handleClick("right");
          }}
        />
      </div>
    </div>
  );
};

export default List;
