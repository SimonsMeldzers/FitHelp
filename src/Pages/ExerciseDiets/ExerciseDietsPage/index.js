import { useState, useEffect } from "react";
import { getAllData } from "../../.././Config/Services";
import { Footer, Navbar } from "../../../Components/Shared";
import Container from "./Container";
import Heading from "./Heading";
import "./style.css";

export default function ExerciseDiets() {
  const [exercises, setExercises] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [diets, setDiets] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    (async () => {
      try {
        const responseEX = await getAllData("exercise");
        const responseDiets = await getAllData("diets");
        setExercises(
          responseEX.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        setDiets(
          responseDiets.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <Heading />
      <Container
        background="white"
        cardColor="white"
        data={exercises}
        collectionType="exercise"
      />
      <div id="diet">
        <Container
          background="#6c63ff"
          cardColor="white"
          data={diets}
          collectionType="diets"
        />
      </div>

      <Footer />
    </div>
  );
}
