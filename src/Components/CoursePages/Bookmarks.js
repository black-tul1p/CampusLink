import CourseNavBar from "../CourseNavBar";
import { addAssignment, verifyInput, getAssigmentsByCourse, getBookmarkedAssignments } from "../../Backend/assigment";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import { useState, useEffect} from "react";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getUserRole } from "../../Backend/user";
import ErrorBox from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { ref, uploadBytes, listAll, list,  getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../Backend/firebase";


function Bookmarks() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(true);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [courseDocId, setCourseDocId] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [submissionLimit, setSubmissionLimit] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    async function fetchData() {
      try {
        // Get user role
        const courseID = location.state?.courseId;
        setCourseDocId(courseID);
        console.log("ID: " + courseID);
        const role = await getUserRole();
        setRole(role);
        console.log("role: " + role);
        const assgnts = await getBookmarkedAssignments(role, courseID);
        setAssignments(assgnts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location]);

  const toggle = () => {
    setOpen(!open);
    if(open === false) {
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      setSubmissionLimit("");
      setOpen1(false);
    }
  }

  const firstToggle = () => {
    setOpen1(!open1);
    if(!open1) {
      handleCancel();
    }
  }
  const UploadFile = () => {
    const fileLocation =    "STAT40200/" + "Assignments/" + title + "/pdfs";
    const fileListRef = ref(storage, fileLocation + '/');
    if (fileUpload == null) {
			console.log("no pdfs added.")
			return;
		}

		var fileCheck = "" + fileUpload.type;

		if (!fileCheck.includes("pdf")) {
			setError("Only pdfs allowed.");
      setTimeout(() => {
        setError("");
      }, 1500);
        return;
			return;
		}
 

		const fileRef = ref(storage, fileLocation + '/' + fileUpload.name);
		
		uploadBytes(fileRef, fileUpload).then(() => {
			console.log("File Uploaded!");
      setFileUpload(null);
			//console.log(fileUpload)
		})
  }
  

  const handleSubmit = () => {
    if (!verifyInput(title, description, date, time, submissionLimit)) {
      console.log("verify: " + verifyInput(title, description, date, time, submissionLimit));
      setError("Incorrect input format.");
      setTimeout(() => {
        setError("");
      }, 1500);
        return;
    } else {
      const due = date + " " + time;
      addAssignment(title, description, due, submissionLimit, courseDocId);
      UploadFile();
      alert("New Assignment Added!");
      handleCancel();
    }
    
  }
  const handleCancel = () => {
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setSubmissionLimit("");
    setOpen(false);
  }


  const handleUpload = () => {
    console.log("File Changed");
  }

  const displayContent = (e) => {
    const assignmentTitle = e.currentTarget.parentElement.getAttribute("assignmenttitle");
    const assignmentDueDate = e.currentTarget.parentElement.getAttribute("assignmentduedate");
    const assignmentDescript = e.currentTarget.parentElement.getAttribute("assignmentdescript");
    const assignmentSubLim = e.currentTarget.parentElement.getAttribute("assignmentsublim");
    const assgnmtId = e.currentTarget.parentElement.getAttribute("assignmentid");
    console.log(assignmentTitle + " " + assignmentDueDate + " " + assignmentDescript + " " + assignmentSubLim);
    navigate("/assignmentContent", { state: {assignmentTitle, assignmentDueDate, assignmentDescript, assignmentSubLim, courseDocId, assgnmtId}});
  }

  return (
    <div className = "main-box" style={{ width: "100%" }}>
      <CourseNavBar />
      {error && <ErrorBox text={error} />}
      <div className = "assignment-box">
        {role === "student" ? (
          <div className="inner-assignment-box">
            <div className ="header-box">
              <div className="header-titles">
                <p>Bookmarks</p>
                <p style={{ fontStyle: "italic" }}>Student View</p>
              </div>
              <div className="header-divider"></div>
            </div>
            <div className="assignments-bar"  onClick={firstToggle}>
              <p style={{fontSize:"1.4em"}}>
                Bookmarked Assignments
              </p>
              {open1 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </div>
            {open1 && (
              <div className="all-assigments-box">
                {assignments.length > 0 ? (
                    assignments
                    .map((assignment) => (
                      <div className = 'assignment-list-box' 
                        assignmenttitle={assignment.title}
                        assignmentdescript={assignment.description}
                        assignmentduedate={assignment.dueDate.toDate()}
                        assignmentsublim={assignment.submissionLimit}
                        assignmentid={assignment.id}
                        >
                        <Button
                          className="Mini-button"
                          onClick={displayContent}
                        >
                          {assignment.title}
                        </Button>
                      </div>
                    ))
                ):
                (<label>No Assignments</label>) 
                }
                
              </div>
            )}
          </div>
        ): role === "instructor" ? (
          <div className="inner-assignment-box">
            <div className ="header-box">
              <div className="header-titles">
              <p>Bookmarks</p>
              <p style={{ fontStyle: "italic" }}>Instructor View</p>
              </div>
              <div className="header-divider"></div>
            </div>
            <div className="assignments-bar"  onClick={firstToggle}>
              <p style={{fontSize:"1.3em"}}>
                Bookmarked Assignments
              </p>
              {open1 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </div>
            {open1 && (
              <div className="all-assigments-box">
                {assignments.length > 0 ? (
                    assignments
                      .map((assignment) => (
                        <div className = 'assignment-list-box' 
                          assignmenttitle={assignment.title}
                          assignmentdescript={assignment.description}
                          assignmentduedate={assignment.dueDate.toDate()}
                          assignmentsublim={assignment.submissionLimit}
                          assignmentid={assignment.id}
                          >
                          <Button
                            className="Mini-button"
                            onClick={displayContent}
                          >
                            {assignment.title}
                          </Button>
                        </div>
                      ))
                ):
                (<label>No Assignments Bookmarked</label>) 
                }
                
              </div>
            )}
        
          </div>
        ): null}
      </div>  
         
    </div>
  );
}

export default Bookmarks;
