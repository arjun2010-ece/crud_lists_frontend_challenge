import React, { FC } from "react";
import QuoteList from "./components/quoteList";
import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <QuoteList />
    </div>
  );
};

export default App;
