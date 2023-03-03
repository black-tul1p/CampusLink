import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchFAQ, sendSuggestion, updateFAQ } from "../Backend/faq";
import styled from "@emotion/styled";

export default function FAQ() {
  // Can make these styles dynamic for light theme later on
  // using props
  const StyledContainer = styled(Container)`
    padding-top: 40px;
    padding-bottom: 40px;
  `;

  const StyledTitle = styled(Typography)`
    text-align: center;
    margin-bottom: 40px;
    color: #fff;
  `;

  const StyledBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  `;

  const AccordionStyled = styled(Accordion)`
    margin-bottom: 16px;
    background-color: #132b3d;
    color: #fff;
    box-shadow: none;
    border-radius: 1em;
    border: 1px solid #fff;
    overflow: hidden;
  `;

  const StyledSummary = styled(AccordionSummary)`
    && {
      background-color: #132b3d;
      color: #fff;
      border-radius: 1em;
    }
  `;

  const StyledDetails = styled(AccordionDetails)`
    background-color: #1e4258;
    color: #fff;
    border-top: 1px solid #fff;
  `;

  const ExpandMoreIconStyled = styled(ExpandMoreIcon)`
    color: #fff;
  `;

  const StyledSuggestionTitle = styled(Typography)`
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 1em;
  `;

  const StyledSuggestionBox = styled(Box)`
    padding: 2em;
    margin-bottom: 2em;
    background-color: #132b3d;
    color: #fff;
    border-radius: 1em;
  `;

  const StyledDescription = styled(Typography)`
    color: #1eefef;
    text-align: center;
    font-size: 1em;
    margin-bottom: 1.5em;
  `;

  const StyledForm = styled(Box)`
    display: grid;
    grid-template-columns: 7fr 1fr;
    gap: 0.5em;
    align-items: center;
    max-width: 800px;
  `;

  const StyledFormTwo = styled(Box)`
    display: grid;
    grid-template-columns: 3.5fr 3.5fr 1fr;
    gap: 0.5em;
    align-items: center;
    max-width: 800px;
  `;

  const StyledButton = styled(Button)`
    height: 100%;
    margin: 0.5em;
    border-radius: 1em;
  `;

  const StyledPageContainer = styled.div`
    flex-grow: 1;
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  `;

  const [faq, setFAQ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const suggestionRef = useRef("");
  const qRef = useRef("");
  const aRef = useRef("");
  const isTesting = false;

  useEffect(() => {
    fetchFAQ()
      .then((res) => {
        setFAQ(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    // Verify that suggestionRef contains valid input
    const error = validateSuggestion();
    if (error) {
      setSnackbarMessage(error);
      setOpenSnackbar(true);
      return;
    }

    // Send suggestion to the database
    sendSuggestion(suggestionRef.current.value.trim())
      .then(() => {
        setSnackbarMessage("Thank you for your suggestion!");
      })
      .catch((error) => {
        console.log(error.message);
        setSnackbarMessage(error.message);
      })
      .finally(() => {
        setOpenSnackbar(true);
      });
    // Reset suggestionRef value
    suggestionRef.current = "";
  };

  const validateSuggestion = () => {
    var error;

    // Check if suggestion is empty
    if (!suggestionRef.current.value.trim()) {
      return "Suggestion cannot be empty";
    }

    // Verify that suggestionRef only contains characters typically used in English
    const regex = /^[a-zA-Z0-9\s.,?'"()/-]+$/;
    if (!regex.test(suggestionRef.current.value.trim())) {
      return "Text contains invalid characters";
    }

    // Check if suggestion is too long
    if (suggestionRef.current.value.length > 500) {
      return "Suggestion is too long";
    }
  };

  const handleQnASubmit = () => {
    // Verify that the refs contain defined data
    if (!qRef || !aRef) {
      console.log("Invalid form data");
      return;
    }

    // Send submission to the database
    updateFAQ(qRef.current.value, aRef.current.value)
      .then(() => {
        setSnackbarMessage("Thank you for your submission!");
      })
      .catch((error) => {
        console.log(error.message);
        setSnackbarMessage(error.message);
      })
      .finally(() => {
        setOpenSnackbar(true);
      });
    // Reset ref values
    qRef.current = "";
    aRef.current = "";
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <StyledPageContainer>
      <StyledContainer maxWidth="md">
        <StyledTitle variant="h4" gutterBottom>
          Frequently Asked Questions
        </StyledTitle>
        {loading ? (
          <StyledBox>
            <CircularProgress />
          </StyledBox>
        ) : faq.length > 0 ? (
          faq
            .filter((q) => q.question && q.answer)
            .map((q) => (
              <AccordionStyled key={q.id}>
                <StyledSummary expandIcon={<ExpandMoreIconStyled />}>
                  <Typography variant="h6">{q.question}</Typography>
                </StyledSummary>
                <StyledDetails>
                  <Typography>{q.answer}</Typography>
                </StyledDetails>
              </AccordionStyled>
            ))
        ) : (
          <Typography>No FAQ found.</Typography>
        )}
      </StyledContainer>
      <StyledSuggestionBox>
        <StyledSuggestionTitle>
          Have a suggestion for a new FAQ question?
        </StyledSuggestionTitle>
        <StyledDescription>
          Fill out the form below and we'll review your suggestion.
        </StyledDescription>
        <StyledForm>
          <TextField
            label="Enter your question here"
            multiline
            rows={4}
            variant="outlined"
            inputRef={suggestionRef}
            required
          />
          <StyledButton
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </StyledButton>
        </StyledForm>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </StyledSuggestionBox>
      {isTesting && (
        <StyledSuggestionBox>
          <StyledSuggestionTitle>
            Enter a new FAQ question + answer
          </StyledSuggestionTitle>
          <StyledFormTwo>
            <TextField
              label="Enter your question here"
              multiline
              rows={4}
              variant="outlined"
              inputRef={qRef}
              required
            />
            <TextField
              label="Enter your answer here"
              multiline
              rows={4}
              variant="outlined"
              inputRef={aRef}
              required
            />
            <StyledButton
              variant="contained"
              type="submit"
              onClick={handleQnASubmit}
            >
              Submit
            </StyledButton>
          </StyledFormTwo>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </StyledSuggestionBox>
      )}
    </StyledPageContainer>
  );
}

  return (
    <StyledPageContainer>
      <StyledContainer maxWidth="md">
        <StyledTitle variant="h4" gutterBottom>
          Frequently Asked Questions
        </StyledTitle>
        {loading ? (
          <StyledBox>
            <CircularProgress />
          </StyledBox>
        ) : faq.length > 0 ? (
          faq
            .filter((q) => q.question && q.answer)
            .map((q) => (
              <AccordionStyled key={q.id}>
                <StyledSummary expandIcon={<ExpandMoreIconStyled />}>
                  <Typography variant="h6">{q.question}</Typography>
                </StyledSummary>
                <StyledDetails>
                  <Typography>{q.answer}</Typography>
                </StyledDetails>
              </AccordionStyled>
            ))
        ) : (
          <Typography>No FAQ found.</Typography>
        )}
      </StyledContainer>
      <StyledSuggestionBox>
        <StyledSuggestionTitle>
          Have a suggestion for a new FAQ question?
        </StyledSuggestionTitle>
        <StyledDescription>
          Fill out the form below and we'll review your suggestion.
        </StyledDescription>
        <StyledForm>
          <TextField
            label="Enter your question here"
            multiline
            rows={4}
            variant="outlined"
            inputRef={suggestionRef}
            required
          />
          <StyledButton
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </StyledButton>
        </StyledForm>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </StyledSuggestionBox>
      {isTesting && (
        <StyledSuggestionBox>
          <StyledSuggestionTitle>
            Enter a new FAQ question + answer
          </StyledSuggestionTitle>
          <StyledFormTwo>
            <TextField
              label="Enter your question here"
              multiline
              rows={4}
              variant="outlined"
              inputRef={qRef}
              required
            />
            <TextField
              label="Enter your answer here"
              multiline
              rows={4}
              variant="outlined"
              inputRef={aRef}
              required
            />
            <StyledButton
              variant="contained"
              type="submit"
              onClick={handleQnASubmit}
            >
              Submit
            </StyledButton>
          </StyledFormTwo>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </StyledSuggestionBox>
      )}
    </StyledPageContainer>
  );
}