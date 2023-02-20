import "./App.css";
import Login from "./Components/Login";
import handleSubmitTest from "./Backend/handleSubmit-test";
import { useRef } from "react";

function App() {
  // Backend testing code
  const testBackend = false;
  const dataRef = useRef();
  const submithandler = (e) => {
    e.preventDefault();
    handleSubmitTest(dataRef.current.value);
    dataRef.current.value = "";
  };

  // For Backend testing only, will remove later
  if (!testBackend) return <Login />;
  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
