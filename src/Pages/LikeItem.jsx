import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../firebase";
import BatteryAlertOutlinedIcon from "@mui/icons-material/BatteryAlertOutlined";

function LikeItem(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isUSer, setIsUSer] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      setIsUSer(false);
    } else {
      props.setLoader(true)
      const starCountRef = ref(
        database,
        `/users/${auth.currentUser.uid}/bookmarks`
      );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const bookmarks = Object.keys(data).map((uri) => ({
            uri,
            ...data[uri],
          }));
          console.log(bookmarks[0].ingredients[0]);
          setBookmarks(bookmarks);
          setIsUSer(true);
          props.setLoader(false)
        } else {
          setBookmarks([]);
        }
      });
    }
  }, [setIsUSer]);

  return (
    <div>
      <h1>Your Save Recipies</h1>
      {isUSer ? (
        <>
          {bookmarks.map((bookmark) => (
            <div className="recipe-card" key={bookmark.uri}>

              <div className="recipe_details">
                <figure>
                  <img src={bookmark.image} alt={bookmark.label} />
                </figure>
                              <h2>{bookmark.label}</h2>

              </div>
      

              <ul className="ingredients">
              {Array.isArray(bookmark.ingredients) ? (
                <>
                  {bookmark.ingredients.map((ingredient, index) => (
                    <li key={index}><span>{ingredient}</span></li>
                  ))}
                </>
              ) : (
                <p>{bookmark.ingredients}</p>
              )}

              </ul>
            </div>
          ))}
        </>
      ) : (
        <>
          <BatteryAlertOutlinedIcon />
          <h2>Empty</h2>
        </>
      )}
    </div>
  );
}

export default LikeItem;
