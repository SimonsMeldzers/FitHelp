import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { setLocation } from "../../../Store/Slices/LocationSlice";
import { setShowModal } from "../../../Store/Slices/ModalSlice";
import { useNavigate } from "react-router-dom";

import { setUser } from "../../../Store/Slices/UserSlice";
import { setIsAuthenticated } from "../../../Store/Slices/AuthSlice";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Funkcija kas nodrošina lietotāja izlogošanos
  const sign_out = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        // Sign-out successful.
        dispatch(setUser({}));
        dispatch(setIsAuthenticated(false));
      })
      .catch((error) => {
        // An error happened.
      });
  };
  
  const clickHandler = (payload) => {
    // Ja ir autorizējies nav jārāda autorizācijas logs
    if (isAuthenticated) {
      dispatch(setShowModal(false));
      navigate(payload);
    // Ja nav autorizējies tad jārāda autorizācijas logs
    } else {
      dispatch(setShowModal(true));
      dispatch(setLocation(payload));
    }
  };

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title ">
          <Link className="nav-titlee " to="/">
            FitHelp
          </Link>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span> </span> <span> </span> <span> </span>
        </label>
      </div>
      <div className="nav-links">
        <a
          onClick={() => {
            clickHandler("/exercise-diets");
          }}
        >
          <li className="list-item ">Exercises</li>
        </a>
        <a
          href="#diet"
          onClick={() => {
            clickHandler("/exercise-diets");
          }}
        >
          <li className="list-item">Diet</li>
        </a>
        <a
          onClick={() => {
            clickHandler("/calendar");
          }}
        >
          <li className="list-item">Calendar</li>
        </a>
        <a
          onClick={() => {
            clickHandler("/data");
          }}
        >
          <li className="list-item">Data</li>
        </a>
        <a
          onClick={() => {
            clickHandler("/profile");
          }}
        >
          <li className="list-item">Profile</li>
        </a>
        {/* Ja ir autorizējies, parāda opciju sign_out*/}
        {isAuthenticated && (
          <a onClick={sign_out} href="#" className="list-item">
            Log OUT
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
