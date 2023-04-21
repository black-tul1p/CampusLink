import React, { useEffect, useState } from "react";
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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setQuizAttempt } from "../../Backend/quiz";
import { getLoggedInUserName } from "../../Backend/user";
import { getLoggedInUserEmail } from "../../Backend/user";
import Countdown from "./Countdown";

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
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [viewOnly, setViewOnly] = useState(true);
  const newAttempt = Object.keys(attempt).length > 0 ? false : true;
  const late =
    props.quiz.deadline !== null
      ? props.quiz.deadline < new Date()
        ? true
        : false
      : false;
  const startTime = new Date();

  const handleAttemptStart = () => {
    // Update Attempt number and set start time if first attempt
    if (!attempt.attemptNumber) {
      attempt.attemptNumber = 1;
      attempt.attemptedOn = startTime;
    }

    // Calculate time since last attempt
    const attemptMillis =
      attempt.attemptedOn.seconds * 1000 +
      attempt.attemptedOn.nanoseconds / 1000000;
    const timeSinceLastAttempt = Math.abs(startTime - attemptMillis);
    const minutesSinceLastAttempt = Math.floor(
      timeSinceLastAttempt / (1000 * 60)
    );

    // Allow attempt if deadline has not passed and there are remaining attempts
    if (minutesSinceLastAttempt < quiz.timeLimit && !late) {
      console.log("Continuing quiz");
      setViewOnly(false);
    } else if (!late && attempt.attemptNumber <= quiz.attempts) {
      attempt.attemptNumber += 1;
      console.log(
        `Starting new attempt: ${attempt.attemptNumber}/${quiz.attempts}`
      );
      attempt.answers = {};
      attempt.attemptedOn = startTime;
      setViewOnly(false);
    }

    setStarted(true);
  };

  const handleAnswerUpdate = (index, answer) => {
    console.log("BEFORE:", attempt);
    const newAnswers = { ...attempt };
    newAnswers.answers[index] = {
      answer: answer,
      points: quiz.questions[index].points,
    };
    setAttempt(newAnswers);
    console.log("AFTER:", attempt);

    handleSubmit();
  };

  const handleSubmit = (quit) => {
    // logic to handle quiz submission
    const attemptQuiz = async () => {
      await setQuizAttempt(props.courseId, props.userId, quiz.quizId, attempt);
    };

    attemptQuiz().catch((error) => {
      console.error(error);
      setError(error);
    });

    if (quit) props.onClose();
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
          {!viewOnly && !submitted && (
            <Countdown
              timestamp={
                new Date(
                  attempt.attemptedOn.seconds * 1000 +
                    attempt.attemptedOn.nanoseconds / 1000000
                )
              }
              minutes={quiz.timeLimit}
              onEnd={setSubmitted}
            />
          )}
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
      {started ? (
        submitted ? (
          <QuizPopupContainer maxWidth="sm">
            <Box sx={{ color: "whitesmoke" }}>
              <Typography sx={{ flex: 1 }} variant="h5">
                {!error ? "Quiz submitted" : error.message}
              </Typography>
            </Box>
          </QuizPopupContainer>
        ) : (
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
                    defaultValue={attempt?.answers[index]?.answer || ""}
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
                onClick={() => {
                  handleSubmit();
                  setSubmitted(true);
                }}
              >
                Submit
              </SubmitButton>
            )}
          </QuizPopupContainer>
        )
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
                  <Typography paragraph>
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