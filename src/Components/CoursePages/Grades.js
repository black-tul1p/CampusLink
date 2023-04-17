import React from "react";
import "../../Styles/App.css";
import { useState, useEffect} from "react";
import CourseNavBar from "../CourseNavBar";
import { getUserRole } from "../../Backend/user";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { updateCourseWeight } from "../../Backend/grade";
import { useNavigate, useLocation } from "react-router-dom";

function Grades() {

  const [weights, setWeights] = useState([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [role, setRole] = useState("");
  const [courseDocId, setCourseDocId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user role
        const courseID = location.state?.courseId;
        setCourseDocId(courseID);
        console.log("ID: " + courseID);
        const role = await getUserRole();
        setRole(role);
        console.log("role: " + role);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location]);

  const handleWeightsChange = (type, value) => {
    setWeights((prevWeights) => {
      const index = prevWeights.findIndex((w) => w.type === type);
      if (index >= 0) {
        return [
          ...prevWeights.slice(0, index),
          { type, weight: value },
          ...prevWeights.slice(index + 1),
        ];
      } else {
        return [...prevWeights, { type, weight: value }];
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    const totalWeight = weights.reduce((acc, w) => acc + Number(w.weight), 0);
    if (totalWeight !== 100) {
      alert('total weight must be 100');
      return;
    }
    updateCourseWeight(courseDocId, weights);
    handleClose();
  };


  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <h1 className="title">Grades</h1>
      <center>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Change Weights
        </Button>
      </center>

      <Dialog 
        open={open} 
        onClose={handleClose}
        sx={{ "& .MuiPaper-root": { backgroundColor: "rgb(16, 46, 68)" } }}
      >
        <DialogTitle sx={{ color: "#fff" }}>Change Weights</DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin="dense"
          id="quiz"
          label="Quiz weight"
          type="number"
          defaultValue={weights.find((w) => w.type === 'quiz')?.weight || ''}
          onChange={(e) => handleWeightsChange('quiz', e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="assignment"
          label="Assignment weight"
          type="number"
          defaultValue={weights.find((w) => w.type === 'assignment')?.weight || ''}
          onChange={(e) => handleWeightsChange('assignment', e.target.value)}
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Grades;
