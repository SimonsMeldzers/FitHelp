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
        // Izvelk visus datus no "exercise" kolekcijas
        const responseEX = await getAllData("exercise");
        // Izvelk visus datus no "diets" kolekcijas
        const responseDiets = await getAllData("diets");
        // Pievieno visas vingrojumu grupas elementus
        setExercises(
          responseEX.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        // Pievieno visu ēdienu grupas elementus
        setDiets(
          responseDiets.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );

        // Izvada kļūdu ja tāda rodas
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
