import { useState, useEffect, useRef, createRef } from "react";
import CourseNavBar from "../CourseNavBar";
import ErrorBox from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, TextField, InputAdornment, Snackbar} from "@mui/material";
import styled from "@emotion/styled";
import { Timestamp } from "@firebase/firestore";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import { ref, uploadBytes, listAll, list,  getDownloadURL, deleteObject } from "firebase/storage"
import { doc, getDoc, collection, addDoc, getDocs, updateDoc } from "@firebase/firestore";
import { storage } from "../../Backend/firebase"
import { getCourseDetailsById } from "../../Backend/course";
import { getCurrentUser } from "../../Backend/user";
import { firestore } from "../../Backend/firebase";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TopbarRow = styled.div`
  height: 4.5em;
  flex-grow: 1;
  display: flex;
  padding: 0 2em;
  justify-content: space-between;
  background-color: #20232a;
  align-items: center;
`;

const TopbarButton = styled.div`
  display: flex;
  sizing: border-box;
  align-items: center;
  width: 8em;
  cursor: pointer;
  padding: 0 0.5em;
  border-radius: 2em;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: teal;
  }
`;

const TopbarText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 8em;
  border-radius: 1em;
  font-size: 1em;
`;

const Description = styled.div`
color: white;
font-family: Arial, Helvetica, sans-serif;
font-size: 2em;
text-align: center;
padding: 20px 0 0 0;
`;

const SubLimitText = styled.div`
color: white;
font-family: Arial, Helvetica, sans-serif;
font-size: 1em;
text-align: center;
padding: 20px 0 0 0;
`;



function RegradeReply() {
  const location = useLocation();
  const navigate = useNavigate();

  const title = location.state?.assignmentTitle;
  const dueDate = location.state?.assignmentDueDate;
  const description = location.state?.assignmentDescript;
  const submissionLimit = location.state?.assignmentSubLim;
  const courseTitle = location.state?.courseTitle;
  const courseId = location.state?.courseId;
  const userEmail = location.state?.userInfo;


  const [newRequests, setNewRequests] = useState([]);
  
  useEffect(() => {
    getRequests();
  },[location, newRequests.length]);

  async function getRequests() {
    try {
      const getData = collection(firestore, "regrade_requests");
      const snapshot = await getDocs(getData);
      const reqs = [];
      snapshot.forEach((doc) => {
        if (doc.data().completed == false && doc.data().course == "" + courseTitle + courseId) {
          reqs.push({
            reqID: doc.id,
            assignment: doc.data().assignment,
            completed: doc.data().completed,
            course: doc.data().course,
            reply: doc.data().reply,
            request: doc.data().request,
            student: doc.data().student,
          });
        }
      });
        setNewRequests(reqs);
        //console.log(newRequests);
      } catch (e) {
              console.error("Error getting regrade requests: ", e)
          }
  }

    

  const [open1, setOpen1] = useState(true);

    
  const firstToggle = () => {
    setOpen1(!open1);
  }

 

  const [rAssign, setRAssign] = useState("");
  const [rStudent, setRStudent] = useState("");
  const [rReason, setRReason] = useState("");
  const [rRef, setRRef] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


    const displayRequest = (e) => {
        const request_assign = e.currentTarget.parentElement.getAttribute("assignment");
        const request_student = e.currentTarget.parentElement.getAttribute("student");
        const request_reason = e.currentTarget.parentElement.getAttribute("reason");
        const request_ref = e.currentTarget.parentElement.getAttribute("ref2");


        setRAssign(request_assign);
        setRStudent(request_student);
        setRReason(request_reason);
        setRRef(request_ref);
        console.log(request_assign);
        console.log(request_student);
        console.log(request_reason);
    }

    const [reply2, setReply] = useState("");

    const submitReply = async () => {
      try {

        if (rAssign == "") {
          //alert("Error: Please select a request to reply to first!");
          setSnackbarMessage("Please select a request to reply to first!");
          setOpenSnackbar(true);
          return;
        }

        if (reply2 === ""  ||  reply2 === null || reply2.replace(" ", "").length === 0)  {
          //alert("Error: Please provide a reason before submitting the request!");
          //console.log(reply2.length)
          setSnackbarMessage("Please provide a reason before submitting the request!");
          setOpenSnackbar(true);
          return;
        } 


        const getData = collection(firestore, "regrade_requests");
        console.log(getData); 

        await updateDoc(doc(getData, rRef), {
          reply: reply2,
          completed: true,
        });
        //alert("Reply Successfully Submitted!!");
        setSnackbarMessage("Reply Sucessfully Submitted!");
        setOpenSnackbar(true);
        setRAssign("");
        setRStudent("");
        setRReason("");
        setRRef("");
        setReply(""); 
        getRequests();
      
      } catch (e) {
          console.error("Error updating reply: " + e);
        }
    }


    return (
        <div>
             <div className="top-row">
                <TopbarRow>
                    <TopbarButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                    <TopbarText>
                        <Typography>Back</Typography>
                    </TopbarText>
                    </TopbarButton>
                </TopbarRow>
            </div>

            <div className="inner-assignment-box">
            <div className ="header-box">
              <div className="header-titles">
              <p>Regrade Requests</p>
              <p style={{ fontStyle: "italic" }}>Instructor View</p>
              </div>
              <div className="header-divider"></div>
            </div>
            <div className="assignments-bar"  onClick={firstToggle}>
              <p style={{fontSize:"1.3em"}}>
                All Regrade Requests for This Assignment
              </p>
              {open1 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </div>
            {open1 && (
              <div className="all-assigments-box">
                {newRequests.length > 0 ? (
                    newRequests
                      .map((thisRequest) => (
                        <div className = 'assignment-list-box'
                          student={thisRequest.student}
                          assignment={thisRequest.assignment}
                          reason={thisRequest.request}
                          ref2={thisRequest.reqID}
                          >
                          <Button
                            className="Mini-button"
                            onClick={displayRequest}
                          >
                            {thisRequest.assignment + " " + thisRequest.student}
                          </Button>
                        </div>
                      ))
                ):
                (<label>No Regrade Requests</label>) 
                }
                
              </div>
            )}
          </div>

          <p className="header-titles">
             Assignment Name: {rAssign}
          </p>

          <p className="header-titles">
             Student Email: {rStudent}
          </p>

          <p className="header-titles">
            Request Reason: {rReason}
          </p>
          

          <p className="title">
                <TextField
                    multiline
                    label="Reply to Request"
                    variant="filled"
                    placeholder="Reason to accept or deny"
                    value={reply2}
                    onChange={(e) => {
                    setReply(e.target.value);
                }}
                />
                <Button onClick={submitReply}>Submit Reply</Button>
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={2000}
                  onClose={handleCloseSnackbar}
                  message={snackbarMessage}
                />
            </p>

            

            

            
        
                
        
        
        
        
        </div>



    );

} 
export default RegradeReply