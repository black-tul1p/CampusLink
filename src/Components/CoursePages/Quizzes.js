import CourseNavBar from "../CourseNavBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getUserRole, getLoggedInUserId } from "../../Backend/user";
import {
  createQuiz,
  fetchQuizzes,
  deleteQuiz,
  updateQuiz,
  getQuizAttempt,
} from "../../Backend/quiz";
import { QuizCreationDialog } from "./QuizCreationDialog";
import QuizPopup from "./QuizPopup";

function Quizzes() {
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [role, setRole] = useState("");
  const [clicked, setClicked] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  // const [attemptedQuizzes, setAttemptedQuizzes] = useState({});
  // const [studentPoints, setStudentPoints] = useState("");

  const dateFormat = {
    day: "2-digit",
    month: "short",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const location = useLocation();
  const courseId = location.state?.courseId;
  const studentDocId = getLoggedInUserId();

  const updateQuizList = (courseId) => {
    fetchQuizzes(courseId).then((quizzes) => {
      setQuizzes(quizzes);
    });
  };

  const clickView = (quiz) => {
    getQuizAttempt(courseId, studentDocId, quiz.quizId).then((res) => {
      if (res !== null) setStudentAnswers(res);
      else setStudentAnswers({});
    });
  };

  useEffect(() => {
    try {
      if (studentAnswers !== null) {
        setClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [studentAnswers]);

  const defaultNewQuiz = {
    name: "",
    description: "",
    points: 0,
    deadline: null,
    timeLimit: null,
    questions: [],
  };

  const getNumQuizAttempts = async (quiz) => {
    const attempt = await getQuizAttempt(courseId, studentDocId, quiz.quizId);
    return attempt.attemptNumber;
  };

  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    const updateRole = async () => {
      const role = await getUserRole();
      if (role) setRole(role);
      else console.error("Could not get user role");
    };

    updateRole();
    updateQuizList(courseId);
  }, [location, courseId]);

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />

      <h1 className="title">Quizzes</h1>

      {role === "instructor" && (
        <Button
          className="add-button"
          style={{ display: "block", margin: "auto" }}
          onClick={() => {
            setOpen(true);
          }}
          variant="contained"
        >
          Create New Quiz
        </Button>
      )}

      {role === "instructor" && (
        <div
          style={{
            display: "block",
            margin: "auto",
            padding: "20px 0",
            width: "80%",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650 }} style={{ borderStyle: "hidden" }}>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <TableHead style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                <TableRow style={{ borderBottom: "1px solid #fff1" }}>
                  <TableCell style={{ color: "white", fontSize: "1em" }}>
                    Quiz
                  </TableCell>
                  <TableCell style={{ color: "white", fontSize: "1em" }}>
                    Due
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "1em",
                      textAlign: "right",
                    }}
                  >
                    Points
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                {quizzes.map((quiz, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell
                        style={{
                          color: "white",
                          borderBottom: "1px solid #fff1",
                        }}
                      >
                        {quiz.name}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          borderBottom: "1px solid #fff1",
                        }}
                      >
                        {quiz.deadline !== null
                          ? quiz.deadline.toLocaleString("en-US")
                          : "No Deadline"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          borderBottom: "1px solid #fff1",
                          textAlign: "right",
                        }}
                      >
                        {quiz.points + " pts"}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "right",
                          borderBottom: "1px solid #fff1",
                        }}
                      >
                        {role === "instructor" && (
                          <>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setEditingQuiz(quiz);
                              }}
                            >
                              Edit
                            </Button>
                            <IconButton
                              sx={{ "& .MuiSvgIcon-root": { color: "#FFF4" } }}
                              style={{ margin: "auto 0 auto 10px" }}
                              onClick={() => {
                                deleteQuiz(courseId, quiz.quizId).then(() => {
                                  updateQuizList(courseId);
                                });
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <QuizCreationDialog
        title="Create Quiz"
        open={open}
        default={defaultNewQuiz}
        onClose={() => {
          setOpen(false);
        }}
        onSave={(quiz) => {
          createQuiz(courseId, quiz).then(() => {
            updateQuizList(courseId);
          });
          setOpen(false);
        }}
      />

      <QuizCreationDialog
        title="Edit Quiz"
        open={editingQuiz !== null}
        default={editingQuiz}
        onClose={() => {
          setEditingQuiz(null);
        }}
        onSave={(quiz) => {
          updateQuiz(courseId, editingQuiz.quizId, quiz).then(() => {
            updateQuizList(courseId);
          });
          setEditingQuiz(null);
        }}
      />

      {role === "student" && (
        <div
          style={{
            margin: "auto",
            padding: "20px 0",
            width: "80%",
          }}
        >
          <TableContainer sx={{ borderRadius: "1em" }}>
            <Table sx={{ minWidth: 650 }} style={{ borderStyle: "hidden" }}>
              <colgroup>
                <col width="45%" />
                <col width="15%" />
                <col width="25%" />
                <col width="15%" />
              </colgroup>
              <TableHead style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                <TableRow style={{ borderBottom: "1px solid #fff1" }}>
                  <TableCell style={{ color: "white", fontSize: "1em" }}>
                    Quiz
                  </TableCell>
                  <TableCell style={{ color: "white", fontSize: "1em" }}>
                    Due
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "1em",
                      textAlign: "right",
                    }}
                  >
                    Points
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                {quizzes.map((quiz, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell
                        style={{
                          color: "white",
                          borderBottom: "1px solid #fff1",
                        }}
                      >
                        {quiz.name}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          borderBottom: "1px solid #fff1",
                        }}
                      >
                        {quiz.deadline !== null
                          ? quiz.deadline.toLocaleString("en-US", dateFormat)
                          : "No Deadline"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          borderBottom: "1px solid #fff1",
                          textAlign: "right",
                        }}
                      >
                        {quiz.points + " pts"}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "right",
                          borderBottom: "1px solid #fff1",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setSelectedQuiz(quiz);
                            clickView(quiz);
                          }}
                          style={{ minWidth: "8em" }}
                        >
                          {quiz.attempts < getNumQuizAttempts
                            ? "Attempt"
                            : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {clicked && (
        <QuizPopup
          userId={studentDocId}
          courseId={courseId}
          answers={studentAnswers}
          quiz={selectedQuiz}
          open={clicked}
          onClose={() => {
            setClicked(false);
          }}
        />
      )}
    </div>
  );
}

export default Quizzes;