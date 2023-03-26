import React, { useState, useEffect } from "react";
import CourseNavBar from "../CourseNavBar";
import "firebase/firestore";
import {
  doc,
  getDocs,
  query,
  setDoc,
  collection,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";
import { firestore, auth } from "../../Backend/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewDiscussionModal from "./Modal";
import DiscussionList from "./DiscussionList";
import "./Discussions.css";

function Discussions({ courseId }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionDescription, setNewDiscussionDescription] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentCourseTitle, setCurrentCourseTitle] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [discussionPrivacy, setDiscussionPrivacy] = useState("private");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      const currentCourse = courses.find((course) => course.id === courseId);
      if (currentCourse) {
        setSelectedCourse(currentCourse);
        setCurrentCourseTitle(currentCourse.title);
      }
    }
  }, [courseId, courses]);

  const handleEditDiscussion = (discussion) => {
    setEditingDiscussion(discussion);
  };

  const cancelEditing = () => {
    setEditingDiscussion(null);
  };

  const updateDiscussion = async () => {
    if (!editingDiscussion) return;
    const discussionRef = doc(firestore, "discussions", editingDiscussion.id);

    await updateDoc(discussionRef, {
      title: editingDiscussion.title,
      description: editingDiscussion.description,
    });

    setEditingDiscussion(null);
    fetchData();
  };

  const fetchCourses = async () => {
    const courseRef = collection(firestore, "courses");
    const courseSnapshot = await getDocs(courseRef);
    const coursesData = [];
    courseSnapshot.forEach((doc) => {
      coursesData.push({
        id: doc.id,
        title: doc.data().courseTitle,
        ...doc.data(),
      });
    });

    setCourses(coursesData);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchData = async () => {
    if (!currentCourseId) return;

    const discussionsRef = collection(firestore, "discussions");
    const q = query(discussionsRef, where("courseId", "==", currentCourseId));

    const querySnapshot = await getDocs(q);
    const discussionsData = [];
    querySnapshot.forEach((doc) =>
      discussionsData.push({ id: doc.id, ...doc.data() })
    );

    setDiscussions(discussionsData);
  };

  useEffect(() => {
    fetchData();
  }, [currentCourseId]);

  const handleAddDiscussion = async () => {
    if (
      newDiscussionTitle.trim() === "" ||
      newDiscussionDescription.trim() === ""
    ) {
      alert("Please fill in both the title and description.");
      return;
    }

    const newDiscussion = {
      title: newDiscussionTitle,
      description: newDiscussionDescription,
      privacy: discussionPrivacy,
      courseId: currentCourseId,
      courseTitle: currentCourseTitle,
      created_at: new Date(),
      creator_id: currentUser.uid,
      creator_name: currentUser.displayName,
      replies: [],
    };
    if (currentCourseId) {
      try {
        const docRef = await addDoc(
          collection(firestore, "discussions"),
          newDiscussion
        );

        const courseRef = doc(firestore, "courses", currentCourseId);
        await updateDoc(courseRef, {
          discussions: arrayUnion(docRef.id),
        });

        setNewDiscussionTitle("");
        setNewDiscussionDescription("");
        setShowModal(false);
        fetchData();
      } catch (error) {
        console.error("Error adding document: ", error);
        console.log("newDiscussion:", newDiscussion);
        alert(
          "Error occurred while creating the discussion. Please try again."
        );
      }
    } else {
      alert("Please select a course before creating a discussion.");
    }
  };

  const handleDiscussionClick = (discussion) => {
    if (selectedDiscussion === discussion) {
      setSelectedDiscussion(null);
    } else {
      setSelectedDiscussion(discussion);
    }
  };

  const handleCourseChange = (event) => {
    const selectedCourse = courses.find(
      (course) => course.id === event.target.value
    );
    if (selectedCourse) {
      setSelectedCourse(selectedCourse);
      setCurrentCourseId(selectedCourse.id);
      setCurrentCourseTitle(selectedCourse.title);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <div
        style={{
          padding: "2em 2em 0",
          height: "85vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2em",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Select Course</InputLabel>
          <Select
            label="Select Course"
            value={selectedCourse?.id || ""}
            onChange={handleCourseChange}
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.title} {course.courseId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {currentUser && (
          <IconButton onClick={() => setShowModal(true)}>
            <AddCircleIcon />
          </IconButton>
        )}
        {showModal && (
          <NewDiscussionModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            handleAddDiscussion={handleAddDiscussion}
            newDiscussionTitle={newDiscussionTitle}
            setNewDiscussionTitle={setNewDiscussionTitle}
            newDiscussionDescription={newDiscussionDescription}
            setNewDiscussionDescription={setNewDiscussionDescription}
            discussionPrivacy={discussionPrivacy}
            setDiscussionPrivacy={setDiscussionPrivacy}
          />
        )}
        <DiscussionList
          discussions={discussions}
          selectedDiscussion={selectedDiscussion}
          setSelectedDiscussion={setSelectedDiscussion}
          currentUser={currentUser}
          handleEditDiscussion={handleEditDiscussion}
          editingDiscussion={editingDiscussion}
          setEditingDiscussion={setEditingDiscussion}
          updateDiscussion={updateDiscussion}
          cancelEditing={cancelEditing}
        />
      </div>
    </div>
  );
}

export default Discussions;
