import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { RoundedInput } from "../Shared";
import { updateUser } from "../../Config/Services";
import { setUser } from "../../Store/Slices/UserSlice.js";
import ProfileCard from "../Shared/ProfileCard/ProfileCard";
import "./BodyMetrics.css";

function BodyMetrics() {
  // Šis Hook atgriež atsauci uz nosūtīšanas funkciju no Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [bmi, setBMI] = useState({ BMI: "", value: "" });
  const [userData, setUserData] = useState({
    weight: "",
    height: "",
  });

  useEffect(() => {
    // Nosaka lietotāja svaru un augumu, lai vēlāk aprēķinātu BMI
    // Plusa zīme nodrošina ka mainīgais būs skaitlis
    // Jautājuma zīme nodrošina ka mainīgais atgriež Undefined kļūdas vietā, gadījumā, ja vērtība ir NULL
    const BMI = calculateBMI(user?.weight, user?.height);

    setBMI(BMI);
    setUserData({
      weight: user?.weight,
      height: user?.height,
    });
  }, [user?.weight, user?.height]);

  // Vērtība event.target.name atspoguļo atribūtu name, kas norādīts ievades laukumā, savukārt event.target.value atspoguļo jaunāko vērtību no šī ievades lauka.
  // Veido jaunu stāvokli priekš ievades laukiem
  const handleChange = async (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setBMI(calculateBMI(userData?.weight, +userData?.height));
    await updateUser("users", user?.uid, { [e.target.name]: e.target.value });
    dispatch(setUser({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <div className="profile-data-container">
      <h1>Body Metrics</h1>
      <ProfileCard>
        <div>
          <div className="inputss">
            <div className="profile-input flex">
              <span>Weight</span>
              <RoundedInput
                name="weight"
                onChangeHandler={handleChange}
                value={userData?.weight}
              />
            </div>

            <div className="profile-input flex">
              <span>Height</span>
              <RoundedInput
                name="height"
                onChangeHandler={handleChange}
                value={userData?.height}
              />
            </div>

            <div className="profile-input flex">
              <span>BMI</span>
              <div className="value flex">
                <div>{bmi.BMI}</div>
              </div>
            </div>
          </div>
          <div className="result flex">
            <FaHeart className={`heart ${bmi.value} `} />
            <h1>
              You are{" "}
              {bmi.value === "Extremely" ? bmi.value + " Obese" : bmi.value}
            </h1>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
}
// Funkcija kas aprēķina BMI un atgriež lietotāja svara kategoriju
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
    value = "Extremely";
  }
  return { BMI: Math.round(BMI), value };
};

export default BodyMetrics;
