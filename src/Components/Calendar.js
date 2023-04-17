import React, { useEffect, useState } from "react";
import {
  getAssignmentsWithDueDates,
  getAllQuizDeadlines,
} from "../Backend/calendar";
import moment from "moment";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarContainer = styled.div`
  height: 90dvh;
  padding: 16px;
  background: rgb(255, 255, 255, 0.15);
`;

const CalendarPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchAssignmentsAndQuizzes = async () => {
      try {
        const assignmentsData = await getAssignmentsWithDueDates();
        const quizzesData = await getAllQuizDeadlines();
        setAssignments(assignmentsData);
        setQuizzes(quizzesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignmentsAndQuizzes();
    console.log("HW", assignments);
    console.log("Quiz", quizzes);
  }, []);

  const events = [
    ...assignments.map((a) => ({
      title: `Assignment: ${a.assignmentTitle}`,
      start: new Date(a.dueDate),
      end: new Date(a.dueDate),
      allDay: true,
      resource: { type: "assignment", courseName: a.courseName },
    })),
    ...quizzes.map((q) => ({
      title: `Quiz: ${q.quizName}`,
      start: new Date(q.deadline),
      end: new Date(q.deadline),
      allDay: true,
      resource: { type: "quiz", courseName: q.courseName },
    })),
  ];

  const eventStyleGetter = (event) => {
    const backgroundColor =
      event.resource.type === "assignment" ? "#ffbb33" : "#0099ff";
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "none",
      display: "block",
      textAlign: "center",
    };
    return {
      style,
    };
  };

  return (
    <CalendarContainer>
      <Typography variant="h4" component="h2" gutterBottom>
        Calendar
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => {
          console.log(`Selected ${event.resource.type}: ${event.title}`);
        }}
        tooltipAccessor={(event) => {
          const date = format(event.start, "MMMM do, yyyy");
          const courseName = event.resource.courseName;
          return `${event.title} due on ${date} for ${courseName}`;
        }}
      />
    </CalendarContainer>
  );
};

export default CalendarPage;
