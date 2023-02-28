import NavBar from './Components/NavBar';
import HomepageStudent from './Pages/HomepageStudent';
import Settings from './Pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div ClassName='App'>
      <Router>
      <NavBar />
      <Routes>
      <Route exact path="/" element={<HomepageStudent/>}/>
      <Route exact path="/Settings" element={<Settings/>}/>
      </Routes>
      </Router> 
       
    </div>
  );
}

export default App;
