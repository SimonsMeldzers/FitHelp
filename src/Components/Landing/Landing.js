import { Button, TextContainer } from "../Shared/";
import "./Landing.css";

const text = {
  title: "Welcome to FitHelp",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac cursus eros. Integer sit amet massa ex. Cras varius felis a eros viverra semper. Curabitur ut molestie dui. Phasellus sed elit ligula. Aliquam erat volutpat. Duis sodales tellus tortor, sit amet posuere libero viverra vel. In vestibulum mauris quis ex finibus pharetra. Maecenas hendrerit eu elit a viverra. Proin fringilla sit amet ligula at volutpat. Pellentesque tempus faucibus elementum.",
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
