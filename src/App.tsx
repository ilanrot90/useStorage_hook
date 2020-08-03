import * as React from "react";
import { useStorage } from "./useStorage";
import "./styles.css";

const App: React.FC = () => {
  const [value, setValue] = useStorage("value2", 0);

  return (
    <div className="App">
      <h1>value: {value}</h1>
      <button
        onClick={() => {
          setValue(prevVal => (prevVal || 0) + 1);
        }}
      >
        increment +
      </button>
    </div>
  );
};

export default App;
