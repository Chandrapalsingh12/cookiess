import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components";
import { Home, LikeItem,AllDeatils } from "./Pages";
import { Login, Joinus } from "./Pages/Auth";

import { Provider } from 'react-redux';
import store from "./state/store";

function App() {
  const [loader, setLoader] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="wrap">
          <div className="nav-section">
            <NavbarWrapper />
          </div>
          <div className="contant-section">
            <Routes>
              <Route path="/" element={<Home setLoader={setLoader} />} />
              <Route path="/like-item" element={<LikeItem setLoader={setLoader} />} />
              <Route path="/recipe-details/:id" element={<AllDeatils setLoader={setLoader} />} />
            </Routes>
          </div>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Joinus />} />
        </Routes>

        {loader && (
        <div className="loader">
          <div className="spineer"></div>
        </div>
      )}
      </BrowserRouter>

    </Provider>
  );
}

function NavbarWrapper() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/join") {
    return null;
  }

  return <Navbar />;
}

export default App;
