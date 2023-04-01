import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ProfileImage } from "../assets/ImageUrl";
import GridViewIcon from "@mui/icons-material/GridView";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { auth, logout, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { useDispatch } from "react-redux";
import { updateSearchQuery } from "../state/Action/search";

function Navbar() {
  const [name, setName] = useState("");
  const [isAuth, setisAuth] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isActive, setIsActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleHamburger = () => {
    setIsActive(!isActive);
    setShowSidebar(!showSidebar);
    document.body.classList.toggle("no-scroll");
  };
  // Redux Code
  const dispatch = useDispatch();

  const handleSearchQueryChange = (e) => {
    e.preventDefault();

    // const query = event.target.value;
    dispatch(updateSearchQuery(searchTerm));
  };
  // Redux Code

  useEffect(() => {
    if (loading) return;
    if (user) {
      console.log(user);
      setName(user.displayName);
      setisAuth(true);
      fetchUserName();
    } else {
      setisAuth(false);
    }
  }, [user, loading]);

  // const isAuth = useSelector(state => state.isAuth);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
    } catch (err) {
      alert("An error occured while fetching user data");
    }
  };

  return (
    <div className="main-nav">
      <div
        className={`hamburger ${isActive ? "active" : ""}`}
        onClick={toggleHamburger}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`full-screen-cover ${isActive ? "active" : ""}`}>
        <div className="slide">Slide content goes here</div>
        <div className="cross" onClick={toggleHamburger}>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "active" : ""}`}>
        {/* Sidebar content goes here */}
      </div>

      <div className="top-nav">
        <div className="logo">
          <h2>Cookiess</h2>
        </div>

        <div className="search-bar">
          <form onSubmit={handleSearchQueryChange}>
            <input 
              placeholder="Search Recipes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {isAuth ? (
          <div className={`profile ${showSidebar ? "show" : ""}`}>
            <div className="profile-image">
              <img src={ProfileImage} alt="Profile Image" />
            </div>
            <div className="profile-info">
              <span>{name}</span>
            </div>
          </div>
        ) : (
          <div className="user-auth">
            <button>
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </button>
            <button>
              <Link to="/join" style={{ color: "white" }}>
                Join
              </Link>
            </button>
          </div>
        )}
      </div>
      <div  className={`left-nav ${showSidebar ? "show" : ""}`}>
        <div className="nav-item">
          <h2>Discover</h2>
          <ul>
            <li>
              <NavLink to="/">
                <div className="icons">
                  {" "}
                  <GridViewIcon />
                  Home
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/like-item">
                <div className="icons">
                  {" "}
                  <FavoriteBorderIcon />
                  For You
                </div>
              </NavLink>
            </li>
          </ul>

          {isAuth ? (
            <form>
              <button id="logout-btn" onClick={logout}>
                Logout
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
