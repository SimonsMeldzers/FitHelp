import "./TextContainer.css";

function TextContainer({ text, children }) {
  return (
    <div className="flex text-container">
      <h1 style={text.isWhite && { color: "#fff" }}>{text.title}</h1>
      <p style={text.isWhite && { color: "#fff" }}>{text.desc}</p>
      {children}
    </div>
  );
}

export default TextContainer;
