import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TableContainer,
} from "@mui/material";
import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function ViewPastQuiz(props) {
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [studentPoints, setStudentPoints] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [quizDeadline, setQuizDeadline] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizPoints, setQuizPoints] = useState("");

  const setFields = () => {
    setStudentAnswers(props.quizDetails.studentAnswers);
    setStudentPoints(props.studentPoints);
    setQuizName(props.quizDetails.name);
    setQuizDesc(props.quizDetails.description);
    setQuizDeadline(props.quizDetails.deadline);
    setQuizQuestions(props.quizDetails.questions);
    setQuizAnswers(props.quizDetails.answers);
    setQuizPoints(props.quizDetails.points);
  };
  useEffect(() => {
    if (props.open) setFields();
  }, [props.open]);

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
          style: {
            backgroundColor: "white",
            boxShadow: "none",
          },
        }}
      >
        <AppBar
          style={{ position: "sticky" }}
          sx={{ position: "relative", bgcolor: "#20232a" }}
        >
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              {props.quiz ? props.quiz.name : ""}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                props.onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}

export default ViewPastQuiz;
