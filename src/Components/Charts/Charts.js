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

  // Parādā pirmās nedēļas datus pirmajā renderēšanas reizē
  useEffect(() => {
    setShowAble({
      protein: handleRangeChange(7, graphData?.protein),
      weight: handleRangeChange(7, graphData?.weight),
      BMI: handleRangeChange(7, graphData?.BMI),
      calories: handleRangeChange(7, graphData?.calories),
    });
  }, [graphData]);

  // Parāda 7 dienu datus
  const showSevenDayData = () => {
    setShowAble({
      protein: handleRangeChange(7, graphData?.protein),
      weight: handleRangeChange(7, graphData?.weight),
      BMI: handleRangeChange(7, graphData?.BMI),
      calories: handleRangeChange(7, graphData?.calories),
    });
    setSelectedClass({
      sevenDays: true,
      oneMonth: false,
      sixMonth: false,
      oneYear: false,
      total: false,
    });
  };

  // Parāda 1 mēneša datus
  const showOneMonthData = () => {
    setShowAble({
      protein: handleRangeChange(30, graphData?.protein),
      weight: handleRangeChange(30, graphData?.weight),
      BMI: handleRangeChange(30, graphData?.BMI),
      calories: handleRangeChange(30, graphData?.calories),
    });

    setSelectedClass({
      sevenDays: false,
      oneMonth: true,
      sixMonth: false,
      oneYear: false,
      total: false,
    });
  };

  // Parāda sešu mēnešu datus
  const showSixMonthData = () => {
    setShowAble({
      protein: handleRangeChange(182, graphData?.protein),
      weight: handleRangeChange(182, graphData?.weight),
      BMI: handleRangeChange(182, graphData?.BMI),
      calories: handleRangeChange(182, graphData?.calories),
    });

    setSelectedClass({
      sevenDays: false,
      oneMonth: false,
      sixMonth: true,
      oneYear: false,
      total: false,
    });
  };

  // Parāda 1 gada datus
  const showOneYearData = () => {
    setShowAble({
      protein: handleRangeChange(365, graphData?.protein),
      weight: handleRangeChange(365, graphData?.weight),
      BMI: handleRangeChange(365, graphData?.BMI),
      calories: handleRangeChange(365, graphData?.calories),
    });

    setSelectedClass({
      sevenDays: false,
      oneMonth: false,
      sixMonth: false,
      oneYear: true,
      total: false,
    });
  };
  // Parāda visa laika datus
  const showTotalData = () => {
    setShowAble({
      protein: graphData?.protein,
      weight: graphData?.weight,
      BMI: graphData?.BMI,
      calories: graphData?.calories,
    });

    setSelectedClass({
      sevenDays: false,
      oneMonth: false,
      sixMonth: false,
      oneYear: false,
      total: true,
    });
  };
  return (
    <div className="charts-container">
      <div className="flex range-container">
        <h3>Select the Range to Display Graph</h3>
        <br />
        <div className="btns-container">
          <span
            className={`range ${slectedClass.sevenDays && "selected-range"}`}
            onClick={() => {
              showSevenDayData();
            }}
          >
            Last 7 Days
          </span>

          <span
            className={`range ${slectedClass.oneMonth && "selected-range"}`}
            onClick={() => {
              showOneMonthData();
            }}
          >
            Last One Month
          </span>
          <span
            className={`range ${slectedClass.sixMonth && "selected-range"}`}
            onClick={() => {
              showSixMonthData();
            }}
          >
            Last Six Month
          </span>
          <span
            className={`range ${slectedClass.oneYear && "selected-range"}`}
            onClick={() => {
              showOneYearData();
            }}
          >
            Last One Year
          </span>
          <span
            className={`range ${slectedClass.total && "selected-range"}`}
            onClick={() => {
              showTotalData();
            }}
          >
            Total
          </span>
        </div>
      </div>
      <Chart
        heading="Protein Consumption"
        data={showAble?.protein}
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

// Funkcija kas maina diapazonu(range) priekš showAble grafikiem
const handleRangeChange = (range, payload) => {
  const maxRange = new Date();
  const minRange = new Date(Date.now() - range * 24 * 60 * 60 * 1000);

  let newarr = [];
  for (let i = 0; i < payload?.length; i++) {
    const date = new Date(payload[i]?.date);
    if (date >= minRange && date <= maxRange) {
      // Aizsūta jaunus elementus masīva beigās, un atgriež jauna masīva garumu
      newarr.push(payload[i]);
    } else {
    }
  }
  return newarr;
};

export default Charts;
