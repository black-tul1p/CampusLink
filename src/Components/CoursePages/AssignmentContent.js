import { useState, useEffect } from "react";
import CourseNavBar from "../CourseNavBar";
import ErrorBox from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography} from "@mui/material";
import styled from "@emotion/styled";
import { Timestamp } from "@firebase/firestore";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import { ref, uploadBytes, listAll, list,  getDownloadURL, deleteObject } from "firebase/storage"
import { doc, getDoc, collection } from "@firebase/firestore";
import { storage } from "../../Backend/firebase"
import { getCourseDetailsById } from "../../Backend/course";
import { getCurrentUser } from "../../Backend/user";

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

function AssignmentContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [userInfo, setUserInfo] = useState("");

    const title = location.state?.assignmentTitle;
    const dueDate = location.state?.assignmentDueDate;
    const description = location.state?.assignmentDescript;
    const submissionLimit = location.state?.assignmentSubLim;
    const courseDocId = location.state?.courseDocId;
    console.log("Stuff should display here " + title + " " + dueDate + " " + description + " " + submissionLimit);

    //Get courseTitle and courseId from courseDocId
    const getCourseDetails = async () => {
        const course = await getCourseDetailsById(courseDocId);
        const courseTitleT = course.courseTitle;
        setCourseTitle(courseTitleT);
        const courseIdT = course.courseId;
        setCourseId(courseIdT);
    }
    getCourseDetails();

    //Get user info
    const getUserInfo = async () => {
        const thisUser = await getCurrentUser();
        setUserInfo(thisUser.email);

    }
    getUserInfo();



    

    //file location and set up states
    const fileLocation =  courseTitle + courseId + "/" + "Assignments/" + title + "/studentEmail:" + userInfo;
    const fileListRef = ref(storage, fileLocation + '/');
    const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([])



    //get # of user submissions
    const [subcount, setSubCount] = useState(0);
   
    const getCurrentSubmissions  = async () => {
        const allFiles = await list(fileListRef);
        console.log(allFiles.items.length)
        setSubCount(allFiles.items.length);
     }
     getCurrentSubmissions();

     

    //file upload function
    const uploadFile = () => {
		if (fileUpload == null) {
			alert("No file selected");
			return;
		}

       

		//very rough but temp file type checker
		var fileCheck = "" + fileUpload.type;

		if (!fileCheck.includes("pdf")) {
			alert("Error: Only PDF files are accepted. Please try again with a pdf file");
			return;
		}


        if (subcount >= submissionLimit) {
            alert("You have reached the submission limit of " + submissionLimit + ". Your file can not be submitted.")
            return;
        }

 

		//use + v4() for random chars
		const fileRef = ref(storage, fileLocation + '/' + fileUpload.name);
		
		uploadBytes(fileRef, fileUpload).then(() => {
			alert("File Uploaded!");
            setFileUpload(null);
			//console.log(fileUpload)
		})

	};

   

    //submission input and upload buttons
    function UploadPrompts() {
		return <div>
        
            <input  
		        type="file"  
			    style={{display: 'none'}} 
			    onChange={(event) => {setFileUpload(event.target.files[0]);}}
			    id="file-input-button"
			    multiple
		    />
		    <label htmlFor="file-input-button">
	            <Button className="Button" component="span">
		            Choose File
	            </Button>
		    </label> 
		    <button onClick={uploadFile}>Submit</button>  
		    </div>
	} 

    
    return(
        <div className = "main-box" style={{ width: "100%" }}>
            {error && <ErrorBox text={error} />}
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
            <SubLimitText>
                Submission Limit: {submissionLimit}
            </SubLimitText>
            <p className="title">
                <UploadPrompts />
            </p>
            
        </div>
    );
}

export default AssignmentContent;