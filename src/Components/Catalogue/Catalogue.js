import { Button, TextContainer } from "../Shared";
import { useNavigate } from "react-router-dom";
import { setShowModal } from "../../Store/Slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

import "./Catalogue.css";

const text = {
  title: "See our catalogue of diets and training!",
  desc: "We have multiple specially hand-picked training programms and diet asorti for everyone. Our large catalogue of options won't leave you indifferent! We also provide a recommendation system, based on your body metrcises, which is going to make picking the right thing for you a lot easier! See the options now, it's FREE!",
};

function Catalogue() {
  // Šis Hook atgriež atsauci uz nosūtīšanas funkciju no Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOnClick = () => {
    // Ja lietotājs ir autorizējies, nav jārāda autorizācijas logs, un jāpāriet uz exercise-diets lapu
    if (isAuthenticated) {
      dispatch(setShowModal(false));
      navigate("/exercise-diets");
    // Ja lietotājs nav autorizējies, jāparāda autorizācijas logu
    } else {
      dispatch(setShowModal(true));
    }
  };
  return (
    <div className="flex catalouge-container">
      <TextContainer text={text}>
        <div className="buttons">
          <span onClick={handleOnClick}>
            <Button text="Exercises" />
          </span>{" "}
          <span onClick={handleOnClick}>
            <Button text="Meals" />
          </span>{" "}
        </div>{" "}
      </TextContainer>{" "}
      <div>
        <img
          src={`/assets/undraw_personal_trainer_ote3-removebg-preview 1.svg`}
          alt="catalouge Logo"
        />
      </div>{" "}
    </div>
  );
}

export default Catalogue;
