import React from "react";
import CourseNavBar from "../CourseNavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { getAssigmentsByCourse, getAssigmentSubmission, updateCourseWeight,getAssigmentSubmissions, getAdditionalGradesForStudent, getAssignmentGradesForStudent } from "../../Backend/grades";
import { getLoggedInUserId } from "../../Backend/user";
import "../../Styles/Assignments.css";
import { getUserRole } from "../../Backend/user";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import "../../Styles/App.css";
import { getQuizAttempt } from "../../Backend/quiz";


function Grades() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;
  const [assignments, setAssignments] = useState([]);
  const [courseAssignments, setCourseAssignments] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [assignmentGrades, setAssignmentGrades] = useState([]);
  const [additionalGrades, setAdditionalGrades] = useState([]);

  const [weights, setWeights] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [role, setRole] = useState("");
  const [courseDocId, setCourseDocId] = useState("")

  const [gradeTitle, setGradeTitle] = useState("");
  const [gradePoints, setGradePoints] = useState("");


  useEffect(() => {
    async function fetchData() {
      const assignmentSubmissions = [];
      const allSubs = [];
      const courseID = location.state?.courseId;
      setCourseDocId(courseID);
      const role = await getUserRole();
      setRole(role);
      const assgnGrades = await getAssignmentGradesForStudent(courseId, getLoggedInUserId());
      const addGrades = await getAdditionalGradesForStudent(courseId, getLoggedInUserId())
      setAdditionalGrades(addGrades);
      setAssignmentGrades(assgnGrades);
      const assgns = await getAssigmentsByCourse(courseId);
      setCourseAssignments(assgns);
      await Promise.all(
        assgns.map(async (assignment) => {
          const submissions = await getAssigmentSubmissions(assignment.id);
          allSubs.push(submissions);
        })
      );
      setAllSubmissions(allSubs);
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

  const handleOpened = () => {
    setOpen1(true);
  };

  const handleClosed = () => {
    setOpen1(false);
  };

  const handleUpdate = async () => {
    const totalWeight = weights.reduce((acc, w) => acc + Number(w.weight), 0);
    if (totalWeight !== 100) {
      alert('total weight must be 100');
      return;
    }
    await updateCourseWeight(courseDocId, weights);
    handleClose();
    alert('Weight update successful!');
  };

  const handleAdd = () => {
    handleClosed();
  };

  const clickView = () => {
    console.log("clicked view!");
  };
  const clickAddGrade = () => {
  };
  
  return (
    <div style={{ width: "100%", color: "white", maxHeight:"100vh", overflow:"auto"}}>
      <CourseNavBar />

      <div style={{padding: "1.5em"}}>
        <div className ="header-box" style={{paddingBottom: "2em"}}>
          <div className="header-titles">
            <p>Grades</p>
            {role === "instructor" && <p style={{ fontStyle: "italic" }}>Instructor View</p>}
          </div>
          <div className="header-divider"></div>
        </div>
        {role === "student" && 
        <>
          <TableContainer style={{marginBottom:"2em"}}>
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
              {assignmentGrades.map((assignment)=><>
                <TableRow>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {assignment.title}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {assignment.earnedPoints + " / " + assignment.totalPoints}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {Number((assignment.earnedPoints / assignment.totalPoints) * 100).toFixed(1) + "%"}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {assignment.comments !== null &&  assignment.comments !== undefined ? assignment.comments : "No Comments"}
                  </TableCell>
                </TableRow>
              </>)}
              {additionalGrades.map((assignment)=><>
                <TableRow>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {assignment.title}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {assignment.earnedPoints + " / " + assignment.totalPoints}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {Number((assignment.earnedPoints / assignment.totalPoints) * 100).toFixed(1) + "%"}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {assignment.comments !== null &&  assignment.comments !== undefined ? assignment.comments : "No Comments"}
                  </TableCell>
                </TableRow>
              </>)}
            </TableBody>
            </Table>
          </TableContainer>
        </>
        }
        {role === "instructor" && 
        <div>
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
          <TableContainer style={{marginBottom:"2em"}}>
            <Table sx={{ minWidth: 650 }} style={{borderStyle: "hidden"}} >
            {/* <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup> */}
            <TableHead style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
              <TableRow style={{borderBottom: "1px solid #fff1"}}>
                <TableCell style={{color: "white", fontSize: "1em"}}>Grade Item</TableCell>
                <TableCell style={{color: "white", fontSize: "1em"}}>Grade Average</TableCell>
                <TableCell style={{color: "white", fontSize: "1em"}}>View Student Grades</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody style={{width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              {courseAssignments.map((courseAssignment)=><>
                <TableRow>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {courseAssignment.title}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {"100%"}
                  </TableCell>
                  <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        clickView();
                      }}
                    >
                      VIEW
                    </Button>
                  </TableCell>
                </TableRow>
              </>)} 
            </TableBody>
            </Table>
          </TableContainer>
          <Button
              onClick={handleOpened}
              variant="contained"
              color="primary"
              style={{
                padding: "1em",
                borderRadius: "1em",
              }}
            >
            Add Grade Item
          </Button> 
          <Dialog 
          open={open1} 
          onClose={handleClosed}
          sx={{ "& .MuiPaper-root": { backgroundColor: "rgb(16, 46, 68)" } }}
          >
            <DialogTitle sx={{ color: "#fff" }}>Add Grade Item</DialogTitle>
            <DialogContent>
              <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="string"
              defaultValue={gradeTitle}
              onChange={(e) => {
                setGradeTitle(e.target.value);
              }}
              fullWidth
            />
            <TextField
              margin="dense"
              id="totalPoints"
              label="Total Points"
              type="number"
              defaultValue={gradePoints}
              onChange={(e) => {
                setGradePoints(e.target.value);
              }}
              fullWidth
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAdd}>Update</Button>
              <Button onClick={handleClosed}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
        } 
      </div>
    </div>
  );
}

export default Grades;
