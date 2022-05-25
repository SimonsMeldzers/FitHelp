import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RoundedInput, TextContainer, Button } from "../Shared";
import { updateNestedData } from "../../Config/Services.js";
import {
  updateWeight,
  updateBMI,
  updateCalories,
  updateProtein,
} from "../../Store/Slices/GraphSlice";
import "./Instruction.css";

const text = {
  title: "How to use the graphs?",
  desc: "To get started, simply input your current weight, height, consumed calories and protein. Then click the submit button, and BOOM, you added your first graph data, to start seeing results, comeback here everyday, and input these values to track your progress. You can input these values as often as you want, it's going to show the values the exact same way.",
  isWhite: true,
};

function Instructions() {
  // Šis Hook atgriež atsauci uz nosūtīšanas funkciju no Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    caloriesConsumed: "",
    proteinConsumed: "",
  });
  // Funkcija, kas nodrošina maiņas ievades laukā
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Funkcija kas tiek izsaukta kad notiek maiņas ievades laukā
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData?.weight && formData?.height) {
        const heightInMeter = formData?.height / 100;
        const calculatedBMI =
          formData?.weight / (heightInMeter * heightInMeter);
        const BMI = {
          date: new Date().getTime(),
          value: Math.round(calculatedBMI),
        };

        const res = await updateNestedData("graphdata", user?.uid, "BMI", BMI);
        // Atjaunina grafikus / Pārrenderē tos
        dispatch(updateBMI(formattingData(res)));
      }
      if (formData?.caloriesConsumed) {
        const obj = {
          date: new Date().getTime(),
          value: formData?.caloriesConsumed,
        };
        const res = await updateNestedData(
          "graphdata",
          user?.uid,
          "calories",
          obj
        );

        dispatch(updateCalories(formattingData(res)));
      }
      if (formData?.proteinConsumed) {
        const obj = {
          date: new Date().getTime(),
          value: formData?.proteinConsumed,
        };
        const res = await updateNestedData(
          "graphdata",
          user?.uid,
          "protein",
          obj
        );

        dispatch(updateProtein(formattingData(res)));
      }
      if (formData?.weight) {
        const obj = {
          date: new Date().getTime(),
          value: formData?.weight,
        };
        const res = await updateNestedData(
          "graphdata",
          user?.uid,
          "weight",
          obj
        );
        dispatch(updateWeight(formattingData(res)));
      }

      setFormData({
        weight: "",
        height: "",
        caloriesConsumed: "",
        proteinConsumed: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in Updating Nested Array");
    }
  };
  return (
    <div className="flex instructions-container">
      <div>
        <h3>Input Values</h3>
        <form className="form">
          <div className="flex inputs-container">
            <div className="flex input-container">
              <label>Weight (KG)</label>
              <RoundedInput
                name="weight"
                value={formData.weight}
                onChangeHandler={handleChange}
                type="number"
                placeholder="Weight (KG)"
              />
            </div>
            <div className="flex input-container">
              <label>Height (CM)</label>
              <RoundedInput
                name="height"
                value={formData.height}
                onChangeHandler={handleChange}
                type="number"
                placeholder="Height (CM)"
              />
            </div>
          </div>

          <div className="flex inputs-container">
            <div className="flex input-container">
              <label>Calories Consumed</label>
              <RoundedInput
                name="caloriesConsumed"
                value={formData.caloriesConsumed}
                onChangeHandler={handleChange}
                type="number"
                placeholder="Calories Consumed"
              />
            </div>
            <div className="flex input-container">
              <label>Protein Consumed</label>
              <RoundedInput
                name="proteinConsumed"
                value={formData.proteinConsumed}
                onChangeHandler={handleChange}
                type="number"
                placeholder="Protein Consumed"
              />
            </div>
          </div>

          {/* <div className="flex inputs-container">
            <div className="flex input-container">
              <label>Height</label>
              <RoundedInput
                name="height2"
                value={formData.height2}
                onChangeHandler={handleChange}
                type="number"
              />
            </div>
            <div className="flex input-container">
              <label>Date</label>
              <RoundedInput
                name="date"
                value={formData.date}
                onChangeHandler={handleChange}
                type="number"
              />
            </div>
          </div> */}
          <div className="flex btn-container">
            <Button
              handleClick={handleSubmit}
              text={loading ? "Please Wait ..." : "Submit"}
            />
          </div>
        </form>
      </div>
      <div className="instruction-text-container">
        <TextContainer text={text}></TextContainer>
      </div>
    </div>
  );
}

// Funkcija kas pārvērš iegūto datumu no milisekundēm uz normālu datuma formātu
const formattingData = (obj) => {
  let newObj = {};
  newObj.date = new Date(+obj.date).toLocaleDateString();
  newObj.value = obj.value;
  return newObj;
};

export default Instructions;
