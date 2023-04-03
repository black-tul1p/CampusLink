import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  Container,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setQuizAttempt } from "../../Backend/quiz";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

const QuizPopupContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2rem;
`;

const QuestionContainer = styled.div`
  color: whitesmoke;
  margin-top: 1rem;
`;

const Question = styled(Typography)`
  margin-bottom: 0.5rem;
`;

const AnswerContainer = styled(RadioGroup)`
  margin-left: 1rem;
`;

const AnswerLabel = styled(FormControlLabel)`
  margin-bottom: 0.25rem;
`;

const CheckboxAnswerContainer = styled(Checkbox)`
  margin-left: 1rem;
`;

const TextFieldAnswerContainer = styled(TextField)`
  margin-top: 0.5rem;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const QuizPopup = (props) => {
  const quiz = { ...props.quiz };
  const [attempt, setAttempt] = useState({ ...props.answers });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [remTime, setRemTime] = useState();
  const textFieldRefs = useRef(""); // create an array of refs
  const newAttempt = Object.keys(attempt).length > 0 ? false : true;
  const viewOnly =
    props.quiz.deadline !== null
      ? props.quiz.deadline < new Date()
        ? true
        : false
      : false;
  // const navigate = useNavigate();
  console.log(attempt);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleAnswerUpdate = (index, answer) => {
    console.log("BEFORE:", attempt);
    const newAnswers = { ...attempt };
    newAnswers[index] = {
      answer: answer,
      points: quiz.questions[index].points,
    };
    setAttempt(newAnswers);
    console.log("AFTER:", attempt);

    // handleSubmit();
  };

  const handleTextBox = (index) => {
    console.log("REF", textFieldRefs.current);
  };

  const handleSubmit = () => {
    // logic to handle quiz submission
    const attemptQuiz = async () => {
      await setQuizAttempt(props.courseId, props.userId, quiz.quizId, attempt);
    };

    attemptQuiz();
    setSnackbarMessage("Quiz submitted");
    setOpenSnackbar(true);
    setSubmitted(true);
    props.onClose();
  };

  const handleTimer = () => {
    if (!viewOnly && !attempt.attemptedOn) {
      attempt.attemptedOn = new Date();
      attempt.attempted = true;
    } else if (quiz.startTime) {
      // TODO: calculate time difference between startTime and current time, and display it in Hours:Mins
    }
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          backgroundColor: "#20232a",
          boxShadow: "none",
          text: "white",
        },
      }}
    >
      <AppBar
        style={{ position: "sticky" }}
        sx={{ position: "fixed", bgcolor: "#20232a" }}
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
              // if (submitted) navigate("quizzes");
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <QuizPopupContainer maxWidth="sm">
        {quiz.questions.map((question, index) => (
          <QuestionContainer key={index}>
            <Question variant="subtitle1">
              {index + 1}. {question.text}
            </Question>
            {question.type === "Multiple Choice" ? (
              <AnswerContainer
                value={!newAttempt ? attempt?.answers[index]?.answer : ""}
                onChange={(event) =>
                  handleAnswerUpdate(index, event.target.value)
                }
              >
                {question.choices.map((choice, choiceIndex) => (
                  <AnswerLabel
                    key={choiceIndex}
                    value={choice}
                    control={<Radio />}
                    label={choice}
                    disabled={viewOnly}
                  />
                ))}
              </AnswerContainer>
            ) : question.type === "True or False" ? (
              <AnswerContainer
                value={!newAttempt ? attempt?.answers[index]?.answer : ""}
                onChange={(event) =>
                  handleAnswerUpdate(index, event.target.value)
                }
              >
                <AnswerLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                  disabled={viewOnly}
                />
                <AnswerLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                  disabled={viewOnly}
                />
              </AnswerContainer>
            ) : question.type === "Checkbox" ? (
              <AnswerContainer
                value={!newAttempt ? attempt?.answers[index]?.answer : ""}
                onChange={(event) =>
                  handleAnswerUpdate(index, event.target.value)
                }
              >
                {question.choices.map((choice, choiceIndex) => (
                  <AnswerLabel
                    key={choiceIndex}
                    value={choice}
                    control={<CheckboxAnswerContainer />}
                    label={choice}
                    disabled={viewOnly}
                  />
                ))}
              </AnswerContainer>
            ) : (
              <TextFieldAnswerContainer
                label="Answer"
                variant="outlined"
                multiline
                rows={4}
                size="small"
                // defaultValue={
                //   Object.keys(attempt).length > 0
                //     ? attempt?.answers[index]?.answer
                //     : " "
                // }
                onChange={(event) => {
                  console.log(event.target.value);
                  handleAnswerUpdate(index, event.target.value);
                }}
                disabled={viewOnly}
              />
            )}
          </QuestionContainer>
        ))}
        {!viewOnly && (
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </SubmitButton>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContent
            style={{
              backgroundColor: "green",
              display: "flex",
              alignItems: "center",
            }}
            message={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CheckCircle />
                <span
                  style={{
                    marginLeft: "1em",
                    alignSelf: "center",
                  }}
                >
                  {snackbarMessage}
                </span>
              </div>
            }
          />
        </Snackbar>
      </QuizPopupContainer>
    </Dialog>
  );
};

export default QuizPopup;
