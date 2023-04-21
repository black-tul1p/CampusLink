import React from 'react'
import { Dialog, DialogTitle, DialogActions, TableContainer, TextField} from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';
import "../../Styles/ViewPastQuiz.css";
import { numberLiteralTypeAnnotation } from '@babel/types';
import { display } from '@mui/system';
import { updateQuizGrade } from '../../Backend/quiz';
import { async } from 'q';

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
    const [isGraded, setIsGraded] = useState(false);
    const [opened, setOpened] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [total, setTotal] = useState(0);


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
        setIsGraded(props.quizDetails.isGraded)
      }
    useEffect(()=> {
    if (props.open) setFields();
    setIsEdit(false);
    setTotal(0);
    }, [props.open])

    const handleClose = () => {
      setOpened(false);
    };

    const changeScore = (e, index) => {
      let newArr = [...studentAnswers];
      newArr[index].points = e.target.value; 
      setStudentAnswers(newArr);
      console.log("point: " +index + ", "+ studentAnswers[index].points);
      console.log(isEdit);
    }
    
      const UpdateAttempt = async () => {
        setTotal(0);
        studentAnswers.map((answer) => {
          const sum = total;
          const add = answer.points;
          const tot = sum + add;
          
          setTotal(tot);
          console.log("answer: " + answer.points);
          console.log("total: " + total);
          console.log("tot:" + tot);
        })
        const attemptDetails = {
          answers: studentAnswers,
          attemptedOn: attemptedOn,
          points: total,
        }

      await updateQuizGrade(props.courseId, props.studentId, props.quizId, attemptDetails);
      alert("quiz grade updated!");
      props.onClose();
      
    }

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
                
                
                {isGraded ? (
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}> 
                      <p style={{color: 'green'}}>{"Score:  " + studentPoints+"/"+quizPoints+" pts"}</p>
                      {isEdit === false ? (
                        <Button
                        className="add-button"
                        style={{backgroundColor:"green"}}
                        onClick={() => {
                          setIsEdit(true);
                        }}
                        variant="contained"
                        >
                        Grade Quiz</Button>
                      ): (
                        <Button
                        className="add-button"
                        style={{backgroundColor:"green"}}
                        onClick={() => {
                          setIsEdit(false);
                          UpdateAttempt();
                        }}
                        variant="contained"
                        >
                        Save and Close</Button>
                      )}
                    </div>
                ) : (
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}> 
                      <p style={{color: 'green'}}>{"Ungraded"}</p>                    
                      <Button
                        className="add-button"
                        style={{backgroundColor:"green"}}
                        onClick={() => {
                          setOpened(true);
                          setIsEdit(true);
                        }}
                        variant="contained"
                      >
                        Grade Quiz</Button>
                    </div>
                    
                )
                }
                {attemptedOn !== null && <label style={{color: 'black'}}>{"Attempted On: " + attemptedOn.toDate()}</label>
                }
                <div className='main-header'>
                    <p style={{color: 'black'}}>Questions</p>
                    <p style={{color: 'black'}}>Points</p>
                </div>
                {quizQuestions.map((question, index) => (
                <>
                    <div className='question-header'>
                        <label style={{color: 'black'}}>{"Q"+(index+1)+": "+question.text}</label>
                        { studentAnswers[index].points !== null && studentAnswers[index].points !== undefined ? (
                          <>
                            {isEdit ? (
                            <div style={{display:"flex", flexDirection:"row", columnGap:"0.8em"}}>
                              <input
                                type="text" 
                                defaultValue={studentAnswers[index].points}
                                onChange={e => {
                                  changeScore(e, index);
                                }}
                                style={{width:"1.6em"}}
                              />
                              <label style={{color: 'black'}}> / {question.points}</label>
                              <EditIcon style={{color:"green"}}/>
                            </div>
                            ):
                            (<label style={{color: 'black'}}>{studentAnswers[index].points} / {question.points}</label>)
                            }
                          </>
                        ):(
                          <div>
                            {isEdit ? (
                            <div style={{display:"flex", flexDirection:"row", columnGap:"0.8em"}}>
                              <input
                                type="text" 
                                defaultValue={studentAnswers[index].points}
                                onChange={e => {
                                  changeScore(e, index);
                                }}
                                style={{width:"1.6em"}}
                              />
                              <label style={{color: 'black'}}> / {question.points}</label>
                              <EditIcon style={{color:"green"}}/>
                            </div>
                            ):
                            (<label style={{color: 'black'}}> - / {question.points}</label>)
                            }
                          </div>
                        )  
                        }
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