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
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getUserRole, getLoggedInUserId } from "../../Backend/user";
import {
  createQuiz,
  fetchQuizzes,
  deleteQuiz,
  updateQuiz,
  getQuizAttempt,
  getEnrolledStudents,
  getQuizAttemptById,
} from "../../Backend/quiz";
import { QuizCreationDialog } from "./QuizCreationDialog";
import QuizPopup from "./QuizPopup";
import ViewPastQuiz from "./ViewPastQuiz";

function Quizzes() {
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [role, setRole] = useState("");
  const [clicked, setClicked] = useState(false);
  const [clicked1, setClicked1] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizDetails ,setQuizDetails] = useState(null);
  const [quizId, setQuizId] = useState("");
  const [quizStudentId, setQuizStudentId] = useState("");
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [attemptList, setAttemptList] = useState([]);
  const [open1, setOpen1] = useState(false);
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
    console.log("Quiz:", quiz);
  };

  const handleOpened = () => {
    setOpen1(true);
  };

  const handleClosed = () => {
    setOpen1(false);
  };

  const ViewStudentAttempts= async (quiz) => {
    try {
      const enrolledStudents = await getEnrolledStudents(courseId);
      const attempts = [];
      await Promise.all(
        enrolledStudents.map(async (student) => {
          const takenQuiz = await getQuizAttemptById(courseId, student.id, quiz.quizId);
          if(takenQuiz) {
            const AttemptDetails = {
              firstName: student.firstName,
              lastName: student.lastName,
              quiz: quiz,
              studentId: student.id,
              attempted: true,
            }
            attempts.push(AttemptDetails);
          } else {
            console.log(student.firstName + ": student did not attempt!")
            const AttemptDetails = {
              firstName: student.firstName,
              lastName: student.lastName,
              quiz: quiz,
              studentId: student.id,
              attempted: false,
            } 
            attempts.push(AttemptDetails);
          }
        })
      );
      setAttemptList(attempts);
      handleOpened();
      } catch (error) {
        console.log("error in displaying quiz attempts: "+error);
      }
  }

  const ViewAttempt = async (quiz, studentId) => {
    try {
      const studentDocId = studentId;
      setQuizStudentId(studentId);
      getQuizAttempt(courseId,studentDocId, quiz.quizId).then((attempt) => {
        const QuizDetails = {
          name: quiz.name,
          description: quiz.description,
          points: quiz.points,
          deadline: quiz.deadline,
          questions: quiz.questions,
          studentAnswers: attempt.answers,
          studentPoints: attempt.points,
          attemptedOn: attempt.attemptedOn,
          isGraded: attempt.isGraded,
          attempts: quiz.attempts,
        }
        setQuizId(quiz.quizId);
        setQuizDetails(QuizDetails);
        setClicked1(true);
      })
      
    } catch (error) {
      console.log("error in getting quiz attempt." + error);
    }
  }

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
    <div style={{ width: "100%", maxHeight:"100vh", overflow:"auto" }}>
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
                <col width="20%" />
                <col width="25%" />
                <col width="20%" />
                <col width="35%" />
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
                              style={{ margin: "auto 20px 0 0" }}
                              onClick={() => {
                                ViewStudentAttempts(quiz)
                              }}
                            >
                              Attempts
                            </Button>
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

      <Dialog 
        open={open1} 
        onClose={handleClosed}
        sx={{ "& .MuiPaper-root": { backgroundColor: "rgb(16, 46, 68)"} }}
      >
        <DialogTitle sx={{ color: "#fff", fontSize: 21, textAlign:"center" }}>Student Attempts</DialogTitle>
        <DialogContent sx={{backgroundColor: "rgb(20, 50, 72)"}}>
          {attemptList.map((attempt) => (
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", columnGap:"10em",borderBottom: "1px solid rgb(134, 177, 207)", padding:"0.5em", marginTop:"0.4em" }}>
              <DialogContentText sx={{ fontSize: 19 }}>
                {attempt.firstName + ", " + attempt.lastName}
              </DialogContentText>
              {attempt.attempted ? (
              <Button 
                variant="outlined"
                onClick={() => {
                  ViewAttempt(attempt.quiz, attempt.studentId);
                }}>
                View Attempt
              </Button>
              ):(
                <Button 
                disabled="true"
                onClick={() => {
                  console.log("hehe clicked!");
                }}>
                  Not Attempted
                </Button>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosed}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
      <ViewPastQuiz
        quizDetails = {quizDetails} 
        courseId = {courseId}
        quizId = {quizId}
        studentId = {quizStudentId}
        open={clicked1}
        onClose={()=>{setClicked1(false)}}
      />

    </div>
  );
}

export default Quizzes;