import NavBar from './Components/NavBar';
import Homepage_Student from './Pages/Homepage_Student';
import Settings from './Pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div ClassName='App'>
      <Router>
      <NavBar />
      <Routes>
        <Route exact path="/Homepage_Student" element={<Homepage_Student/>}/>
        <Route exact path="/Settings" element={<Settings/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
