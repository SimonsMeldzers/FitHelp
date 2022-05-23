import { Button, TextContainer } from "../Shared/";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowModal } from "../../Store/Slices/ModalSlice";
import "./Achieve.css";

const text = {
  title: "Achieve your goals faster!",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac cursus eros. Integer sit amet massa ex. Cras varius felis a eros viverra semper. Curabitur ut molestie dui. Phasellus sed elit ligula. Aliquam erat volutpat. Duis sodales tellus tortor, sit amet posuere libero viverra vel. In vestibulum mauris quis ex finibus pharetra. Maecenas hendrerit eu elit a viverra. Proin fringilla sit amet ligula at volutpat. Pellentesque tempus faucibus elementum.",
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
