import React from "react";
import "../../Styles/App.css";
import { useState, useEffect} from "react";
import CourseNavBar from "../CourseNavBar";
<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { getAssigmentsByCourse, getAssigmentSubmission } from "../../Backend/grades";
import { getLoggedInUserId } from "../../Backend/user";
import "../../Styles/Assignments.css";
import { getUserRole } from "../../Backend/user";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { updateCourseWeight } from "../../Backend/grade";
import "../../Styles/App.css";

function Grades() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;
  const [assignments, setAssignments] = useState([]);

  const [weights, setWeights] = useState([]);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [courseDocId, setCourseDocId] = useState("")

  useEffect(() => {
    async function fetchData() {
      const assignmentSubmissions = [];
      const courseID = location.state?.courseId;
      setCourseDocId(courseID);
      const role = await getUserRole();
      setRole(role);
      const assgns = await getAssigmentsByCourse(courseId);
      await Promise.all(
        assgns.map(async (assignment) => {
          const submission = await getAssigmentSubmission(assignment.id, getLoggedInUserId());
          const assignmentDetails = {
            title: assignment.title,
            points: assignment.points,
            score: submission.score,
            comments: submission.comments,
          }
          assignmentSubmissions.push(assignmentDetails);
        })
      );      
      setAssignments(assignmentSubmissions);  
    }
    fetchData();

=======
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
>>>>>>> main
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

<<<<<<< HEAD
  return (
    <div style={{ width: "100%", color: "white"}}>
      <CourseNavBar />

      <div style={{padding: "1.5em"}}>
        <div className ="header-box" style={{paddingBottom: "2em"}}>
          <div className="header-titles">
            <p>Grades</p>
            <p style={{ fontStyle: "italic" }}>Student View</p>
          </div>
          <div className="header-divider"></div>
        </div>
        <TableContainer >
          <Table sx={{ minWidth: 650 }} style={{borderStyle: "hidden"}} >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <TableHead style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
            <TableRow style={{borderBottom: "1px solid #fff1"}}>
              <TableCell style={{color: "white", fontSize: "1em"}}>Grade Item</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Points Earned</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Grade</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Comments</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody style={{width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            {assignments.map((assignment)=><>
              <TableRow>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {assignment.title}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {assignment.score + " / " + assignment.points}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {Number((assignment.score / assignment.points) * 100).toFixed(1) + "%"}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {assignment.comments !== null &&  assignment.comments !== undefined ? assignment.comments : "No Comments"}
                </TableCell>
              </TableRow>
            </>)}
          </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Change Weights
        </Button>
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
=======

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
>>>>>>> main
    </div>
  );
}

export default Grades;
