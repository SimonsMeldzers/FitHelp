import { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../Shared";
import { LogIn, Register } from "../../Authentication";

const AuthSteps = {
  1: LogIn,
  2: Register,
};

function Modal() {
  // Autorizācijas procesa aktivēšana
  const [authStep, setAuthStep] = useState(1);
  const Step = AuthSteps[authStep];
  return (
    <Card >
      <Step setAuthStep={setAuthStep}  />
    </Card>
  );
}

export default Modal;
