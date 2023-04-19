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
import { getAssigmentsByCourse, getAssigmentSubmission } from "../../Backend/grades";
import { getLoggedInUserId } from "../../Backend/user";
import "../../Styles/Assignments.css";
function Grades() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;
  const [userId, setUserId] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const assignmentSubmissions = [];
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

  }, [location]);

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
      </div>
    </div>
  );
}

export default Grades;
