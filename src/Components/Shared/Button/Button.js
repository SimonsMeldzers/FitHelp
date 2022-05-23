import "./Button.css";

function Button({ text, type, handleClick,isTransparent }) {
  return (
    <button
      style={isTransparent && { border: "2px solid transparent" }}
      onClick={handleClick}
      type={type}
      className={`button`}
    >
      {text}
    </button>
  );
}

export default Button;
