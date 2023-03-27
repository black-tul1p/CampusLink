import React, { useState, useEffect } from "react";
import CourseNavBar from "../CourseNavBar";
import "firebase/firestore";
import { useLocation } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import styled from "@emotion/styled";
import { getAllCourses } from "../../Backend/course";
import NewDiscussionModal from "./Modal";
import DiscussionList from "./DiscussionList";
import "../../Styles/Discussions.css";
import {
  createDiscussion,
  getCourseDiscussions,
  updateDiscussion,
} from "../../Backend/discuss";
import { getUserRole } from "../../Backend/user";
import { CheckCircle, WarningAmber } from "@mui/icons-material";

const StyledAddButton = styled(Button)({
  display: "flex",
  justifyContent: "space-around",
  borderRadius: "1em",
  width: "12em",
  height: "4em",
});

const DiscussionContainer = styled(Box)({
  padding: "2em 2em 0",
  height: "85vh",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "2em",
});

const DiscussionHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "2em",
});

function Discussions({ courseId }) {
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionDesc, setNewDiscussionDesc] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentCourseTitle, setCurrentCourseTitle] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [discussionPrivacy, setDiscussionPrivacy] = useState("open");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const courseID = location.state?.courseId;
    setCurrentCourseId(courseID);
  }, [location]);

  useEffect(() => {
    const updateRole = async () => {
      const role = await getUserRole();
      setRole(role);
    };

    updateRole();
  }, []);

  useEffect(() => {
    if (courseId && courses.length > 0) {
      const currentCourse = courses.find(
        (course) => course.courseId === courseId
      );
      if (currentCourse) {
        setCurrentCourseTitle(currentCourse.courseTitle);
      }
    }
  }, [courseId, courses]);

  const handleDiscussionUpdate = async () => {
    if (!editingDiscussion) return;

    const message = await updateDiscussion(editingDiscussion);
    setSnackbarMessage(message);
    setOpenSnackbar(true);

    setEditingDiscussion(null);
    fetchData();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getAllCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  const fetchData = async () => {
    if (!currentCourseId) return;

    const discussData = await getCourseDiscussions(currentCourseId);
    setDiscussions(discussData);
  };

  useEffect(() => {
    fetchData();
  }, [currentCourseId]);

  const handleAddDiscussion = async () => {
    if (newDiscussionTitle.trim() === "" || newDiscussionDesc.trim() === "") {
      alert("Please fill in all the fields.");
      return;
    }

    const board = {
      title: newDiscussionTitle,
      description: newDiscussionDesc,
      privacy: discussionPrivacy,
      courseTitle: currentCourseTitle,
    };

    if (currentCourseId) {
      const message = await createDiscussion(board, currentCourseId);
      setSnackbarMessage(message);
      setOpenSnackbar(true);

      setNewDiscussionTitle("");
      setNewDiscussionDesc("");
      setShowModal(false);
      fetchData();
    } else {
      alert("No course selected");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewDiscussionTitle("");
    setNewDiscussionDesc("");
    setDiscussionPrivacy("open");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <CourseNavBar />
      <DiscussionContainer>
        <DiscussionHeader>
          <Typography variant="h3" style={{ justifySelf: "flex-start" }}>
            Discussions
          </Typography>
          {/* <FormControl fullWidth>
            <InputLabel>Select Course</InputLabel>
            <Select
              label="Select Course"
              value={selectedCourse?.courseRef || ""}
              onChange={handleCourseChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.courseRef} value={course.courseRef}>
                  {course.courseTitle} {course.courseId}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          {role === "instructor" && (
            <StyledAddButton
              onClick={() => setShowModal(true)}
              variant="contained"
            >
              New Board
              <AddCircleIcon />
            </StyledAddButton>
          )}
        </DiscussionHeader>
        <DiscussionList
          discussions={discussions}
          selectedDiscussion={selectedDiscussion}
          setSelectedDiscussion={setSelectedDiscussion}
          handleEditDiscussion={(discussion) => {
            setEditingDiscussion(discussion);
          }}
          editingDiscussion={editingDiscussion}
          setEditingDiscussion={setEditingDiscussion}
          updateDiscussion={handleDiscussionUpdate}
          cancelEditing={() => {
            setEditingDiscussion(null);
          }}
        />
        {showModal && (
          <NewDiscussionModal
            showModal={showModal}
            closeModal={handleModalClose}
            handleAddDiscussion={handleAddDiscussion}
            newDiscussionTitle={newDiscussionTitle}
            setNewDiscussionTitle={setNewDiscussionTitle}
            newDiscussionDescription={newDiscussionDesc}
            setNewDiscussionDescription={setNewDiscussionDesc}
            discussionPrivacy={discussionPrivacy}
            setDiscussionPrivacy={setDiscussionPrivacy}
          />
        )}
      </DiscussionContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        style={{ marginLeft: "4em" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
          }}
          message={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {error ? <WarningAmber /> : <CheckCircle />}
              <span
                style={{
                  marginLeft: "1em",
                  alignSelf: "center",
                }}
              >
                {snackbarMessage}
              </span>
            </div>
          }
        />
      </Snackbar>
    </div>
  );
}

export default Discussions;
