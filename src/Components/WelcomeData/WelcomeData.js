import { TextContainer } from "../Shared";
import "./WelcomeData.css";

const text = {
  title: "Welcome to Your Data page",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac cursus eros. Integer sit amet massa ex. Cras varius felis a eros viverra semper. Curabitur ut molestie dui. Phasellus sed elit ligula. Aliquam erat volutpat. Duis sodales tellus tortor, sit amet posuere libero viverra vel. In vestibulum mauris quis ex finibus pharetra. Maecenas hendrerit eu elit a viverra. Proin fringilla sit amet ligula at volutpat. Pellentesque tempus faucibus elementum.",
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
