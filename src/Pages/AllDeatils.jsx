import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailsByID } from "../server";

function AllDeatils(props) {
  const [data, setData] = useState("");
  const { id } = useParams();

  useEffect(() => {
    props.setLoader(true)
    fetchDetailsByID(id).then((res) => {
      setData(res);
      props.setLoader(false)
    });
  }, []);

  return (
    <>
      {data === "" ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <div className="recipe-card">
            <div className="description">
              <h1>{data.recipe.label}</h1>

              <ul>
                <h2>healthLabels</h2>
                {data.recipe.healthLabels.slice(0, 5).map((item, key) => (
                  <li key={key}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <figure>
                <img src={data.recipe.image} />
                <figcaption>{data.recipe.source}</figcaption>
              </figure>
            </div>

            <div></div>
            <div>
              <div className="next">
                <a href="#ingredients">Ingredients 👇</a>
              </div>
            </div>
          </div>

          <div id="ingredients"></div>

          <div className="recipe-card">
            <div className="recipe_details">
              <figure>
                <img src={data.recipe.images.REGULAR.url} />
              </figure>
            </div>
            <div>
              <h2>The Ingredients</h2>

              <ul className="ingredients">
                {data.recipe.ingredientLines.map((item, key) => (
                  <li key={key}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div></div>
          </div>
        </>
      )}
    </>
  );
}

export default AllDeatils;
