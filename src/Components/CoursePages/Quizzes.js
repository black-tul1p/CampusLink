import React from "react";
import CourseNavBar from "../CourseNavBar";
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { List, ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation } from "react-router-dom";

import {createQuiz, fetchQuizzes} from '../../Backend/quiz'
import {QuizCreationDialog} from './QuizCreationDialog'

function Quizzes() {
  const [open, setOpen] = React.useState(false);
  const [quizzes, setQuizzes] = React.useState([]);
  
  const location = useLocation();

  const updateQuizList = (courseId) => {
    fetchQuizzes(courseId).then((quizzes) => {
        setQuizzes(quizzes);
    })
  }

  const courseId = location.state?.courseId;

  React.useEffect(() => {
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

      <Button
        className="add-button"
        style = {{display: 'block', margin: 'auto'}}
        onClick={() => {setOpen(true);}}
        variant="contained"
      >
        Create New Quiz      
      </Button>

      <QuizCreationDialog
        open={open}
        onClose={()=>{setOpen(false)}}
        onSave={(quiz)=>{
            createQuiz(courseId, quiz).then(()=>{
            updateQuizList(courseId);
            setOpen(false);
          });
        }}
      />
    </div>
  );
}

export default Quizzes;
