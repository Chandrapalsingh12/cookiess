import React, { useState, useEffect } from "react";
import { Card, DailyCard } from "../components";
import { useSelector } from "react-redux";

import { fetchSearchData } from "../server";

function Home(props) {
  const [data, setData] = useState("");

  const searchQuery = useSelector((state) => state.search.query);

  useEffect(() => {
    props.setLoader(true)
    fetchSearchData(searchQuery).then((res) => {
      setData(res);
      props.setLoader(false)
    });
  }, [searchQuery, ]);

  return (
    <>
      <Card />
      <h1>Daily Best Recipies of {searchQuery}</h1>

      <div className="dailycard-container">
        {data &&
          data.hits.map((item, ind) => (
            <DailyCard
              data={item}
              key={ind}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
