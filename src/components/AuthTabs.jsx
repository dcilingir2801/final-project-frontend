import { useState } from "react";
import SignIn from "./SignIn";
import SignUpForm from "./SignUp";

export default function AuthTabs({ toggleSignUpPopup }) {
  const [isSignUp, setIsSignUp] = useState(true);
  if (isSignUp) {
    return <SignUpForm handleToggle={() => setIsSignUp(!isSignUp)} toggleSignUpPopup={toggleSignUpPopup} />;
  }
  return <SignIn handleToggle={() => setIsSignUp(!isSignUp)} toggleSignUpPopup={toggleSignUpPopup} />;
}
