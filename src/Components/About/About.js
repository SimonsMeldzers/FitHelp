import { TextContainer } from "../Shared/";
import "./About.css";

const text = {
  title: "About Us",
  desc: " FitHelp is an application that's going to help you achieve your ultimate goal of body transformation. We offer a variety of different solutions to help you become a better you. FitHelp provides you progress graphs, calendar with notes, so you can track your progress, as well as a large collection of specialy picked exercises and diets. Other than that, we also help you decide on what to start with, using our recommendation system!",
  isWhite: true,
};

function About() {
  return (
    <div id="about" className="flex about-container">
      <div>
        <img
          src={`/assets/undraw_Team_spirit_re_yl1v-removebg-preview 1.svg`}
          alt="about-logo-1"
        />
      </div>
      <div>
        <TextContainer text={text}></TextContainer>
      </div>
      <div>
        <img
          src={`/assets/undraw_team_work_k80m__1_-removebg-preview 1.svg`}
          alt="about-logo-2"
        />
      </div>
    </div>
  );
}

export default About;
