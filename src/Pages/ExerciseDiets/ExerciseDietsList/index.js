import React from "react";

import { Footer, Navbar, GoBack } from "../../../Components/Shared";
import ListContainer from "./ListContainer";
import Heading from "./Heading";
import "./style.css";

export default function ExerciseDietsList() {
  return (
    <div>
      <Navbar />
      <GoBack />
      <Heading />
      <ListContainer />
      <Footer />
    </div>
  );
}
