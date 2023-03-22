import React from 'react'
import { useState, useEffect } from 'react';
import CourseNavBar from "../CourseNavBar"
import 'firebase/firestore';
import {doc, getDocs, query, setDoc, collection} from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import './Discussions.css';

function Discussions() {
  const [currentUser, setCurrentUser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionDescription, setNewDiscussionDescription] = useState('');
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const discussionsRef = collection(firestore, 'discussions');
      const q = query(discussionsRef);

      const querySnapshot = await getDocs(q);
      const discussionsData = [];
      querySnapshot.forEach(doc => discussionsData.push({ id: doc.id, ...doc.data() }));

      setDiscussions(discussionsData);
    }

    fetchData();
  }, []);

  const handleAddDiscussion = async () => {
    if (newDiscussionTitle.trim() === '' || newDiscussionDescription.trim() === '') {
      alert('Please fill in both the title and description.');
      return;
    }

    const newDiscussion = {
      title: newDiscussionTitle,
      description: newDiscussionDescription,
      created_at: new Date(),
      creator_id: currentUser.uid,
      creator_name: currentUser.displayName,
      replies: []
    };

    await setDoc(doc(firestore, 'discussions', newDiscussion.title), newDiscussion);

    setNewDiscussionTitle('');
    setNewDiscussionDescription('');
    setShowModal(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      {currentUser && currentUser.role === 'instructor' &&
        <button onClick={() => setShowModal(true)}>+</button>
      }
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create New Discussion</h2>
            <form>
              <label>
                Title:
                <input type="text" value={newDiscussionTitle} onChange={e => setNewDiscussionTitle(e.target.value)} />
              </label>
              <label>
                Description:
                <textarea value={newDiscussionDescription} onChange={e => setNewDiscussionDescription(e.target.value)} />
              </label>
              <button type="button" onClick={handleAddDiscussion}>Create</button>
            </form>
          </div>
        </div>
      )}
      {discussions.map(discussion => (
        <div key={discussion.id}>
          <h2>{discussion.title}</h2>
          <p>{discussion.description}</p>
          <p>Created by: {discussion.creator_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Discussions;
