import { TextContainer } from "../Shared";
import "./WelcomeData.css";

const text = {
  title: "Welcome to Your Data page",
  desc: "On this page you can track your progress by looking at these amazing graphs. Graph visualization is going to help you track your intake of calories and protein, as well as track your weight and BMI, whether you are trying to gain, or lose mass.",
};

function WelcomeData() {
  return (
    <div className="flex welcomedata-container">
      <div>
        <TextContainer text={text}></TextContainer>
      </div>
      <div>
          <img src={`/assets/undraw_Data_re_80ws__1_-removebg-preview 1.svg`} alt="welcome data logo" />
      </div>
    </div>
  );
}

export default WelcomeData;
