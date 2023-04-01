import React, { useEffect, useState } from "react";
import { foodImage } from "../assets/ImageUrl";
import { selectedDrinks } from "../utils/DrinksName";
import { fetchSearchData } from "../server";
import { Link } from "react-router-dom";

function Card() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setLoader(true);
    fetchSearchData(selectedDrinks).then((res) => {
      setData(res);
      setLoader(false);
    });
  }, [selectedDrinks]);

  return (
    <div className="card-container">
      {data &&
        data.hits.map((item, ind) => (
          <Link key={ind} to={`/recipe-details/${item.recipe.uri.split("_")[1]}`}>
            <div
              
              className="cards"
              style={{ backgroundImage: `url(${item.recipe.image})` }}
            >
              <div className="card-text">
                <span>{item.recipe.label}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Card;
