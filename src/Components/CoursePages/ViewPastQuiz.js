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
import { grey } from '@mui/material/colors';
import "../../Styles/ViewPastQuiz.css";
import { numberLiteralTypeAnnotation } from '@babel/types';


function ViewPastQuiz(props) {
    const [studentAnswers, setStudentAnswers] = useState([]);
    const [studentPoints, setStudentPoints] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [quizDeadline, setQuizDeadline] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizPoints, setQuizPoints] = useState("");
    const [otherChoice, setOtherChoice] = useState("");
    const [multiChoice, setMultiChoice] = useState([]);
    const [attemptedOn, setAttemptedOn] = useState(null);
    const setFields = () => {
        setStudentAnswers(props.quizDetails.studentAnswers);
        setStudentPoints(props.quizDetails.studentPoints);
        setQuizName(props.quizDetails.name);
        setQuizDesc(props.quizDetails.description);
        setQuizDeadline(props.quizDetails.deadline);
        setQuizQuestions(props.quizDetails.questions);
        setQuizPoints(props.quizDetails.points);
        setMultiChoice(props.quizDetails.questions.choices);
        setAttemptedOn(props.quizDetails.attemptedOn);
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
            <div className='main-quiz-box'>
                
                <p style={{color: 'red'}}>{"Score:  " + studentPoints+"/"+quizPoints+" pts"}</p>
                {attemptedOn !== null && <label style={{color: 'black'}}>{"Attempted On: " + attemptedOn.toDate()}</label>
                }
                <div className='main-header'>
                    <p style={{color: 'black'}}>Questions</p>
                    <p style={{color: 'black'}}>Points</p>
                </div>
                {quizQuestions.map((question, index) => (
                <>
                    <div className='question-header'>
                        <label style={{color: 'black'}}>Q{index+1}:{question.text}</label>
                        <label style={{color: 'black'}}>{studentAnswers[index].points} / {question.points}</label>
                    </div>
                    <div className='answer-box'>
                        {question.type === 'True or False' ? (
                            <div className='TFBox'>
                                <>
                                    <div className='choice-box'>
                                        {studentAnswers[index].answer === "true" ? (
                                            <RadioButtonCheckedIcon sx={{ color: grey[900] }}/>
                                        ):(<RadioButtonUncheckedIcon sx={{ color: grey[900] }} />)}
                                        <label style={{color: 'black'}}>True</label>
                                    </div>
                                    <div className='choice-box'>
                                        {studentAnswers[index].answer === "false" ? (
                                            <RadioButtonCheckedIcon sx={{ color: grey[900] }}/>
                                        ):(<RadioButtonUncheckedIcon sx={{ color: grey[900] }}/>)}
                                        <label style={{color: 'black'}}>False</label>
                                    </div>
                                </> 
                            </div>
                        ): question.type === 'Multiple Choice' ? (
                            <div className='TFBox'>
                                {question.choices.map((choice) => (
                                    <div className='choice-box'>
                                    {studentAnswers[index].answer === choice ? (
                                        <RadioButtonCheckedIcon sx={{ color: grey[900] }}/>
                                    ):(<RadioButtonUncheckedIcon sx={{ color: grey[900] }}/>)}
                                        <label style={{color: 'black'}}>{choice}</label>
                                    </div>
                                ))}
                            </div>
                        ): question.type === 'Short Answer' ? (
                            <div className='TFBox'>
                                <div className='choice-box'>
                                    <label style={{color: 'black'}}>Answer:</label>
                                    <label style={{color: 'black'}}>{studentAnswers[index].answer}</label>
                                </div>
                            </div>
                        ): null}
                    </div>

                </>
                ))}
            </div>
        </Dialog>
    </div>
  )
}

export default ViewPastQuiz
