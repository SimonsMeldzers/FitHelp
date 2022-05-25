import { useState, useEffect } from "react";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { db } from "../../.././Config/Firebase";

import { Footer, Navbar, GoBack } from "../../../Components/Shared";
import { useParams } from "react-router-dom";
import InfoContainer from "./InfoContainer";
import Steps from "./Steps";
import Recommended from "./Recommended";
import "./style.css";

export default function ExerciseDiets() {
  const { collectionType, documentId, groupId } = useParams(); //useParams ļauj mums izmantot URL parametrus
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // No Firebase datubāzes veicam dokumenta atsuaci uz documentID
        const docRef = doc(db, collectionType, documentId);
        // Tiek veikta kolekcijas atsuace ar komunetaID = "group" 
        const colRef = collection(docRef, "group");
        // Tiek veikta colRef kolekcijas atsuace, kur groupID = "detail"
        const groupRef = collection(colRef, groupId, "detail");
        // Dabūnam datus no datubāzes pēc mūsu groupRef pieprasījuma
        const docSnap = await getDocs(groupRef);

        setData(
          // Izvelkam datus no docSnap, un atgriežam tos mājaslapā
          docSnap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        // Servera kļūdas gadījumā, izvada kļūdu konsolē
      } catch (error) {
        console.log(error);
      }
    })();
    // Šī funkcija tiek palaista kad tiek mainīti kādi no šiem parametriem
  }, [collectionType, documentId, groupId]);
  return (
    <div>
      <Navbar />

      <div style={{ margin: 30 }}>
        <GoBack />
        <InfoContainer
          images={data[0]?.images}
          heading={data[0]?.heading}
          description={data[0]?.description}
        />
        <Steps steps={data[0]?.steps} />
        <Recommended recommended={data[0]?.recommended} />
      </div>

      <Footer />
    </div>
  );
}
