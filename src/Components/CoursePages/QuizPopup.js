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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setQuizAttempt } from "../../Backend/quiz";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { getCurrentUser } from "../../Backend/user";
import { getLoggedInUserName } from "../../Backend/user";
import { getLoggedInUserEmail } from "../../Backend/user";
import Timer from "./Timer";

const QuizPopupContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2rem;
`;

const QuizInfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  const [start, setStart] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [remTime, setRemTime] = useState();
  const [viewOnly, setViewOnly] = useState(true);
  const textFieldRefs = useRef(""); // create an array of refs
  const newAttempt = Object.keys(attempt).length > 0 ? false : true;
  const late =
    props.quiz.deadline !== null
      ? props.quiz.deadline < new Date()
        ? true
        : false
      : false;
  const navigate = useNavigate();
  console.log(attempt);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleAttemptStart = () => {
    const millis = Math.abs(attempt.attemptedOn - startTime);
    const minutes = Math.floor(millis / 1000 / 60);
    console.log("Minutes since last attempt: ", minutes);
    if (minutes > quiz.timeLimit && !late) {
      attempt.attemptNumber = attempt.attemptNumber + 1;
      setViewOnly(false);
    }
    setStart(true);
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
        position="fixed"
        style={{ position: "sticky" }}
        sx={{ bgcolor: "#20232a" }}
      >
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
            {props.quiz ? props.quiz.name : ""}
          </Typography>
          {!viewOnly && <Timer timestamp={new Date()} />}
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
      {start ? (
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
                      disableTypography={viewOnly}
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
                    disableTypography={viewOnly}
                  />
                  <AnswerLabel
                    value="false"
                    control={<Radio />}
                    label="False"
                    disabled={viewOnly}
                    disableTypography={viewOnly}
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
                      disableTypography={viewOnly}
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
                  disableTypography={viewOnly}
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
      ) : (
        <div>
          <QuizPopupContainer maxWidth="sm">
            <Box sx={{ color: "whitesmoke" }}>
              <Typography sx={{ flex: 1 }} variant="h4">
                Quiz Details
              </Typography>
              <QuizInfoBox>
                <div>
                  <Typography variant="h5">Current Time</Typography>
                  <Typography variant="h6" color="lightgray">
                    {startTime.toLocaleTimeString()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h5">Current User</Typography>
                  <Typography variant="h6" color="lightgray">
                    {`${
                      getLoggedInUserName() || ""
                    } (${getLoggedInUserEmail()})`}
                    {console.log(getCurrentUser())}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h5">Time Limit</Typography>
                  <Typography variant="h6" color="lightgray">
                    {quiz.timeLimit === null
                      ? "Unlimited"
                      : `${quiz.timeLimit} minutes`}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h5">Maximum Attempts</Typography>
                  <Typography variant="h6" color="lightgray">
                    {`Allowed - ${quiz.attempts || "Unlimited"}, Completed - ${
                      attempt.attemptNumber || 0
                    }`}
                  </Typography>
                </div>
              </QuizInfoBox>
              <Typography sx={{ flex: 1 }} variant="h4">
                Instructions
              </Typography>
              <QuizInfoBox>
                <div>
                  <Typography paragraph align="alignJustify">
                    Before you submit the quiz, you can modify the answers to
                    any question. If you close the quiz without submitting, you
                    can return to the quiz any time before the deadline.
                    <br />
                    Once the deadline has passed or if you click the submit
                    button, the quiz will be submitted and you may attempt it
                    again (if you have remaining attempts).
                  </Typography>
                </div>
              </QuizInfoBox>
            </Box>
          </QuizPopupContainer>
          <AppBar
            position="fixed"
            sx={{
              bgcolor: "#20232a",
              top: "auto",
              bottom: 0,
              alignItems: "center",
            }}
          >
            <Toolbar>
              <Button
                variant="contained"
                onClick={handleAttemptStart}
                aria-label="close"
                id="general-Button"
              >
                {late ? "View" : "Start"}
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </Dialog>
  );
};

export default QuizPopup;
