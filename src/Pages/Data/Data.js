import { Charts, Instructions, WelcomeData } from "../../Components";
import { Footer, Navbar } from "../../Components/Shared";

function Data() {
  return (
    <div>
      <Navbar />
      <WelcomeData />
      <Instructions />
      <Charts />
      <Footer />
    </div>
  );
}

export default Data;
