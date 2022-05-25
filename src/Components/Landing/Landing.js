import { Button, TextContainer } from "../Shared/";
import "./Landing.css";

const text = {
  title: "Welcome to FitHelp",
  desc: "A platform that's going to make your body transformation easier! We offer a fitness assistant app, which is easy to use, intuitive, and offers a large catalogue of different exercises and diets! Read information below to learn more about us!",
};

function Landing() {
  return (
    <div className="landing-container flex">
      <TextContainer text={text}>
        <a href="#about">
          <Button text="Learn More" />
        </a>
      </TextContainer>
      <div>
        <img src={`/assets/undraw_Jogging_re_k28i 1.svg`} alt="landing-logo" />
      </div>
    </div>
  );
}

export default Landing;
