import "./Input.css";

function Input({ value, onChangeHandler, type, innerRef, placeholder,isEmpty,name }) {
  return (
    <input
      value={value}
      onChange={(e) => {
        onChangeHandler(e);
      }}
      type={type}
      ref={innerRef && innerRef}
      placeholder={placeholder}
      className={`input  ${isEmpty && 'errorInput'}`}
      name={name}
    />
  );
}

export default Input;
