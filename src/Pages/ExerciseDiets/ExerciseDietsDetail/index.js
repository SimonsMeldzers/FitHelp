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
  const { collectionType, documentId, groupId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, collectionType, documentId);
        const colRef = collection(docRef, "group");
        const groupRef = collection(colRef, groupId, "detail");
        const docSnap = await getDocs(groupRef);

        setData(
          docSnap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
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
