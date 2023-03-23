import CourseNavBar from "../CourseNavBar";
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { getUserRole } from "../../Backend/user";
import {createQuiz, fetchQuizzes} from '../../Backend/quiz'
import {QuizCreationDialog} from './QuizCreationDialog'

function Quizzes() {
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [role, setRole] = useState("");
  
  const location = useLocation();

  const updateQuizList = (courseId) => {
    fetchQuizzes(courseId).then((quizzes) => {
        setQuizzes(quizzes);
    })
  }

  const courseId = location.state?.courseId;

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
      <List >
        {quizzes.map((quiz)=><>
          <ListItem button style={{color: 'white'}}>
            <ListItemText
              primary={quiz.name}
            />
          </ListItem>
          <Divider />
        </>)}
      </List>


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
      <QuizCreationDialog
        open={open}
        onClose={()=>{setOpen(false)}}
        onSave={(quiz)=>{
          createQuiz(courseId, quiz).then(()=>{
            updateQuizList(courseId);
          });
          setOpen(false);
        }}
      />
    </div>
  );
}

export default Quizzes;
