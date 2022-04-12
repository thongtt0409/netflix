import React, { useEffect, useState } from "react";
import Feature from "../../components/Featured/Feature";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import axios from "axios";

import "./home.scss";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`lists${type ? "?type=" + type : ""}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2RhMGJhNmQwM2Y0ODQ5OWY5OWM0NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTQ5MzQ1MCwiZXhwIjoxNjQ5OTI1NDUwfQ.cc7ViLOxT9VzNRelNAGY-R3qdAQyp-jqDNWDsgBelK8",
          },
        });
        // console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Feature type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
