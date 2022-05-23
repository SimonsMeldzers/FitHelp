import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../Components/Shared";
import { signInUser } from "../../Config/Services";
import { setUser } from "../../Store/Slices/UserSlice";
import { setIsAuthenticated } from "../../Store/Slices/AuthSlice";
import { setGraphData } from "../../Store/Slices/GraphSlice";
import { setShowModal } from "../../Store/Slices/ModalSlice";
import "./Login.css";

function LogIn({ setAuthStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.location);
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const emailInput = useRef();
  
  // Funkcija, kas uzliek fokusu uz e-pasta ievades lauku
  useEffect(() => {
    emailInput.current.focus();
    setErrors({});
  }, []);

  // Vērtība event.target.name atspoguļo atribūtu name, kas norādīts ievades laukumā, savukārt event.target.value atspoguļo jaunāko vērtību no šī ievades lauka.
  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  // Kļūdu apstrāde priekš autorizēšanās 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (logInData.email.length === 0) {
      setErrors({
        ...errors,
        email: "* Email Is Required",
      });
      return;
    }
    if (!logInData.password) {
      setErrors({
        ...errors,
        password: "* Password Is Required",
      });
      return;
    }
    try {
      //Kad lietotājs autorizējies, jāielāde konkrēta lietotāja grafiku dati
      const { user, graphData } = await signInUser(logInData);
      if (user) {
        dispatch(setUser(user));
        dispatch(
          setGraphData({
            weight: formattingData(graphData?.weight),
            BMI: formattingData(graphData?.BMI),
            calories: formattingData(graphData?.calories),
            protein: formattingData(graphData?.protein),
          })
        );
        // Pēc autorizēšanās nerādīt modal logu
        dispatch(setIsAuthenticated(true));
        setLoading(false);
        dispatch(setShowModal(false));

        // Ja links ir pareizs tad pāriet pēc tā linka
        if (url) {
          navigate(url);
        }
      }
      dispatch(setShowModal(false));
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-header flex">
        <h1>
          Log <br />
          In
        </h1>
        <div className="link-container">
          <span>Don’t have an accaunt?</span>
          <br />
          <span
            className="link"
            onClick={() => {
              setAuthStep(2);
            }}
          >
            Register
          </span>
        </div>
      </div>
      <form type="submit">
        <Input
          onChangeHandler={handleChange}
          value={logInData.email}
          innerRef={emailInput}
          placeholder="E-Mail"
          type="email"
          isEmpty={errors?.email ? true : false}
          name="email"
        />
        <p className="error-message">{errors?.email && errors.email}</p>
        <Input
          onChangeHandler={handleChange}
          value={logInData.password}
          placeholder="Password"
          type="password"
          isEmpty={errors?.password ? true : false}
          name="password"
        />
        <p className="error-message">{errors?.password && errors.password}</p>
        <div className="btn-container">
          <Button
            handleClick={handleSubmit}
            type="submit"
            text={loading ? "Please Wait ..." : "Log In"}
          />
        </div>
      </form>
    </div>
  );
}

// Funkcija kas maina datumu no mileskundēm uz datuma formātu.
const formattingData = (obj) => {
  let newObj = [];
  for (let i = 0; i < obj?.length; i++) {
    const date = new Date(+obj[i].date).toLocaleDateString();
    const value = obj[i].value;
    newObj.push({ date, value });
  }
  return newObj;
};
export default LogIn;
