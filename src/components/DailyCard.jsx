import React, { useState } from "react";
import { foodImage } from "../assets/ImageUrl";
import BookmarkHeartIcon from "../assets/Bookmarkbtn";
import { Link } from "react-router-dom";
import { db, auth, database } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

function DailyCard(props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const handleBookmarkClick = () => {
    if(user){
      set(
        ref(
          database,
          `/users/${auth.currentUser.uid}/bookmarks/${props.data.recipe.uri.split("_")[1]}`
        ),
        {
          label: props.data.recipe.label,
          image: props.data.recipe.image,
          ingredients: props.data.recipe.ingredientLines,
        }
      );
  
      console.log("Added");
      setIsBookmarked(true);
    }
    else{
      alert("Please Login For Bookmark The Recipe")
    }


  };
  return (
    <div className="daily-card">
      <img className="dailycard-image" src={props.data.recipe.image} alt="hi" />
      <div className="dailycard-content">
        <h2 className="dailycard-title">{props.data.recipe.label}</h2>
        <Link to={`/recipe-details/${props.data.recipe.uri.split("_")[1]}`}>
          <button>View More</button>{" "}
        </Link>
        <button
          className="bookmark-button"
          onClick={handleBookmarkClick}
          disabled={isBookmarked}
        >
          {isBookmarked ? "Bookmarked!" : <BookmarkHeartIcon />}
        </button>
      </div>
    </div>
  );
}

export default DailyCard;
