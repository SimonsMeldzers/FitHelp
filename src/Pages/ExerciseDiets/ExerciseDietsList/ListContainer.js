import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../.././Config/Firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import ListItem from "./ListItem";
import Button from "../../../Components/Shared/Button/Button";
export default function ListContainer({ title, image }) {
  const { collectionType, id } = useParams();
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    (async () => {
      try {
        // No Firebase datubāzes veicam dokumenta atsuaci balstoties uz id
        const docRef = doc(db, collectionType, id);
        // Tiek veikta kolekcijas atsuace ar id = "group" 
        const colRef = collection(docRef, "group");
        // Dabūnam datus no datubāzes pēc mūsu colRef pieprasījuma
        const docSnap = await getDocs(colRef);
        // Pievienojam list masīvam vērtības
        setList(
          docSnap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        // Kļūdas gadījumā izvada kļūdu
      } catch (error) {
        console.log(error);
      }
    })();
    // Kad tiek mainīts kāds no šiem parametriem, viņi tiek pārrenderēti
  }, [collectionType, id]);
  return (
    <div>
      {/* Tiek veikta pārbaude, ja list masīvā ir elementi,
      izvadam visus šos elementus,
      pretējā gadījumā, izvadam "No collection found" */}
      {list && list.length > 0 ? (
        list?.map((item, index) => (
          <ListItem
            key={index}
            title={item?.title}
            image={item?.image}
            documentId={id}
            groupId={item?.id}
            collectionType={collectionType}
          />
        ))
      ) : (
        <div className="noData">
          <p>No {collectionType} found</p>
        </div>
      )}
      {/* Ja ir tikai viens elements, pievienojam konteineri ,ar augstumu 250px,
       zem tā elementa lai futeris nebūtu pārāk tuvu un nebūtu vizuālu defektu*/}
      {list.length === 1 && <div style={{ height: 250 }}></div>}
    </div>
  );
}
