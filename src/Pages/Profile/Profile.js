import { BodyMetrics, ProfileData, Recommendations } from "../../Components";
import { Footer, Navbar } from "../../Components/Shared";

function Profile() {
  return (
    <div>
      <Navbar />
      <ProfileData />
      <BodyMetrics />
      <Recommendations />
      <Footer />
    </div>
  );
}

export default Profile;
