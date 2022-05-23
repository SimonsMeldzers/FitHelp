import { FullCalandar, WelcomeCalender } from "../../Components";
import { Footer, Navbar } from "../../Components/Shared";



function Calender() {
  
  return (
    <div className="calender-container">
      <Navbar />
      <WelcomeCalender />
      <FullCalandar />
      <Footer />
    </div>
  );
}

export default Calender;
