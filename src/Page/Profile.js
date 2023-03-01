import { useState } from 'react';
import { updateUserProfile } from "../Backend/user"
import './Profile.css';
import { FiEdit2 } from 'react-icons/fi';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth } from '../Backend/firebase';

function Profile(props) {
  const [photoUrl, setPhotoUrl] = useState(props.photo);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [preferredName, setPreferredName] = useState(props.preferredName);
  const [usePreferredName, setUsePreferredName] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleUsePreferredNameChange = (event) => {
    setUsePreferredName(event.target.checked);
  };

  const handleSaveClick = () => {
    const updatedFirstName = usePreferredName ? preferredName : firstName;
    updateUserProfile(auth.currentUser.uid, {
      firstName: updatedFirstName,
      lastName: lastName,
    })
      .then(() => {
        alert('Profile updated successfully!');
        setEditMode(false);
      })
      .catch((error) => {
        alert(`Error updating profile: ${error.message}`);
      });
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setPhotoUrl(props.photo);
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setPreferredName(props.preferredName);
    setUsePreferredName(false);
  };

  return (
    <div className="profile">
      <h1>Account Setting</h1>
      <div className="profile-photo">
        <img src={photoUrl} alt="Profile" />
        <label className="edit-icon" htmlFor="photo-upload">
          <FiEdit2 />
          <input
            id="photo-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handlePhotoChange}
            style={{ display: editMode ? 'block' : 'none' }}
          />
        </label>
      </div>
      <div className="name-inputs">
        <div className="name-input">
          <label htmlFor="first-name-input">First name:</label>
          <input
            id="first-name-input"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="name-input">
          <label htmlFor="last-name-input">Last name:</label>
          <input
            id="last-name-input"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="name-input">
          <label htmlFor="preferred-name-input">
            Preferred name:
            <input
              id="preferred-name-checkbox"
              type="checkbox"
              checked={usePreferredName}
              onChange={handleUsePreferredNameChange}
              disabled={!editMode}
            />
          </label>
          <input
            id="preferred-name-input"
            type="text"
            value={preferredName}
            onChange={(event) => setPreferredName(event.target.value)}
            disabled={!usePreferredName || !editMode}
          />
        </div>
      </div>
      <p>Email: {props.email}</p>
      {editMode ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : 
      (<button onClick={() => setEditMode(true)}>Edit Profile</button>)}
    </div>
  );
}

export default Profile;