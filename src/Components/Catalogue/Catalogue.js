import { Button, TextContainer } from "../Shared";
import { useNavigate } from "react-router-dom";
import { setShowModal } from "../../Store/Slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

import "./Catalogue.css";

const text = {
  title: "See our catalogue of diets and training!",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac cursus eros. Integer sit amet massa ex. Cras varius felis a eros viverra semper. Curabitur ut molestie dui. Phasellus sed elit ligula. Aliquam erat volutpat. Duis sodales tellus tortor, sit amet posuere libero viverra vel. In vestibulum mauris quis ex finibus pharetra. Maecenas hendrerit eu elit a viverra. Proin fringilla sit amet ligula at volutpat. Pellentesque tempus faucibus elementum.",
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
