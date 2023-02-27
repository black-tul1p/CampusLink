import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchFAQ } from "../Backend/faq";
import styled from "@emotion/styled";

export default function FAQ() {
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

  const defFAQ = [
    {
      id: 1,
      question: "How do I sign up for CampusLink?",
      answer:
        "To sign up for CampusLink, simply visit our website and click on the 'Sign Up' button. You will be asked to provide some basic information such as your name, email address, and a password. Once you have filled out the form, click 'Submit' and you will be redirected to your CampusLink dashboard.",
    },
    {
      id: 2,
      question: "How do I add a course to my CampusLink dashboard?",
      answer:
        "To add a course to your CampusLink dashboard, first make sure you are logged in to your account. Then, click on the 'Courses' tab in the top navigation menu. From there, you can search for a course by name or course code, and click the 'Add Course' button to add it to your dashboard.",
    },
    {
      id: 3,
      question: "How do I upload an assignment on CampusLink?",
      answer:
        "To upload an assignment on CampusLink, navigate to the 'Assignments' tab in your dashboard and select the appropriate assignment. Then, click the 'Upload' button and follow the instructions to upload your file. You can also add any additional comments or notes for your instructor if needed.",
    },
    {
      id: 4,
      question: "How do I contact my instructor on CampusLink?",
      answer:
        "To contact your instructor on CampusLink, navigate to the 'Inbox' tab in your dashboard and select the appropriate conversation. You can send a new message or reply to an existing message in the conversation. You can also see your conversation history and any attachments or files that have been shared.",
    },
  ];

  const [faq, setFAQ] = useState(defFAQ);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQ()
      .then((res) => {
        setFAQ([...faq, ...res]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h4" gutterBottom>
        Frequently Asked Questions
      </StyledTitle>
      {loading ? (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      ) : faq.length > 0 ? (
        faq.map((q) => (
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
  );
}
