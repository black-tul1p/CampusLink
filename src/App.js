<<<<<<< HEAD
<<<<<<< HEAD
//import NavBar from './Components/NavBar';
import "./App.css";
import handleSubmitTest from "./Backend/handleSubmit-test";
import { useRef } from "react";
import CourseContent from "./Components/CourseContent"
import NavBar from "./Components/NavBar"
import Login from "./Components/Login";
import ClassListCC from "./Components/ClasslistCC";

function App() {
  /* Backend testing code
  const testBackend = false;
  const dataRef = useRef();
  const submithandler = (e) => {
    e.preventDefault();
    handleSubmitTest(dataRef.current.value);
    dataRef.current.value = "";
  }; */

  // For Backend testing only, will remove later
  /* if (!testBackend) return <Login />;
  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>s
      </form>
    </div>
  ); */

  return <ClassListCC />;

=======
import logo from "./logo.svg";
=======
>>>>>>> 0c9d360 (Add backend testing code)
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

<<<<<<< HEAD
  return <Login />;
>>>>>>> 270941a (Added Basic Login Page)
=======
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
>>>>>>> 0c9d360 (Add backend testing code)
}

export default App;