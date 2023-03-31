import CourseNavBar from "../CourseNavBar";
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


import { getUserRole } from "../../Backend/user";
import {createQuiz, fetchQuizzes, deleteQuiz, updateQuiz, getQuizAttempt} from '../../Backend/quiz';
import {QuizCreationDialog} from './QuizCreationDialog';
import ViewPastQuiz from "./ViewPastQuiz";
import { getLoggedInUserId } from "../../Backend/user";

function Quizzes() {
  const [open, setOpen]         = useState(false);
  const [quizzes, setQuizzes]   = useState([]);
  const [role, setRole]         = useState("");
  const [clicked, setClicked] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [studentPoints, setStudentPoints] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [quizDeadline, setQuizDeadline] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizPoints, setQuizPoints] = useState("");
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentTimestamp, setCurrentTimestamp] = useState(null);
  

  const location = useLocation();
  const courseId = location.state?.courseId;

  const updateQuizList = (courseId) => {
    fetchQuizzes(courseId).then((quizzes) => {
        setQuizzes(quizzes);
    })
  }

  const clickView = (quiz) => {
    try {
      if (quiz.attempted) {
        const studentDocId = getLoggedInUserId();
        getQuizAttempt(courseId,studentDocId, quiz.quizId).then((attempt) => {
          setStudentAnswers(attempt.answers);
          setStudentAnswers(attempt.points);
          const QuizDetails = {
            name: quiz.name,
            description: quiz.description,
            points: quiz.points,
            deadline: quiz.deadline,
            questions: quiz.questions,
            studentAnswers: attempt.answers,
            studentPoints: attempt.points,
            attemptedOn: attempt.attemptedOn,
            isGraded: attempt.isGraded,
            attempts: quiz.attempts,
          }
          setQuizDetails(QuizDetails);
          if(quiz.deadline !== null) {
            const date = quiz.deadline.getDate();
            const currentDate = new Date();
            if (date < currentDate) {
              setClicked(true);
            }
          }
        })
      }
      
      
    } catch (error) {
      console.log("error in getting quiz attempt.");
    }
  }

  const defaultNewQuiz = {
    name: "",
    description: "",
    points: 0,
    deadline: null,
    timeLimit: null,
    questions: []
  }



  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    getUserRole().then(role => {
      setRole(role);
    })
    updateQuizList(courseId);
  }, [location]);

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />

      <h1 className="title" >Quizzes</h1>

      { role === "instructor" &&
        <Button
          className="add-button"
          style = {{display: 'block', margin: 'auto'}}
          onClick={() => {setOpen(true);}}
          variant="contained"
        >
          Create New Quiz      
        </Button>
      }
      { role === "student" && quizzes !== null && quizzes.length > 0 &&
        <div style={{textAlign: 'center'}}>
          <h2 style={{color:'white'}}>Attempted Quizzes</h2>
        </div>
      }

      { role === "instructor" &&
      <div style={{
        display: "block",
        margin: "auto",
        padding: "20px 0",
        width: "80%",
      }}>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} style={{borderStyle: "hidden"}} >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <TableHead style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
            <TableRow style={{borderBottom: "1px solid #fff1"}}>
              <TableCell style={{color: "white", fontSize: "1em"}}>Quiz</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Due</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Points</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Attempts</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            {quizzes.map((quiz)=><>
              <TableRow>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.name}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.deadline !== null ? quiz.deadline.toLocaleString('en-US') : "No Deadline"}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.points + " pts"}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.attempts + " times"}
                </TableCell>
                <TableCell style={{textAlign: "right", borderBottom: "1px solid #fff1"}}>
                  {role === "instructor" && <>
                    <Button variant="outlined" onClick={()=>{
                      setEditingQuiz(quiz);
                    }}>Edit</Button>
                    <IconButton
                      sx={{"& .MuiSvgIcon-root": { color: "#FFF4" }}}
                      style={{margin: "auto 0 auto 10px", height: "auto"}}
                      onClick={()=>{
                        deleteQuiz(courseId, quiz.quizId).then(()=>{
                          updateQuizList(courseId);
                        });
                      }}
                    >
                      <DeleteIcon/> 
                    </IconButton>
                  </>}
                </TableCell>
              </TableRow>
            </>)}
          </TableBody>
          </Table>
        </TableContainer>
      </div>
      }
      <QuizCreationDialog
        title="Create Quiz"
        open={open}
        default={defaultNewQuiz}
        onClose={()=>{setOpen(false)}}
        onSave={(quiz)=>{
          createQuiz(courseId, quiz).then(()=>{
            updateQuizList(courseId);
          });
          setOpen(false);
        }}
      />

      <QuizCreationDialog
        title="Edit Quiz"
        open={editingQuiz !== null}
        default={editingQuiz}
        onClose={()=>{setEditingQuiz(null)}}
        onSave={(quiz)=>{
          updateQuiz(courseId, editingQuiz.quizId, quiz).then(()=>{
            updateQuizList(courseId);
          });
          setEditingQuiz(null);
        }}
      />
    { role === "student" && quizzes !== null && quizzes.length > 0 &&
      <div style={{
        display: "block",
        margin: "auto",
        padding: "20px 0",
        width: "80%",
      }}>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} style={{borderStyle: "hidden"}} >
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <TableHead style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
            <TableRow style={{borderBottom: "1px solid #fff1"}}>
              <TableCell style={{color: "white", fontSize: "1em"}}>Quiz</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Due</TableCell>
              <TableCell style={{color: "white", fontSize: "1em"}}>Points Earned</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            {quizzes.map((quiz)=><>
              {quiz.attempted && <TableRow>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.name}
                </TableCell>
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.deadline !== null ? quiz.deadline.toLocaleString('en-US') : "No Deadline"}
                </TableCell>
    
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1"}}>
                  {quiz.isGraded ? quiz.finalScore + " / "+quiz.points + " pts" : "Ungraded"}
                  
                </TableCell>
                <TableCell style={{textAlign: "right", borderBottom: "1px solid #fff1"}}>
                  <Button variant="outlined" 
                  onClick={()=>{
                    setQuizName(quiz.name);
                    setQuizDesc(quiz.description);
                    setQuizDeadline(quiz.deadline);
                    setQuizQuestions(quiz.questions);
                    setQuizPoints(quiz.points);
                    clickView(quiz);
                  }}>VIEW</Button>
                </TableCell>
              </TableRow>
              }
            </>)}
          </TableBody>
          </Table>
        </TableContainer>
      </div>
      }
      <ViewPastQuiz
        title={quizTitle}
        quizDetails = {quizDetails} 
        open={clicked}
        onClose={()=>{setClicked(false)}}
      />
    </div>
  );
}

export default Quizzes;
