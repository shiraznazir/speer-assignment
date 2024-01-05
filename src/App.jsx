import React from "react";
import Header from "./components/Header";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import ToggleCallsContext from "./context/ToggleCallsContext";

const App = () => {
  return (
    <ToggleCallsContext>
      <div className="bg-black min-h-screen">
        <div className="container bg-white mx-auto max-w-full w-full min-h-screen md:max-w-6/12 md:w-6/12 flex flex-col">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
    </ToggleCallsContext>
  );
};

export default App;
