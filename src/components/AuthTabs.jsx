import { useState } from "react";
import SignIn from "./SignIn";
import SignUpForm from "./SignUp";

export default function AuthTabs({ toggleSignUpPopup }) {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  if (isSignUp) {
    return <SignUpForm handleToggle={handleToggle} toggleSignUpPopup={toggleSignUpPopup} />;
  }
  return <SignIn handleToggle={handleToggle} toggleSignUpPopup={toggleSignUpPopup} />;
}
