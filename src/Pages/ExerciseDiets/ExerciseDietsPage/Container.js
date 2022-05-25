import Card from "./Card";
export default function ExercisesDietsContainer({
  background,
  cardColor,
  data,
  collectionType,
}) {
  return (
    <div className="exercisesDietsContainer" style={{ background }}>
      {/* Ja ir dati, izvelk no data - title, image, id ka objektu, un atsevišķi index */}
      {data && data.length > 0 ? (
        data.map(({ title, image, id }, index) => (
          // Izveido elementu ar visiem datiem
          <Card
            key={index}
            title={title}
            image={image}
            cardColor={cardColor}
            id={id}
            collectionType={collectionType}
          />
        ))
        // Ja nav datu, izvada "no collection found"
      ) : (
        <div className="noData">
          <p>No {collectionType} found</p>
        </div>
      )}
    </div>
  );
}
