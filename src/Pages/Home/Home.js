import { useSelector } from "react-redux";
import { About, Achieve, Catalogue, Landing, Modal } from "../../Components";
import { Footer, Navbar } from "../../Components/Shared";

function Home() {
  const { showModal } = useSelector((state) => state.modal);

  return (
    <div>
      <Navbar />
      <Landing />
      <Achieve />
      <Catalogue />
      <About />
      <Footer /> {showModal && <Modal />}
    </div>
  );
}

export default Home;
