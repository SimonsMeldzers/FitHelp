import { TextContainer } from "../Shared";
import "./WelcomeCalender.css";

const text = {
  title: "Welcome to Your Calendar",
  desc: "In your calendar you can track your progress, make notes and make sure you never skip everything! Phasellus sed elit ligula. Aliquam erat volutpat. Duis sodales tellus tortor, sit amet posuere libero viverra vel. In vestibulum mauris quis ex finibus pharetra. Maecenas hendrerit eu elit a viverra. Proin fringilla sit amet ligula at volutpat. Pellentesque tempus faucibus elementum.",
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
