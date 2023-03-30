import React from 'react'
import { Dialog, DialogTitle, DialogActions, TableContainer } from "@mui/material";
import { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';



function ViewPastQuiz(props) {
    const [studentAnswers, setStudentAnswers] = useState([]);
    const [studentPoints, setStudentPoints] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [quizDeadline, setQuizDeadline] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizPoints, setQuizPoints] = useState("");

    const setFields = () => {
        setStudentAnswers(props.quizDetails.studentAnswers);
        setStudentPoints(props.quizDetails.studentPoints);
        setQuizName(props.quizDetails.name);
        setQuizDesc(props.quizDetails.description);
        setQuizDeadline(props.quizDetails.deadline);
        setQuizQuestions(props.quizDetails.questions);
        setQuizPoints(props.quizDetails.points);
      }
    useEffect(()=> {
    if (props.open) setFields();
    }, [props.open])
  
  return (
    <div>
        <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
        style: {
            backgroundColor: 'white',
            boxShadow: 'none',
        },
        }}
        >
            <AppBar style={{position: "sticky"}} sx={{ position: 'relative', bgcolor: "#20232a"}}>
                <Toolbar>
                    
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                        {quizName}
                    </Typography>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={()=>{
                        props.onClose();
                    }}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div>
                <div className='question-header'>
                    <label style={{color: 'black'}}>Questions</label>
                    <label style={{color: 'black'}}>Points</label>
                </div>
                {quizQuestions.map((question, index) => (
                    <div className='question-header'>
                    <label style={{color: 'black'}}>{question.text}</label>
                    <label style={{color: 'black'}}>{studentAnswers[index].points} / {question.points}</label>
                    </div>
                ))}
            </div>
        </Dialog>
    </div>
  )
}

export default ViewPastQuiz
