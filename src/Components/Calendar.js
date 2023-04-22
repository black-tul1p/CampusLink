import React, { useEffect, useState } from "react";
import {
  getAssignmentsWithDueDates,
  getAllQuizDeadlines,
  createEvent,
  getAllEvents,
  removeEvent,
} from "../Backend/calendar";
import moment from "moment";
import styled from "@emotion/styled";
import {
  CircularProgress,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { format } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomListView } from "./ListView";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import { getUserRole } from "../Backend/user";
import { getCourseDetailsById, getUserCourses } from "../Backend/course";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  color: white;

  & .rbc-event-content {
    color: black;
  }

  & .rbc-btn-group button {
    color: white;
    border-radius: 1rem;
  }

  & .rbc-btn-group button {
    color: white;
    border-radius: 1rem;

    & .rbc-active {
      color: black;
    }
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

  & .rbc-header {
    color: white;
  }
`;

const groupBy = (array, key) =>
  array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});

const renderPopupContent = (date, assignments, quizzes, customEvents) => {
  const PopupContainer = styled.div``;

  const assignmentsDue = assignments.filter(
    (a) =>
      format(new Date(a.dueDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  const quizzesDue = quizzes.filter(
    (q) =>
      format(new Date(q.deadline), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  const upcomingCustoms = customEvents.filter(
    (c) => format(new Date(c.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const groupedAssignments = groupBy(assignmentsDue, "courseName");
  const groupedQuizzes = groupBy(quizzesDue, "courseName");
  const groupedCustomEvents = groupBy(upcomingCustoms, "courseName");

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
      {Object.entries(groupedCustomEvents).map(([courseName, customEvents]) => (
        <div key={courseName}>
          <Typography variant="subtitle1">{courseName}</Typography>
          {customEvents.map((c) => (
            <div key={c.name}>
              <Typography variant="body1">{c.name}</Typography>
              <Typography variant="caption">{c.desc}</Typography>
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
  const [customEvents, setCustomEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState("");
  const [courses, setCourses] = useState([]);
  const [newEventCourse, setNewEventCourse] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUserRole().then((role) => {
      setRole(role);
      getUserCourses(role).then((courses) => {
        setCourses(courses);
        setNewEventCourse(courses[0].databaseId);
      });
    });
    const fetchAssignmentsAndQuizzes = async () => {
      try {
        const assignmentsData = await getAssignmentsWithDueDates();
        const quizzesData = await getAllQuizDeadlines();
        const eventsData = await getAllEvents();
        setLoading(true);
        setAssignments(assignmentsData);
        setQuizzes(quizzesData);
        setCustomEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignmentsAndQuizzes();
  }, []);

  useEffect(() => {
    setEvents([
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
      ...customEvents.map((e) => ({
        title: e.name,
        start: new Date(e.date),
        end: new Date(e.date),
        allDay: true,
        resource: { type: "custom", courseName: e.courseName },
        course: e.courseId,
        id: e.id,
      })),
    ]);
  }, [assignments, quizzes, customEvents]);

  const eventStyleGetter = (event) => {
    let backgroundColor = "#ffbb33";
    switch (event.resource.type) {
      case "quiz":
        backgroundColor = "#0099ff";
        break;
      case "assignment":
        backgroundColor = "#ffbb33";
        break;
      case "custom":
        backgroundColor = "#339900";
        break;
    }
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
              renderPopupContent(
                selectedDate,
                assignments,
                quizzes,
                customEvents
              )}
          </StyledDialog>

          <StyledDialog
            open={showEventCreator}
            onClose={() => {
              setSelectedDate(null);
              setShowEventCreator(false);
            }}
            PaperProps={{
              style: {
                padding: "10px 50px",
              },
            }}
            style={{ height: "50%" }}
          >
            {selectedDate && (
              <>
                <DialogTitle style={{ padding: "10px" }}>
                  Create New Event
                </DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date"
                    slotProps={{ textField: { variant: "standard" } }}
                    defaultValue={dayjs(selectedDate)}
                    onChange={(date) => setNewEventDate(date.toDate())}
                  />
                </LocalizationProvider>
                <FormControl style={{ margin: "10px 0" }}>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    label="Age"
                    variant="standard"
                    value={newEventCourse}
                    onChange={(event) => {
                      setNewEventCourse(event.target.value);
                    }}
                  >
                    {courses.map((course) => (
                      <MenuItem value={course.databaseId}>
                        {course.courseTitle} {course.courseId}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Name"
                  variant="standard"
                  onChange={(e) => {
                    setNewEventName(e.target.value);
                  }}
                />
                <TextField
                  label="Description"
                  variant="standard"
                  multiline
                  minRows="3"
                  onChange={(e) => {
                    setNewEventDesc(e.target.value);
                  }}
                />
                <DialogActions>
                  <Button
                    style={{ width: "50%" }}
                    onClick={() => {
                      createEvent(
                        newEventCourse,
                        newEventDate,
                        newEventName,
                        newEventDesc
                      ).then((eventId) => {
                        getCourseDetailsById(newEventCourse).then(
                          (courseDetails) => {
                            const newEvent = {
                              name: newEventName,
                              desc: newEventDesc,
                              date: newEventDate,
                              courseName:
                                courseDetails.courseTitle +
                                " " +
                                courseDetails.courseId,
                              courseId: newEventCourse,
                              id: eventId,
                            };
                            //setEvents([newEvent, ...events])
                            setCustomEvents([newEvent, ...customEvents]);
                          }
                        );
                      });
                      setShowEventCreator(false);
                    }}
                  >
                    Add Event
                  </Button>
                  <Button
                    style={{ width: "50%" }}
                    onClick={() => {
                      setShowEventCreator(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </>
            )}
          </StyledDialog>
          <StyledCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            views={{ month: true, week: true, agenda: CustomListView }}
            messages={{ agenda: "List" }}
            onSelectEvent={(event) => {
              setShowPopup(true);
              setSelectedDate(event.start);
            }}
            selectable={role === "instructor"}
            onSelectSlot={(slot) => {
              setSelectedDate(slot.start);
              setNewEventDate(slot.start);
              setShowEventCreator(true);
            }}
            onDelete={(event) => {
              setCustomEvents(customEvents.filter((e) => event.id !== e.id));
              removeEvent(event.course, event.id);
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
