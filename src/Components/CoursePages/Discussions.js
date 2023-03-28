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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { css } from "@emotion/react";

const StyledAddButton = styled(Button)({
  display: "flex",
  justifyContent: "space-around",
  borderRadius: "1em",
  width: "12em",
  height: "4em",
});

const outlinedInputStyle = css`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: black;
    }
    &:hover fieldset {
      border-color: black;
    }
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;


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
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedFilterTopic, setSelectedFilterTopic] = useState("");
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");


  const defaultTopics = [
    { id: 1, name: "General" },
    { id: 2, name: "Groups" },
  ];

  const handleAddNewTopic = () => {
    if (newTopicName.trim() === "") {
      alert("Please enter a topic name.");
      return;
    }

    setTopics((prevTopics) => [
      ...prevTopics,
      {
        id: prevTopics.length + 1,
        name: newTopicName,
      },
    ]);

    setNewTopicName("");
    setShowTopicModal(false);
  };

  const handleTopicModalClose = () => {
    setShowTopicModal(false);
    setNewTopicName("");
  };

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
    setTopics(defaultTopics);
  }, []);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleFilterTopicChange = (event) => {
    setSelectedFilterTopic(event.target.value);
  };

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

  const NewTopicModal = ({
    showTopicModal,
    handleModalClose,
    newTopicName,
    setNewTopicName,
    handleAddNewTopic,
  }) => {
    return (
      <Dialog open={showTopicModal} onClose={handleModalClose}>
        <DialogTitle>New Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new topic you want to create.
          </DialogContentText>
          <TextField
            label="New Topic Name"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewTopic} color="primary">
            Add Topic
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  

  return (
    <div>
      <CourseNavBar />
      <DiscussionContainer>
        <DiscussionHeader>
          <Typography variant="h3" style={{ justifySelf: "flex-start" }}>
            Discussions
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Select Topic</InputLabel>
            <Select
              label="Select Topic"
              value={selectedTopic}
              onChange={handleTopicChange}
            >
              {topics.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {role === "instructor" && (
            <>
              <StyledAddButton
                onClick={() => setShowModal(true)}
                variant="contained"
              >
                New Board
                <AddCircleIcon />
              </StyledAddButton>
              <StyledAddButton
                onClick={() => setShowTopicModal(true)}
                variant="contained"
              >
                New Topic
                <AddCircleIcon />
              </StyledAddButton>
            </>
          )}
        </DiscussionHeader>
        <DiscussionList
          discussions={discussions}
          selectedDiscussion={selectedDiscussion}
          setSelectedDiscussion={setSelectedDiscussion}
          filterByTopic={selectedFilterTopic}
          editingDiscussion={editingDiscussion}
          setEditingDiscussion={setEditingDiscussion}
          handleDiscussionUpdate={handleDiscussionUpdate}
        />
      </DiscussionContainer>
      <NewDiscussionModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        newDiscussionTitle={newDiscussionTitle}
        setNewDiscussionTitle={setNewDiscussionTitle}
        newDiscussionDesc={newDiscussionDesc}
        setNewDiscussionDesc={setNewDiscussionDesc}
        discussionPrivacy={discussionPrivacy}
        setDiscussionPrivacy={setDiscussionPrivacy}
        handleAddDiscussion={handleAddDiscussion}
      />
      <NewTopicModal
        showTopicModal={showTopicModal}
        handleModalClose={handleTopicModalClose}
        newTopicName={newTopicName}
        setNewTopicName={setNewTopicName}
        handleAddNewTopic={handleAddNewTopic}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message={
            <>
              <CheckCircle />
              {snackbarMessage}
            </>
          }
        />
      </Snackbar>
    </div>
  );
}
export default Discussions;