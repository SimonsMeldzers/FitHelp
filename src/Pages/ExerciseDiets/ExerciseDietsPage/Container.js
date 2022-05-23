import Card from "./Card";
export default function ExercisesDietsContainer({
  background,
  cardColor,
  data,
  collectionType,
}) {
  return (
    <div className="exercisesDietsContainer" style={{ background }}>
      {data && data.length > 0 ? (
        data.map(({ title, image, id }, index) => (
          <Card
            key={index}
            title={title}
            image={image}
            cardColor={cardColor}
            id={id}
            collectionType={collectionType}
          />
        ))
      ) : (
        <div className="noData">
          <p>No {collectionType} found</p>
        </div>
      )}
    </div>
  );
}
