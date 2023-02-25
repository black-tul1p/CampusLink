import { useState } from 'react';
import './Profile.css';
import { FiEdit2 } from 'react-icons/fi';

function Profile(props) {
  const [photoUrl, setPhotoUrl] = useState(props.photo);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    
    setPhotoUrl(url);
  };

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <div className="profile-photo">
        <img src={photoUrl} alt="Profile" />
        <label className="edit-icon" htmlFor="photo-upload">
          <FiEdit2 />
          <input
            id="photo-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <p>Email: {props.email}</p>
      <p>Name: {props.name}</p>
    </div>
  );
}

export default Profile;