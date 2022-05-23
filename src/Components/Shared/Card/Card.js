import { useDispatch } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import { setShowModal } from "../../../Store/Slices/ModalSlice";
import "./Card.css";

function Card({ children, setShowChangeAvatar }) {
  const dispatch = useDispatch();
  return (
    <div className="card-container">
      <div className="card-content">
        {setShowChangeAvatar ? (
          <IoMdCloseCircle
            onClick={() => {
              setShowChangeAvatar(false);
            }}
            className="close-icon"
          />
        ) : (
          <IoMdCloseCircle
            onClick={() => dispatch(setShowModal(false))}
            className="close-icon"
          />
        )}

        {children}
      </div>
    </div>
  );
}

export default Card;
