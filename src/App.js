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
import "./App.css";
import Login from "./Components/Login";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return <Login />;
>>>>>>> 270941a (Added Basic Login Page)
}

export default App;