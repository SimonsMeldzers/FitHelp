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
        const docRef = doc(db, collectionType, id);
        const colRef = collection(docRef, "group");
        const docSnap = await getDocs(colRef);
        setList(
          docSnap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [collectionType, id]);
  return (
    <div>
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

      {list.length === 1 && <div style={{ height: 200 }}></div>}
    </div>
  );
}
