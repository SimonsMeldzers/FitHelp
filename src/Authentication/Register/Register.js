import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../Components/Shared";
import { createUser } from "../../Config/Services";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Store/Slices/UserSlice";
import { setGraphData } from "../../Store/Slices/GraphSlice";
import { setShowModal } from "../../Store/Slices/ModalSlice";
import { setIsAuthenticated } from "../../Store/Slices/AuthSlice";
import "./Register.css";

function Register({ setAuthStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.location);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    gender: "Male",
    weight: "",
    height: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const firstNameInput = useRef();

  // Funkcija kas atsaucas uz pirmā vārda ievadi
  useEffect(() => {
    firstNameInput.current.focus();
    setErrors({});
  }, []);

  // Funkcija, kura pēc vajadzības atiestata stāvokļus unmount(piemēram ja izdzēšās elements no DOM)
  useEffect(() => {
    return () => {
      setErrors({});
      setRegisterData({});
    };
  }, []);

  // Funkcija, kas var mainīt vērtības dažādos reģistrācijas ievades laukos
  const handleChange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

   // Funkcija dzimuma mainīšanai
  const handleGenderChange = () => {
    if (registerData.gender === "Male") {
      setRegisterData({
        ...registerData,
        gender: "Female",
      });
    } else if (registerData.gender === "Female") {
      setRegisterData({
        ...registerData,
        gender: "Male",
      });
    }
  };

  // Kļūdu apstrāde priekš reģistrēšanās
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (registerData.firstName.length === 0) {
        setErrors({
          ...errors,
          firstName: "* First Name Is Required",
        });
        setLoading(false);
        return;
      }
      if (registerData.lastName === "") {
        setErrors({
          ...errors,
          lastName: "* Last Name Is Required",
        });
        setLoading(false);
        return;
      }
      if (registerData.email === "") {
        setErrors({
          ...errors,
          email: "* Email Is Required",
        });
        setLoading(false);
        return;
      }

      if (registerData.password === "") {
        setErrors({
          ...errors,
          password: "* Password is Required",
        });
        setLoading(false);
        return;
      }

      if (registerData.repeatPassword === "") {
        setErrors({
          ...errors,
          repeatPassword: "* Repeat Password is Required",
        });
        setLoading(false);
        return;
      }

      if (registerData.weight === "") {
        setErrors({
          ...errors,
          weight: "* Weight is Required",
        });
        setLoading(false);
        return;
      }

      if (registerData.height === "") {
        setErrors({
          ...errors,
          height: "* Height is Required",
        });
        setLoading(false);
        return;
      }

      if (registerData.dob === "") {
        setErrors({
          ...errors,
          dob: "* DOB is Required",
        });
        setLoading(false);
        return;
      }
      if (registerData.password !== registerData.repeatPassword) {
        setErrors({
          ...errors,
          repeatPassword: "* Password is not match",
        });
        setLoading(false);
        return;
      }
      // Jauna lietotāja dzimšanas datums milisekundēs
      const dateInMili = getDateInMiliSec(registerData.dob);
      const newUser = {
        ...registerData,
        dob: dateInMili,
      };
      const { user, graphData } = await createUser(newUser);

      // Jauna lietotāja grafika datu formatēšana
      dispatch(setUser(user));
      dispatch(
        setGraphData({
          weight: formattingData(graphData?.weight),
          BMI: formattingData(graphData?.BMI),
          calories: formattingData(graphData?.calories),
          protein: formattingData(graphData?.protein),
        })
      );
      // Kad lietotājs autorizējies, nav jārāda modal logs
      dispatch(setIsAuthenticated(true));
      dispatch(setShowModal(false));
      if (url) {
        navigate(url);
      }
      setLoading(false);
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        gender: "Male",
        weight: "",
        height: "",
        dob: "",
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // Funkcija kas pārvērš datumu milisekundēs lai glabātu datubāzē
  const getDateInMiliSec = (payload) => {
    const date = new Date(`${payload}`);
    const miliSec = date.getTime();
    return miliSec;
  };

  return (
    <div className="register-container">
      <div className="register-header flex">
        <h1>
          New <br />
          Accaunt
        </h1>
        <div className="link-container">
          <span>
            Already have <br /> an <br /> accaunt?
          </span>
          <br />
          <span
            className="link"
            onClick={() => {
              setAuthStep(1);
            }}
          >
            Log In
          </span>
        </div>
      </div>

      <form type="submit">
        <div className="flex input-containerr">
          <div>
            <Input
              onChangeHandler={handleChange}
              value={registerData.firstName}
              innerRef={firstNameInput}
              placeholder="First Name"
              type="text"
              isEmpty={errors?.firstName ? true : false}
              name="firstName"
            />
            <p className="error-message">
              {errors?.firstName && errors.firstName}
            </p>
          </div>
          <div>
            <Input
              onChangeHandler={handleChange}
              value={registerData.lastName}
              placeholder="last Name"
              type="text"
              isEmpty={errors?.lastName ? true : false}
              name="lastName"
            />
            <p className="error-message">
              {errors?.lastName && errors.lastName}
            </p>
          </div>
        </div>
        <Input
          onChangeHandler={handleChange}
          value={registerData.email}
          placeholder="E-mail"
          type="email"
          isEmpty={errors?.email ? true : false}
          name="email"
        />
        <p className="error-message">{errors?.email && errors.email}</p>
        <div className="flex input-containerr">
          <div>
            <Input
              onChangeHandler={handleChange}
              value={registerData.password}
              placeholder="Password"
              type="password"
              isEmpty={errors?.password ? true : false}
              name="password"
            />
            <p className="error-message">
              {errors?.password && errors.password}
            </p>
          </div>

          <div>
            <Input
              onChangeHandler={handleChange}
              value={registerData.repeatPassword}
              placeholder="Repeat Password"
              type="password"
              isEmpty={errors?.repeatPassword ? true : false}
              name="repeatPassword"
            />
            <p className="error-message">
              {errors?.repeatPassword && errors.repeatPassword}
            </p>
          </div>
        </div>
        <label>Gender</label>
        <br />
        <div className="gender flex">
          <div
            className={`gender-item ${
              registerData.gender === "Male" && "selected-item"
            }`}
            onClick={handleGenderChange}
          >
            Male
          </div>
          <div
            className={`gender-item ${
              registerData.gender === "Female" && "selected-item"
            }`}
            onClick={handleGenderChange}
          >
            Female
          </div>
        </div>

        <div className="flex input-containerr">
          <div>
            <Input
              onChangeHandler={handleChange}
              value={registerData.weight}
              placeholder="Weight (KG)"
              type="number"
              isEmpty={errors?.password ? true : false}
              name="weight"
            />
            <p className="error-message">{errors?.weight && errors.weight}</p>
          </div>

          <div>
            <Input
              onChangeHandler={handleChange}
              value={registerData.height}
              placeholder="Height (CM)"
              type="number"
              isEmpty={errors?.height ? true : false}
              name="height"
            />
            <p className="error-message">{errors?.height && errors.height}</p>
          </div>
        </div>

        <Input
          onChangeHandler={handleChange}
          value={registerData.dob}
          placeholder="Date of birth (DD/MM/YYYY)"
          type="date"
          isEmpty={errors?.dob ? true : false}
          name="dob"
        />
        <p className="error-message">{errors?.dob && errors.dob}</p>
        <div className="btn-container">
          <Button
            handleClick={handleSubmit}
            type="submit"
            text={loading ? "Please Wait ..." : "Register"}
          />
        </div>
      </form>
    </div>
  );
}

// Function that converts date's from mili seconds to date
const formattingData = (obj) => {
  let newObj = [];
  for (let i = 0; i < obj?.length; i++) {
    const date = new Date(+obj[i].date).toLocaleDateString();
    const value = obj[i].value;
    newObj.push({ date, value });
  }
  return newObj;
};

export default Register;
