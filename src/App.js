import NavBar from './Components/NavBar';
import Courses_Student from './Pages/Courses_Student';
import Settings from './Pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div ClassName='App'>
      <Router>
      <NavBar />
      <Routes>
        <Route exact path="/Courses_Student" element={<Courses_Student/>}/>
        <Route exact path="/Settings" element={<Settings/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
