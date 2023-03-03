import { useState, useEffect } from 'react';
import { updateUserProfile } from "../Backend/user"
import './Profile.css';
import { FiEdit2 } from 'react-icons/fi';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth } from '../Backend/firebase';
import { TextField, Button } from '@mui/material';

function Profile(props) {
  const [photoUrl, setPhotoUrl] = useState(props.photo);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredName, setPreferredName] = useState(props.preferredName);
  const [usePreferredName, setUsePreferredName] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');

  const loadUserData = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setFirstName(currentUser.displayName.split(' ')[0]);
      setLastName(currentUser.displayName.split(' ')[1]);
      setEmail(currentUser.email);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  useEffect(() => {
    loadUserData();
  }, []);

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
    <div>
      <div className="header-container">
        <h1>Account Setting</h1>
        <div className="divider"></div>
      </div>
      <div className="profile">
        <h1>User information</h1>
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
      <p>{email}</p>
      <div className="Input-fields" style={{ marginBottom: '1rem' }}>
          <TextField
            variant="outlined"
            id="first-name-input"
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            disabled={!editMode}
            InputProps={{
              style: {
                color: "white",
                borderColor: "white"
              }
            }}
            InputLabelProps={{
              style: { color: "white" }
            }}
          />
          <TextField
            variant="outlined"
            id="last-name-input"
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            disabled={!editMode}
            InputProps={{
              style: {
                color: "white",
                borderColor: "white"
              }
            }}
            InputLabelProps={{
              style: { color: "white" }
            }}
          />
          <TextField
            variant="outlined"
            id="preferred-name-input"
            label="Preferred Name"
            value={preferredName}
            onChange={(event) => setPreferredName(event.target.value)}
            disabled={!editMode}
            InputProps={{
              style: {
                color: "white",
                borderColor: "white"
              }
            }}
            InputLabelProps={{
              style: { color: "white" }
            }}
          />
      </div>
      {editMode ? (
  <div className="save-cancel-container">
    <button onClick={handleSaveClick} className="button-primary">Save</button>
    <button onClick={handleCancelClick} className="button-cancel">Cancel</button>
  </div>
) : 
  (<button onClick={() => setEditMode(true)} className="edit-profile-button">Edit Profile</button>)
}
      </div>
    </div>
  );
}

export default Profile;