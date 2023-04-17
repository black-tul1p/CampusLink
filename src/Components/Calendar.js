import React, { useEffect, useState } from "react";
import {
  getAssignmentsWithDueDates,
  getAllQuizDeadlines,
} from "../Backend/calendar";
import moment from "moment";
import styled from "@emotion/styled";
import { CircularProgress, Dialog, Typography } from "@mui/material";
import { format } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {CustomListView} from "./ListView";

const localizer = momentLocalizer(moment);

const CalendarContainer = styled.div`
  text-align: center;
  height: clamp(400px, 90vh, 800vh);
  padding: 16px;
  z-index: -1;
`;

const StyledTitle = styled(Typography)`
  text-align: center;
  color: #fff;
`;

const StyledDialog = styled(Dialog)`
  width: clamp(20vw, 30vw, 80%);
  height: 40vh;
  text-align: center;
  position: fixed;
  top: 30vh;
  left: 37.5vw;

  & .MuiPaper-root {
    padding: 2rem;
    border-radius: 2rem;
  }
`;

const StyledCalendar = styled(Calendar)`
  border-radius: 2rem;
  padding: 2rem;
  background: rgb(255, 255, 255, 0.15);

  & .rbc-btn-group {
    border-radius: 1rem;
  }

  & .rbc-month-view {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  & .rbc-today {
    background: rgba(255, 255, 255, 0.5);
  }

  & .rbc-off-range-bg {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const groupBy = (array, key) =>
  array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});

const renderPopupContent = (date, assignments, quizzes) => {
  const PopupContainer = styled.div``;

  console.log(date);

  const assignmentsDue = assignments.filter(
    (a) =>
      format(new Date(a.dueDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  const quizzesDue = quizzes.filter(
    (q) =>
      format(new Date(q.deadline), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const groupedAssignments = groupBy(assignmentsDue, "courseName");
  const groupedQuizzes = groupBy(quizzesDue, "courseName");

  return (
    <PopupContainer>
      <Typography variant="h5" gutterBottom>
        {format(new Date(date), "MMMM d, yyyy")}
      </Typography>
      {Object.entries(groupedAssignments).map(([courseName, assignments]) => (
        <div key={courseName}>
          <Typography variant="subtitle1">{courseName}</Typography>
          {assignments.map((a) => (
            <div key={a.assignmentTitle}>
              <Typography variant="body1">{a.assignmentTitle}</Typography>
              <Typography variant="caption">
                Due on {format(new Date(a.dueDate), "h:mm a, MMMM d, yyyy")}
              </Typography>
            </div>
          ))}
        </div>
      ))}
      {Object.entries(groupedQuizzes).map(([courseName, quizzes]) => (
        <div key={courseName}>
          <Typography variant="subtitle1">{courseName}</Typography>
          {quizzes.map((q) => (
            <div key={q.quizName}>
              <Typography variant="body1">{q.quizName}</Typography>
              <Typography variant="caption">
                Due on {format(new Date(q.deadline), "h:mm a, MMMM d, yyyy")}
              </Typography>
            </div>
          ))}
        </div>
      ))}
    </PopupContainer>
  );
};

const CalendarPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentsAndQuizzes = async () => {
      try {
        const assignmentsData = await getAssignmentsWithDueDates();
        const quizzesData = await getAllQuizDeadlines();
        setLoading(true);
        setAssignments(assignmentsData);
        setQuizzes(quizzesData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignmentsAndQuizzes();
  }, []);

  const events = [
    ...assignments.map((a) => ({
      title: a.assignmentTitle,
      start: new Date(a.dueDate),
      end: new Date(a.dueDate),
      allDay: true,
      resource: { type: "assignment", courseName: a.courseName },
    })),
    ...quizzes.map((q) => ({
      title: q.quizName,
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
      borderRadius: "0.25rem",
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
      {!loading ? (
        <>
          <StyledTitle variant="h4" gutterBottom>
            Calendar
          </StyledTitle>

          <StyledDialog
            fullScreen
            open={showPopup}
            onClose={() => {
              setSelectedDate(null);
              setShowPopup(false);
            }}
            PaperProps={{
              style: {
                backgroundColor: "#20232a",
                boxShadow: "none",
                text: "white",
              },
            }}
            onClick={() => {
              setShowPopup(false);
            }}
          >
            {selectedDate &&
              renderPopupContent(selectedDate, assignments, quizzes)}
          </StyledDialog>
          <StyledCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            views={{month: true, week: true, agenda: CustomListView}}
            messages={{agenda: 'List'}}
            onSelectEvent={(event) => {
              setShowPopup(true);
              setSelectedDate(event.start);
              console.log(selectedDate);
            }}
            tooltipAccessor={(event) => {
              const date = format(event.start, "h:mm a");
              const courseName = event.resource.courseName;
              return `Due at ${date} for ${courseName}`;
            }}
          />
        </>
      ) : (
        <div
          style={{
            display: "grid",
            placeContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </CalendarContainer>
  );
};

export default CalendarPage;
