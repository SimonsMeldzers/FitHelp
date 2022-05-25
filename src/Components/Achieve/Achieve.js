import { Button, TextContainer } from "../Shared/";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowModal } from "../../Store/Slices/ModalSlice";
import "./Achieve.css";

const text = {
  title: "Achieve your goals faster!",
  desc: "Achieve your desired physique together, with FitHelp. Data shows, that using an online fitness assistant, drastically improves the progress of user's body appearance. By choosing us we guarantee drastic results in just 1 month! Our ultimate goal is making an app that can improve everybody's life, and our app is completely FREE!",
  isWhite: true,
};

function Achieve() {
  // Definējam "vai lietotājs ir autorizējies?"
  const { isAuthenticated } = useSelector((state) => state.auth);

   // Ja lietotājs ir autorizējies, tad nospiežot pogu lietotāju aiznes uz viņa profilu, ja nē, atveras autorizēšanās lauks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnClick = () => {
    if (isAuthenticated) {
      dispatch(setShowModal(false));
      navigate("/profile");
    } else {
      dispatch(setShowModal(true));
    }
  };
  return (
    <div className="flex achieve-container">
      <div>
        <img
          src={`/assets/undraw_New_year_2022_bxec__1_-removebg-preview 1.svg`}
          alt="achieve logo"
        />
      </div>
      <TextContainer text={text}>
        <Button text="Start Now" handleClick={handleOnClick} />
      </TextContainer>
    </div>
  );
}

export default Achieve;
