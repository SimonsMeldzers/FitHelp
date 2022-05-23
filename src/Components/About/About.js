import { TextContainer } from "../Shared/";
import "./About.css";

const text = {
  title: "About Us",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac cursus eros. Integer sit amet massa ex. Cras varius felis a eros viverra semper. Curabitur ut molestie dui. Phasellus sed elit ligula. Aliquam erat volutpat. Duis sodales tellus tortor, sit amet posuere libero viverra vel. In vestibulum mauris quis ex finibus pharetra. Maecenas hendrerit eu elit a viverra. Proin fringilla sit amet ligula at volutpat. Pellentesque tempus faucibus elementum.",
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
