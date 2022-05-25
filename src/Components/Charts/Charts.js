import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "../Shared";
import { getData } from "../../Config/Services";
import { setGraphData } from "../../Store/Slices/GraphSlice";
import "./Charts.css";

function Charts() {
  // Šis Hook atgriež atsauci uz nosūtīšanas funkciju no Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { graphData } = useSelector((state) => state.graph);
  const [showAble, setShowAble] = useState({});
  const [slectedClass, setSelectedClass] = useState({
    sevenDays: true,
    oneMonth: false,
    sixMonth: false,
    oneYear: false,
  });

  // Dabūn datus no Firebase priekš pirmās grafiku renderēšanas
  useEffect(() => {
    (async () => {
      const res = await getData("graphdata", user?.uid);
      dispatch(
        setGraphData({
          weight: formattingData(res.weight),
          BMI: formattingData(res.BMI),
          calories: formattingData(res.calories),
          protein: formattingData(res.protein),
        })
      );
    })();
  }, [dispatch, user?.uid]);


  return (
    <div className="charts-container">
      <Chart
        heading="Protein Consumption"
        data={graphData?.protein}
        unit="Protein"
      />
      <Chart
        heading="Calories Consumption"
        data={graphData?.calories}
        unit="Calories"
      />
      <Chart heading="BMI" data={graphData?.BMI} unit="BMI" />
      <Chart heading="Weight" data={graphData?.weight} unit="Weight" />
    </div>
  );
}

// Pārvērš datuma milisekundes normālajā datuma formātā
const formattingData = (obj) => {
  let newObj = [];
  for (let i = 0; i < obj?.length; i++) {
    const date = new Date(+obj[i].date).toLocaleDateString();
    const value = obj[i].value;
    newObj.push({ date, value });
  }
  return newObj;
};

export default Charts;