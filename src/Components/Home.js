import React, { useContext } from "react";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  CircularProgress,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import {
  getUserCourses,
  createCourse,
  removeCourse,
  getCourseDetailsById,
  updateCourse,
  sendUpdateEmail,
} from "../Backend/course";
import { getLoggedInUserId, getUserRole } from "../Backend/user";
import { AuthContext } from "../Contexts/AuthContext";
import { TagFaces } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function Homepage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [newCourseTitle, setNewCourseTitle] = React.useState("");
  const [newCourseId, setNewCourseId] = React.useState("");
  const [newCourseDept, setNewCourseDept] = React.useState("");
  const [newCourseDesc, setNewCourseDesc] = React.useState("");
  const openCourseDialogue = () => {
    setOpen(true);
  };
  const closeCourseDialogue = () => {
    setOpen(false);
  };
  const submitCourseDialogue = () => {
    if (!newCourseTitle || !newCourseId || !newCourseDept || !newCourseDesc) {
      setSnackbarMessage(`Failed to create course`);
      setOpenSnackbar(true);
      return;
    }

    try {
      createCourse(
        newCourseTitle,
        newCourseId,
        3,
        newCourseDept,
        150,
        0,
        newCourseDesc,
        getLoggedInUserId()
      ).then(() => {
        fetchData();
      });
      closeCourseDialogue();
    } catch (error) {
      setSnackbarMessage(`Failed to create course`);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  async function fetchData() {
    try {
      // Get user role
      const role = await getUserRole();
      setRole(role);
      setSnackbarMessage(`Hello, ${user.displayName}`);
      setOpenSnackbar(true);

      // Get courses
      const courses = await getUserCourses(role);
      if (courses.length === 0) {
        setCourses([]);
      } else {
        setCourses(courses);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [editingCourseId, setEditingCourseId] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editingDept, setEditingDept] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const openEditDialogue = () => {
    setEditOpen(true);
  };

  const closeEditDialogue = () => {
    setEditOpen(false);
    setEditingCourseId("");
    setEditingTitle("");
    setEditingId("");
    setEditingDept("");
    setEditingDesc("");

    setNewCourseTitle("");
    setNewCourseId("");
    setNewCourseDept("");
    setNewCourseDesc("");
  };

  const submitEditDialogue = () => {
    // console.log(newCourseTitle === "");
    setNewCourseTitle(editingTitle);
    setNewCourseId(editingId);
    setNewCourseDept(editingDept);
    setNewCourseDesc(editingDesc);
    let data = {
      courseTitle: editingTitle,
      courseId: editingId,
      department: editingDept,
      description: editingDesc,
    };
    console.log(data);

    updateCourse(editingCourseId, data);
    setSnackbarMessage("Successfully Edited Course Information");
    setOpenSnackbar(true);
    closeEditDialogue();
    const title = editingTitle + " " + editingId;
    const message = editingDept + "\n" + editingDesc;
    sendUpdateEmail(title, message, editingCourseId);
  };

  return (
    <div className="homepage-student">
      <div className="header-container">
        <div className="header-titles">
          <p>My Courses</p>
          {role === "instructor" ? (
            <p style={{ fontStyle: "italic" }}>Instructor View</p>
          ) : (
            <p style={{ fontStyle: "italic" }}>Student View</p>
          )}
        </div>
        <div className="divider"></div>
      </div>
      {loading ? (
        <div
          style={{
            flexGrow: 1,
            marginTop: "30vh",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="homepage-student-container">
          {courses.length > 0 ? (
            courses
              .filter(
                (course) =>
                  course.description && course.courseId && course.courseTitle
              )
              .map((course, index) => (
                <div
                  key={index}
                  className="course-container"
                  forcourse={course.databaseId}
                  onClick={() => {
                    const courseId = course.databaseId;
                    navigate("/announcements", { state: { courseId } });

                    /*
                    setEditingCourseId(course.databaseId);
                    setEditingTitle(course.courseTitle);
                    setEditingId(course.courseId);
                    setEditingDept(course.department);
                    setEditingDesc(course.description);
                    setNewCourseTitle(editingTitle);
                    setNewCourseId(editingId);
                    setNewCourseDept(editingDept);
                    setNewCourseDesc(editingDesc);
                    openEditDialogue();
                    */
                  }}
                >
                  {role === "instructor" && ( // Display delete button only for instructors
                    <div>
                      <div
                        className="delete-course-container"
                        onClick={(event) => {
                          const id =
                            event.currentTarget.parentElement.getAttribute(
                              "forcourse"
                            );
                          try {
                            removeCourse(id).then(() => {
                              fetchData();
                            });
                          } catch (error) {
                            setSnackbarMessage(`Failed to remove course`);
                            setOpenSnackbar(true);
                          }
                        }}
                      >
                        <DeleteIcon fontSize="large" />
                      </div>
                    </div>
                  )}

                  <div className="course-container-top">
                    <h3>
                      {course.courseTitle} {course.courseId} :
                    </h3>
                    <h3>{course.description}</h3>
                  </div>
                  <div className="course-container-bottom">
                    <Button
                      className="edit-course-container"
                      onClick={(event) => {
                        event.stopPropagation();
                        setEditingCourseId(course.databaseId);
                        setEditingTitle(course.courseTitle);
                        setEditingId(course.courseId);
                        setEditingDept(course.department);
                        setEditingDesc(course.description);
                        setNewCourseTitle(course.courseTitle);
                        setNewCourseId(course.courseId);
                        setNewCourseDept(course.department);
                        setNewCourseDesc(course.description);
                        openEditDialogue();
                      }}
                    >
                      <EditIcon
                        sx={{ zIndex: 2 }}
                        color="warning"
                        fontSize="large"
                      />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <Typography
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {role === "instructor" ? (
                <h2>
                  There are no courses here
                  <br />
                  :)
                </h2>
              ) : (
                <h2>
                  You haven't been added to any courses yet
                  <br />
                  :)
                </h2>
              )}
            </Typography>
          )}
          {role === "instructor" && (
            <div onClick={openCourseDialogue} className="add-course-container">
              <AddCircleIcon fontSize="large" />
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
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
              <TagFaces />
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

      <Dialog
        className="create-course-dialogue"
        open={open}
        onClose={closeCourseDialogue}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            label="Course Title"
            sx={{
              margin: "5px",
              width: "50%",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            onChange={(e) => {
              setNewCourseTitle(e.target.value);
            }}
          />
          <TextField
            label="Course ID"
            sx={{
              margin: "5px",
              width: "25%",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            onChange={(e) => {
              setNewCourseId(e.target.value);
            }}
          />
          <TextField
            label="Department"
            sx={{
              margin: "5px",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            fullWidth
            onChange={(e) => {
              setNewCourseDept(e.target.value);
            }}
          />
          <TextField
            label="Description"
            sx={{
              margin: "5px",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            minRows="2"
            fullWidth
            multiline
            onChange={(e) => {
              setNewCourseDesc(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCourseDialogue}>Cancel</Button>
          <Button onClick={submitCourseDialogue}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className="create-course-dialogue"
        open={editOpen}
        onClose={closeEditDialogue}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            label={newCourseTitle}
            sx={{
              margin: "5px",
              width: "50%",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            onChange={(e) => {
              setEditingTitle(e.target.value);
            }}
          />
          <TextField
            label={newCourseId}
            sx={{
              margin: "5px",
              width: "25%",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            onChange={(e) => {
              setEditingId(e.target.value);
            }}
          />
          <TextField
            label={newCourseDept}
            sx={{
              margin: "5px",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            fullWidth
            onChange={(e) => {
              setEditingDept(e.target.value);
            }}
          />
          <TextField
            label={newCourseDesc}
            sx={{
              margin: "5px",
              "& .MuiInputBase-input": { color: "white !important" },
              "& .MuiInputLabel-root": { color: "white !important" },
            }}
            variant="standard"
            minRows="2"
            fullWidth
            multiline
            onChange={(e) => {
              setEditingDesc(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialogue}>Cancel</Button>
          <Button onClick={submitEditDialogue}>Submit Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Homepage;
