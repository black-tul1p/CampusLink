import { useState, useEffect } from "react";
import CourseNavBar from "../CourseNavBar";
import ErrorBox from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, TextField, InputAdornment} from "@mui/material";
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



function RegradeRequest() {
    const location = useLocation();
    const navigate = useNavigate();

    const title = location.state?.assignmentTitle;
    const dueDate = location.state?.assignmentDueDate;
    const description = location.state?.assignmentDescript;
    const submissionLimit = location.state?.assignmentSubLim;
    const courseTitle = location.state?.courseTitle;
    const courseId = location.state?.courseId;
    const userEmail = location.state?.userInfo;


    const [reason, setReason] = useState("");
    function Request() {
        return <div>

            <TextField
                multiline
                label="Request Reason"
                variant="filled"
                placeholder="I believe I should recieve a regrade because..."
                value={reason}
                onChange={(e) => {
                    setReason(e.target.value);
                }}
            />
        <Button onClick={submitRequest}>Submit Request</Button>  

    </div>
    }

    

    const submitRequest = async () => {
      
        //stop request if reason is empty or full of only spaces
        if (reason === ""  ||  reason === null || reason.replace(" ", null).length === 0)  {
            alert("Please provide a reason before submitting the request!");
            console.log(reason.length)
            return;
        } 
        console.log(reason.replace(" ", null).length)

        //alert("you have text" + courseTitle + courseId);
        let data = {
            assignment: title,
            completed: false,
            course: "" + courseTitle + courseId, 
            request: reason, 
            reply: "",
            student: userEmail,
        };

        try {
            const docRef = await addDoc(collection(firestore, "regrade_requests"), data);
            //console.log("Regrade: ", docRef.id);            
            alert("Regrade Request successfully submitted!")

        } catch (e) {
            console.error("Error creating regrade request")
            alert("There was a problem completing the regrade request!")
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
            
            <h1 className="title">
                {title}
            </h1>
            <Description>
                Due: {dueDate}
            </Description>
            <Description>
                {description}
            </Description>

            <p className="title">
                <TextField
                    multiline
                    label="Request Reason"
                    variant="filled"
                    placeholder="I believe I should recieve a regrade because..."
                    value={reason}
                    onChange={(e) => {
                    setReason(e.target.value);
                }}
                />
                <Button onClick={submitRequest}>Submit Request</Button>
            </p>

            

            
        
                
        
        
        
        
        </div>



    );

} 
export default RegradeRequest