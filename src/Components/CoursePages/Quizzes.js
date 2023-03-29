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
import {createQuiz, fetchQuizzes, deleteQuiz, updateQuiz} from '../../Backend/quiz'
import {QuizCreationDialog} from './QuizCreationDialog'

function Quizzes() {
  const [open, setOpen]         = useState(false);
  const [quizzes, setQuizzes]   = useState([]);
  const [role, setRole]         = useState("");
  
  const location = useLocation();

  const updateQuizList = (courseId) => {
    fetchQuizzes(courseId).then((quizzes) => {
        setQuizzes(quizzes);
    })
  }

  const courseId = location.state?.courseId;

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
              <TableCell style={{color: "white", fontSize: "1em", textAlign: "right"}}>Points</TableCell>
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
                <TableCell style={{color: "white", borderBottom: "1px solid #fff1", textAlign: "right"}}>
                  {quiz.points + " pts"}
                </TableCell>
                <TableCell style={{textAlign: "right", borderBottom: "1px solid #fff1"}}>
                  {role === "instructor" && <>
                    <Button variant="outlined" onClick={()=>{
                      setEditingQuiz(quiz);
                    }}>Edit</Button>
                    <IconButton
                      sx={{"& .MuiSvgIcon-root": { color: "#FFF4" }}}
                      style={{margin: "auto 0 auto 10px"}}
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
    </div>
  );
}

export default Quizzes;
