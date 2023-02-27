import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchFAQ } from "../Backend/faq";

export default function FAQ() {
  // Sample Q&As
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
        "If you are a student, you will be added to a course by your professor. If you are an instructor, you can create a new course from the dashboard.",
    },
    {
      id: 3,
      question: "How do I upload an assignment on CampusLink?",
      answer:
        "To upload an assignment on CampusLink, navigate to the 'Assignments' tab in your course and select the appropriate assignment. Then, click the 'Upload' button and follow the instructions to upload your file. You can also add any additional comments or notes for your instructor if needed.",
    },
    {
      id: 4,
      question: "How do I contact my instructor on CampusLink?",
      answer:
        "To contact your instructor on CampusLink, navigate to the 'Classlist' page and click on the instructor's email to send them a mail.",
    },
  ];

  const [faq, setFAQ] = useState(defFAQ);

  useEffect(() => {
    fetchFAQ()
      .then((res) => {
        setFAQ([...faq, res]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Box>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions (FAQ)
        </Typography>
        {faq
          .filter((q) => q.question && q.answer)
          .map((q) => (
            <Accordion key={q.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{q.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{q.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
    </Box>
  );
}
