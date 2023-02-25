import logo from './logo.svg';
import './App.css';
import LogoutButton from './LogoutButton';
import Profile from './Page/Profile';

function App() {
  return (
    <div>
      <Profile
        photo="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        email="example@example.com"
        name="John Doe"
      />
    </div>
  );
}

export default App;
