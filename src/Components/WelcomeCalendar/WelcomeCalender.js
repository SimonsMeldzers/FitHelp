import { TextContainer } from "../Shared";
import "./WelcomeCalender.css";

const text = {
  title: "Welcome to Your Calendar",
  desc: "In your calendar you can track your progress, make notes and make sure you never skip anything! To start simply click on any date, and type in any information you would like to store, then pick a color, that's going to indicate the type of note this is, and click 'Add'. As simple as that, you can now go back whenever you wish, to check on your exercise and dietary routine.",
};

function WelcomeCalender() {
  return (
    <div className="flex welcome-calendar-container">
      <div>
        <TextContainer text={text}></TextContainer>
      </div>
      <div>
          <img src={`/assets/undraw_Online_calendar_re_wk3t 1.svg`} alt="welcome calander logo" />
      </div>
    </div>
  );
}

export default WelcomeCalender;
