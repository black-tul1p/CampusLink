import { useState } from 'react';
import './Profile.css';
import { FiEdit2 } from 'react-icons/fi';
import firebase from 'firebase/app';
import 'firebase/firestore';


function Profile(props) {
  const [photoUrl, setPhotoUrl] = useState(props.photo);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [preferredName, setPreferredName] = useState(props.preferredName);
  const [usePreferredName, setUsePreferredName] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleUsePreferredNameChange = (event) => {
    setUsePreferredName(event.target.checked);
  };

  const handleSaveClick = () => {
    //updateFirstNameAndLastName(firstName, lastName)
  };
/*
  const updateFirstNameAndLastName = (newFirstName, newLastName) => {
    const db = firebase.firestore();
    const userRef = db.collection("user").doc(props.userId);
    userRef.update({
      firstName: newFirstName,
      lastName: newLastName
    }).then(() => {
      console.log("Document successfully updated!");
      setFirstName(newFirstName);
      setLastName(newLastName);
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
*/
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
      <div className="name-inputs">
        <div className="name-input">
          <label htmlFor="first-name-input">First name:</label>
          <input
            id="first-name-input"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="name-input">
          <label htmlFor="last-name-input">Last name:</label>
          <input
            id="last-name-input"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
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
            />
          </label>
          <input
            id="preferred-name-input"
            type="text"
            value={preferredName}
            onChange={(event) => setPreferredName(event.target.value)}
            disabled={!usePreferredName}
          />
        </div>
      </div>
      <p>Email: {props.email}</p>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}

export default Profile;

