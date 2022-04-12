import React, { useContext, useState } from "react";
import "./navnar.scss";
import SearchIcon from "@material-ui/icons/Search";
import Notifications from "@material-ui/icons/Notifications";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="" srcset="" />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>

          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>

          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
