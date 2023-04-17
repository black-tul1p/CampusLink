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
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { getAllCourses, getCourseDetailsById } from "../../Backend/course";
import NewDiscussionModal from "./Modal";
import DiscussionList from "./DiscussionList";
import "../../Styles/Discussions.css";
import "../../Styles/App.css";
import {
  createDiscussion,
  getCourseDiscussions,
  updateDiscussion,
  createTopic,
  getCourseTopics,
  updateTopicName,
  getEnrolledStudents,
  updateDiscussionPrivacy,
} from "../../Backend/discuss";
import { getUserRole } from "../../Backend/user";
import { CheckCircle, WarningAmber } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from "@mui/material";
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

function Discussions() {
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionDesc, setNewDiscussionDesc] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentCourseTitle, setCurrentCourseTitle] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [discussionPrivacy, setDiscussionPrivacy] = useState("open");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState(1);
  const [topics, setTopics] = useState([]);
  const [selectedFilterTopic, setSelectedFilterTopic] = useState("");
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [editingTopic, setEditingTopic] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const fetchTopics = async () => {
    if (!currentCourseId) return;

    const courseTopics = await getCourseTopics(currentCourseId);
    setTopics([...courseTopics]);
    setSelectedTopic(courseTopics[0]?.id || 1);
    setSelectedFilterTopic(courseTopics[0]?.id || "");
  };

  const handleNewTopicNameChange = (event) => {
    setNewTopicName(event.target.value);
  };

  const handleEditTopic = (topicId) => {
    setEditingTopic(topicId);
  
    const selectedTopicObj = topics.find((topic) => topic.id === topicId);
    setNewTopicName(selectedTopicObj.name);
  };

  const handleAddNewTopic = async () => {
    if (newTopicName.trim() === "") {
      alert("Please enter a topic name.");
      return;
    }
  
    const newTopic = await createTopic(newTopicName, currentCourseId);
    setSnackbarMessage("Topic successfully created!");
    setOpenSnackbar(true);
  
    setTopics((prevTopics) => [
      ...prevTopics,
      { id: newTopic.id, name: newTopic.name },
    ]);
  
    setNewTopicName("");
    setShowTopicModal(false);
  };

  const handleTopicModalClose = () => {
    setShowTopicModal(false);
    setNewTopicName("");
  };

  const handleTopicUpdate = async () => {
    if (newTopicName.trim() === "") {
      alert("Please enter a topic name.");
      return;
    }
  
    const updatedTopic = await updateTopicName(editingTopic, newTopicName);
    setSnackbarMessage("Topic successfully updated!");
    setOpenSnackbar(true);
  
    const updatedTopics = topics.map((topic) =>
    topic.id === updatedTopic.id ? { ...topic, name: updatedTopic.name } : topic);
    setTopics(updatedTopics);
  
    setNewTopicName("");
    setEditingTopic(null);
  };

  const handleStudentCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedStudents([...selectedStudents, event.target.value]);
    } else {
      setSelectedStudents(
        selectedStudents.filter((student) => student !== event.target.value)
      );
    }
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
    fetchTopics();
  }, [currentCourseId]);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      if (!currentCourseId) return;
  
      const courseEnrolledStudents = await getEnrolledStudents(currentCourseId);
      setEnrolledStudents(courseEnrolledStudents);
    };
  
    fetchEnrolledStudents();
  }, [currentCourseId]);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    setSelectedFilterTopic(event.target.value);
  };

  const filterDiscussionsByTopic = () => {
    if (!selectedTopic || !discussions) {
      setFilteredDiscussions([]);
      return;
    }
  
    const filtered = discussions.filter(
      (discussion) =>
        discussion.topic === selectedTopic && discussion.courseId === currentCourseId
    );
    setFilteredDiscussions(filtered);
  };

  useEffect(() => {
    filterDiscussionsByTopic();
  }, [selectedFilterTopic, discussions]);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      if (currentCourseId) {
        const currentCourse = await getCourseDetailsById(currentCourseId);
        if (currentCourse) {
          setCurrentCourseTitle(
            `${currentCourse.courseTitle} ${currentCourse.courseId}`
          );
        }
      }
    };

    fetchCourseTitle();
  }, [currentCourseId]);

  const handleDiscussionUpdate = async () => {
    if (!editingDiscussion) return;

    const message = await updateDiscussion(editingDiscussion);
    setSnackbarMessage(message);
    setOpenSnackbar(true);

    setEditingDiscussion(null);
    fetchData();
  };

  const fetchData = async () => {
    if (!currentCourseId) return;
  
    const courseDiscussions = await getCourseDiscussions(currentCourseId);
    setDiscussions(courseDiscussions);
  };

  useEffect(() => {
    fetchData();
  }, [currentCourseId, selectedFilterTopic]);

  const handleAddDiscussion = async () => {
    if (newDiscussionTitle.trim() === "" || newDiscussionDesc.trim() === "") {
      alert("Please fill in all the fields.");
      return;
    }

    const selectedTopicObj = topics.find((topic) => topic.id === selectedTopic);
    if (!selectedTopicObj) {
      alert("No topic selected");
      return;
    }

    const selectedTopicId = selectedTopicObj.id;

    const board = {
      courseTitle: currentCourseTitle,
      title: newDiscussionTitle,
      description: newDiscussionDesc,
      privacy: discussionPrivacy,
      topic: selectedTopicId,
    };

    console.log(board);

    if (currentCourseId) {
      const message = await createDiscussion(board, currentCourseId, selectedStudents);
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

  const sendUpdateEmail = () => {
    
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
          <StyledAddButton
                onClick={() => setShowModal(true)}
                variant="contained"
              >
                New Post
                <AddCircleIcon />
              </StyledAddButton>
          {role === "instructor" && (
            <>
              <StyledAddButton
                onClick={() => setShowTopicModal(true)}
                variant="contained"
              >
                New Topic
                <AddCircleIcon />
              </StyledAddButton>
              {selectedTopic && (
                <IconButton onClick={() => handleEditTopic(selectedTopic)}>
                 <EditIcon />
                </IconButton>
              )}
            </>
          )}
        </DiscussionHeader>
        <DiscussionList
          discussions={filteredDiscussions}
          selectedDiscussion={selectedDiscussion}
          setSelectedDiscussion={setSelectedDiscussion}
          filterByTopic={selectedFilterTopic}
          editingDiscussion={editingDiscussion}
          setEditingDiscussion={setEditingDiscussion}
          handleDiscussionUpdate={handleDiscussionUpdate}
          handleEditTopic={handleEditTopic}
          role={role}
          updateDiscussionPrivacy={updateDiscussionPrivacy}
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
      <Dialog
        open={showTopicModal || editingTopic !== null}
        onClose={handleTopicModalClose}
        sx={{ "& .MuiPaper-root": { backgroundColor: "rgb(16, 46, 68)" } }}
      >
        <DialogTitle sx={{ color: "#fff" }}>
          {editingTopic ? "Edit Topic" : "New Topic"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" css={outlinedInputStyle}>
            <InputLabel htmlFor="new-topic-name">New Topic Name</InputLabel>
            <OutlinedInput
              id="new-topic-name"
              value={newTopicName}
              onChange={handleNewTopicNameChange}
              label="New Topic Name"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <StyledAddButton onClick={handleTopicModalClose} color="primary">
            Cancel
          </StyledAddButton>
          <StyledAddButton
            onClick={editingTopic ? handleTopicUpdate : handleAddNewTopic}
            color="primary"
          >
            {editingTopic ? "Save Changes" : "Add Topic"}
          </StyledAddButton>
          {editingTopic && (
            <StyledAddButton onClick={() => setEditingTopic(null)} color="secondary">
              Cancel Edit
            </StyledAddButton>
         )}
        </DialogActions>
      </Dialog>
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