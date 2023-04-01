const querySring = {
  app_id: "ccf161a4",
  app_key: "f233f18eb83b2301cb082087bf52e7f3",
};
// import React from 'react';
// import dotenv from 'dotenv';

// dotenv.config(); 

// .env not working
// const app_id = process.env.APP_ID
// const app_key = process.env.APP_KEY

export const fetchSearchData = async (query) => {
  const { app_id, app_key } = querySring;
  if(query!==""){
    try {
      const data = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`
      );
      const response = await data.json();
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  else{
    console.log("Please Enter Something");
  }
};

export const fetchDetailsByID = async (id) => {
  const { app_id, app_key } = querySring;

  try {
    const data = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${app_id}&app_key=${app_key}`);
    const response = await data.json()
    return response

  } catch (e) {
    alert(`${e} somthing went wrong`);
  }
};


