import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../Shared/ProfileCard/ProfileCard";
import { getData } from "../../Config/Services";

import { setRecommended } from "../../Store/Slices/RecommendedSlice";

import "./Recommendations.css";
import { Button, Card, Input, RoundedInput } from "../Shared";

function Recomendations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const [diets, setDeists] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    (async () => {
      const res = calculateBMI(user?.weight, user?.height);
      // Saņem datus priekš dietas un vingrojumiem
      const response = await getData("dietsandexercises", res?.value);
      setDeists(response?.diets);
      setExercises(response?.exercises);
    })();
  }, [user?.height, user?.weight]);

  // Parāda logu ar bildi, aprakstu, nosaukumu nozpiežot uz vienu no rekomendācijām
  function handleClick(images, title, description, steps, recommended) {
    dispatch(
      setRecommended({ images, title, description, steps, recommended })
    );
    navigate("/recommended-detail");
  }

  return (
    <div className=" recomendations-container">
      <h1>Recommendations</h1>
      <div className="flex flex-wrapper">
        <div style={{ width: "90%" }}>
          <ProfileCard>
            <h3 style={{ textAlign: "center" }}>Exercises</h3>
            <ul>
              {exercises?.map((exercise, index) => (
                <li
                  key={index}
                  className="flex recomendation-item"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleClick(
                      exercise.images,
                      exercise.title,
                      exercise.description,
                      exercise.steps,
                      exercise.recommended
                    )
                  }
                >
                  <div className="pic">
                    <img
                      className="pic-img"
                      src={exercise.images[0]}
                      alt="exercise img"
                    />
                  </div>
                  <p>{exercise.title}</p>
                </li>
              ))}
            </ul>
          </ProfileCard>
        </div>
        <div className="diets">
          <ProfileCard>
            <h3 style={{ textAlign: "center" }}>Diets</h3>
            <ul>
              {diets?.map((diet, index) => (
                <li
                  key={index}
                  className="flex recomendation-item"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleClick(
                      diet.images,
                      diet.title,
                      diet.description,
                      diet.steps,
                      diet.recommended
                    )
                  }
                >
                  <div className="pic">
                    <img
                      className="pic-img"
                      src={diet.images[0]}
                      alt="diet img"
                    />
                  </div>
                  <p>{diet.title}</p>
                </li>
              ))}
            </ul>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}

// Funkcija kas atgriež BMI
const calculateBMI = (weight, height) => {
  const heightInMeter = height / 100;
  const BMI = weight / (heightInMeter * heightInMeter);
  let value;
  if (BMI < 18.5) {
    value = "UnderWeight";
  } else if (BMI >= 18.5 && BMI <= 25) {
    value = "Healthy";
  } else if (BMI > 25 && BMI <= 30) {
    value = "Overweight";
  } else if (BMI > 30 && BMI <= 35) {
    value = "Obese";
  } else if (BMI > 35) {
    value = "Extemely";
  }
  return { BMI, value };
};
export default Recomendations;
