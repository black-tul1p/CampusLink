import React, { useState, useEffect } from 'react';
import CourseNavBar from "../CourseNavBar";
import 'firebase/firestore';
import { doc, getDocs, query, setDoc, collection, where, addDoc, updateDoc, arrayUnion } from "@firebase/firestore";
import { firestore, auth } from "../../Backend/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function Discussions({ courseId }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionDescription, setNewDiscussionDescription] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentCourseTitle, setCurrentCourseTitle] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (courseId && courses.length > 0) {
      const currentCourse = courses.find(course => course.id === courseId);
      if (currentCourse) {
        setSelectedCourse(currentCourse);
        setCurrentCourseTitle(currentCourse.title);
      }
    }
  }, [courseId, courses]);

  const handleEditDiscussion = (discussion) => {
    setEditingDiscussion(discussion);
  };

  const updateDiscussion = async () => {
    if (!editingDiscussion) return;
    const discussionRef = doc(firestore, 'discussions', editingDiscussion.id);

    await updateDoc(discussionRef, {
      title: editingDiscussion.title,
      description: editingDiscussion.description,
    });

    setEditingDiscussion(null);
    fetchData();
  };

  const fetchCourses = async () => {
    const courseRef = collection(firestore, 'courses');
    const courseSnapshot = await getDocs(courseRef);
    const coursesData = [];
    courseSnapshot.forEach(doc => {
      coursesData.push({
        id: doc.id,
        title: doc.data().courseTitle, 
        ...doc.data()
      });
    });
  
    setCourses(coursesData);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchData = async () => {
    if (!currentCourseId) return;

    const discussionsRef = collection(firestore, 'discussions');
    const q = query(discussionsRef, where("courseId", "==", currentCourseId));

    const querySnapshot = await getDocs(q);
    const discussionsData = [];
    querySnapshot.forEach(doc => discussionsData.push({ id: doc.id, ...doc.data() }));

    setDiscussions(discussionsData);
  };

  useEffect(() => {
    fetchData();
  }, [currentCourseId]);

  const handleAddDiscussion = async () => {
    if (newDiscussionTitle.trim() === '' || newDiscussionDescription.trim() === '') {
      alert('Please fill in both the title and description.');
      return;
    }
  
    const newDiscussion = {
      title: newDiscussionTitle,
      description: newDiscussionDescription,
      courseId: currentCourseId,
      courseTitle: currentCourseTitle,
      created_at: new Date(),
      creator_id: currentUser.uid,
      creator_name: currentUser.displayName,
      replies: []
    };
    if (currentCourseId) {
      try {
        const docRef = await addDoc(collection(firestore, 'discussions'), newDiscussion);

        const courseRef = doc(firestore, 'courses', currentCourseId);
        await updateDoc(courseRef, {
          discussions: arrayUnion(docRef.id)
        });

        setNewDiscussionTitle('');
        setNewDiscussionDescription('');
        setShowModal(false);
        fetchData();
      } catch (error) {
        console.error('Error adding document: ', error);
        console.log('newDiscussion:', newDiscussion);
        alert('Error occurred while creating the discussion. Please try again.');
      }
    } else {
      alert('Please select a course before creating a discussion.');
    }
  };

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleCourseChange = (event) => {
    const selectedCourse = courses.find(course => course.id === event.target.value);
    if (selectedCourse) {
      setSelectedCourse(selectedCourse);
      setCurrentCourseId(selectedCourse.id);
      setCurrentCourseTitle(selectedCourse.title); 
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <FormControl fullWidth>
        <InputLabel>Select Course</InputLabel>
        <Select
          value={selectedCourse?.id || ""}
          onChange={handleCourseChange}
        >
          {courses.map(course => (
            <MenuItem key={course.id} value={course.id}>
              {course.title} {course.courseId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {currentUser &&
        <IconButton onClick={() => setShowModal(true)}>
          <AddCircleIcon />
        </IconButton>
      }
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create New Discussion</h2>
            <form>
              <div>
                <label htmlFor="title-input" style={{ display: "block" }}>
                  Title:
                </label>
                <input
                  id="title-input"
                  type="text"
                  value={newDiscussionTitle}
                  onChange={e => setNewDiscussionTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description-input" style={{ display: "block" }}>
                  Description:
                </label>
                <textarea
                  id="description-input"
                  value={newDiscussionDescription}
                  onChange={e => setNewDiscussionDescription(e.target.value)}
                />
              </div>
              <button type="button" onClick={handleAddDiscussion}>Create</button>
            </form>
          </div>
        </div>
      )}
      <ul style={{ listStyle: "none", padding: 0 }}>
    {discussions.map(discussion => (
      <li
        key={discussion.id}
        onClick={() => handleDiscussionClick(discussion)}
        // ...other inline styles...
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{discussion.title}</h2>
          <div>
            <span>{new Date(discussion.created_at.toMillis()).toLocaleDateString()}</span>
            <span> by {discussion.creator_name}</span>
            {currentUser && currentUser.uid === discussion.creator_id && (
              <IconButton onClick={(e) => { e.stopPropagation(); handleEditDiscussion(discussion); }}>
                <EditIcon />
              </IconButton>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
  {selectedDiscussion && (
    <div>
      {editingDiscussion && editingDiscussion.id === selectedDiscussion.id ? (
        <>
          <div>
            <label htmlFor="edit-title-input" style={{ display: "block" }}>
              Title:
            </label>
            <input
              id="edit-title-input"
              type="text"
              value={editingDiscussion.title}
              onChange={(e) =>
                setEditingDiscussion({
                  ...editingDiscussion,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="edit-description-input" style={{ display: "block" }}>
              Description:
            </label>
            <textarea
              id="edit-description-input"
              value={editingDiscussion.description}
              onChange={(e) =>
                setEditingDiscussion({
                  ...editingDiscussion,
                  description: e.target.value,
                })
              }
            />
          </div>
          <button type="button" onClick={updateDiscussion}>
            Save
          </button>
          <button type="button" onClick={() => setEditingDiscussion(null)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2>{selectedDiscussion.title}</h2>
          <p>{selectedDiscussion.description}</p>
          <p>Created by: {selectedDiscussion.creator_name}</p>
        </>
      )}
    </div>
  )}
</div>
);
}

export default Discussions;