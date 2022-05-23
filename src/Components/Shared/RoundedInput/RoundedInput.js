import "./RoundedInput.css";

function RoundedInput({
  type,
  value,
  onChangeHandler,
  name,
  small,
  isLarge,
  placeholder,
  disable,
}) {
  return (
    <input
      className="rounded-input"
      style={
        (small && { width: "100px" },
        isLarge && {
          width: "100%",
        })
      }
      name={name}
      type={type}
      value={value}
      onChange={(e) => {
        onChangeHandler(e);
      }}
      disabled={disable}
      placeholder={placeholder}
    />
  );
}

export default RoundedInput;
