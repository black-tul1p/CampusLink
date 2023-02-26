import "./App.css";
import Login from "./Components/Login";
import {
  createStudent,
  removeStudent,
  getStudentIdByEmail,
} from "./Backend/student";
import { useRef, useState } from "react";
import RegistrationForm from "./Components/RegistrationForm";

function App() {
  // Backend testing code
  const testBackend = false;

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Helper functions
  const addStudentHandler = (e) => {
    e.preventDefault();
    createStudent(first, last, email, pass);
    setFirst("");
    setLast("");
    setEmail("");
    setPass("");
  };

  const getStudentHandler = (e) => {
    e.preventDefault();
    getStudentIdByEmail(email);
    setEmail("");
  };

  const delStudentHandler = async (e) => {
    e.preventDefault();
    const id = await getStudentIdByEmail(email);
    removeStudent(id);
    setEmail("");
  };

  // For Backend testing only, will remove later
  if (!testBackend) return <RegistrationForm />;
  return (
    <div className="App">
      <form onSubmit={addStudentHandler}>
        <input
          type="text"
          value={first}
          onChange={(e) => {
            setFirst(e.target.value);
          }}
        />
        <input
          type="text"
          value={last}
          onChange={(e) => {
            setLast(e.target.value);
          }}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button type="submit">Save</button>
      </form>
      <form onSubmit={getStudentHandler}>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Find</button>
      </form>
      <form onSubmit={delStudentHandler}>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Remove</button>
      </form>
    </div>
  );
}

export default App;
