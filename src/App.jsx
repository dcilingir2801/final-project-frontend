import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PropertiesOverview from "./pages/PropertiesOverview";
import LandingPage from "./pages/LandingPage";
import SignUpForm from "./components/SignUp";
import SignIn from "./components/SignIn";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/isPrivate";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  console.log("Is logged in =>>", isLoggedIn);
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <div className="app">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LandingPage />} />
            {isLoggedIn ? (
              <Route
                path="/optimization"
                element={
                  <IsPrivate>
                    {" "}
                    <PropertiesOverview />{" "}
                  </IsPrivate>
                }
              />
            ) : (
              <Route path="*" element={<NotFound />} />
            )}
            <Route
              path="/optimization/:propertyId"
              element={
                <IsPrivate>
                  {" "}
                  <Dashboard />{" "}
                </IsPrivate>
              }
            />
            <Route
              path="/signin"
              element={
                <IsAnon>
                  {" "}
                  <SignIn />{" "}
                </IsAnon>
              }
            />
            <Route
              path="/signup"
              element={
                <IsAnon>
                  {" "}
                  <SignUpForm />{" "}
                </IsAnon>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
