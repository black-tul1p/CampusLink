import React from 'react';
import CourseNavBar from "../CourseNavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAttemptedBy, getEnrolledStudents } from '../../Backend/quiz';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';

function AttemptsList() {
    const [quizId, setQuizId] = useState("");
    const [quizName, setQuizName] = useState("");
    const [courseId, setCourseId] = useState("");
    const location = useLocation();
    const [attemptedBy, setAttemptedBy] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    useEffect( () => {
        async function fetchData() {
            setQuizId(location.state?.quizId);
            setCourseId(location.state?.courseId);
            setQuizName(location.state?.quizName);
            try {
                const attempted = await getAttemptedBy(location.state?.courseId, location.state?.quizId);
                if (attempted) {
                    console.log("inside if");
                    setAttemptedBy(attempted);
                }
                console.log("outside if");
                const enrolled = await getEnrolledStudents(courseId);
                setEnrolledStudents(enrolled);
            } catch (error) {
                throw new Error("Error getting quiz attemptedBy info:" + error);
            }
          }
          fetchData();

      }, [location]);

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <h3>Quiz Attempts: {quizName}</h3>
      <div style={{
        display: "block",
        margin: "auto",
        padding: "20px 0",
        width: "90%",
      }}>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} style={{borderStyle: "hidden"}} >
            <colgroup>
                <col width="50%" />
                <col width="20%" />
                <col width="30%" />
            </colgroup>
            <TableHead style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
                <TableRow style={{borderBottom: "1px solid #fff1"}}>
                <TableCell style={{color: "white", fontSize: "1em"}}>Students</TableCell>
                <TableCell style={{color: "white", fontSize: "1em"}}>Score</TableCell>
                <TableCell style={{color: "white", fontSize: "1em"}}>Attempts</TableCell>
                <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                {enrolledStudents.map((student)=>
                <>
                <TableRow>
                    <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {student.lastName + ", " + student.firstName}
                    </TableCell>
                    <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                    {"10/10 pts"}
                    </TableCell>
                    <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                        {attemptedBy.contains(student) ? (
                            <Button variant="outlined" onClick={()=>{
                            console.log("view " + student.firstName +"'s attempt!");
                            }}>
                            View and Grade
                            </Button>
                        ):"Unattempted"}
                    </TableCell>
                </TableRow>
                </>)}
            </TableBody>
            </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default AttemptsList
