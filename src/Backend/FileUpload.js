import React from "react";
import { useState, useEffect } from 'react'
import {storage } from "./firebase";
import { ref, uploadBytes, listAll, list,  getDownloadURL} from "firebase/storage"
import {v4} from 'uuid'
import { getUserRole } from "./user";
import "./TempFile.css";
import "../Styles/App.css"
import { Button, Snackbar } from "@mui/material";
import { useLocation} from "react-router-dom";
import { getCourseDetailsById } from "./course";

function FileUpload() {
	
	//get current course information
  	const location = useLocation();
  	const courseDocId = location.state?.courseId;

	//Get courseTitle and courseId from courseDocId
	const [courseTitle, setCourseTitle] = useState("");
	const [courseId, setCourseId] = useState("");
	const getCourseDetails = async () => {
    	const course = await getCourseDetailsById(courseDocId);
        const courseTitleT = course.courseTitle;
        setCourseTitle(courseTitleT);
        const courseIdT = course.courseId;
        setCourseId(courseIdT);
    }
    getCourseDetails();

    //set file location for lecture notes (videos appends to this)
	var fileLocation = courseTitle + courseId + "/LectureNotes";
	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([])
	var fileListRef = ref(storage, fileLocation + '/')

	//upload file to firebase
	const uploadFile = () => {
		if (fileUpload == null) {
			//alert("No file selected");
			setSnackbarMessage("No file selected!");
            setOpenSnackbar(true);
			LoadFiles();
			LoadMp4();
			return;
		}

		//very rough but temp file type checker
		var fileCheck = "" + fileUpload.type;
		if (!fileCheck.includes("pdf")) {
			//alert("Error: Only PDF files are accepted. Please try again with a pdf file");
			setSnackbarMessage("Error: Only PDF files are accepted! Please try again with a pdf file.");
            setOpenSnackbar(true);
			LoadMp4();
			LoadFiles();
			return;
		}

		//use + v4() for random chars
		const fileRef = ref(storage, fileLocation + '/' + fileUpload.name);		
		uploadBytes(fileRef, fileUpload).then(() => {
			//alert("File Uploaded!");
			setSnackbarMessage("File Uploaded!");
            setOpenSnackbar(true);
			setFileUpload(null);
			LoadFiles();
			LoadMp4();
			//console.log(fileUpload)
		})

	};


	//load files into fileList
	function LoadFiles() {

		//console.log(fileListRef)
		setFileList([]);
		const tempFunc = async () => { 

			const allFiles = await list(fileListRef);
			
			allFiles.items.forEach(async item => {
				var temp = await getDownloadURL(item)
				setFileList((prev) => [...prev, temp]);
			});
		}

		tempFunc();

	}

	//upload MP4 to firebase  (change function)
	const [mp4File, setMP4Upload] = useState([]);
	const [mp4FileList, setMp4FileList] = useState([]);
	const uploadMP4 = () => {

		if (userRole === "student") {
			LoadMp4();
			LoadFiles();
			return;
		}

		if (mp4File == null) {
			//alert("No MP4 selected");
			setSnackbarMessage("No MP4 selected!");
            setOpenSnackbar(true);
			LoadMp4();
			LoadFiles();
			return;
		}

		//very rough but temp file type checker
		var fileCheck = "" + mp4File.type;
		if (!fileCheck.includes("mp4")) {
			//alert("Error: Only mp4 files are accepted. Please try again with a mp4 file");
			setSnackbarMessage("Error: Only mp4 files are accepted! Please try again with a mp4 file");
            setOpenSnackbar(true);
			console.log(mp4File);
			LoadMp4();
			LoadFiles();
			return;
		}

		//use + v4() for random chars
		const fileRef = ref(storage, fileLocation + '/mp4Videos/' + mp4File.name);
		uploadBytes(fileRef, mp4File).then(() => {
			//alert("MP4 Uploaded!");
			setSnackbarMessage("MP4 Uploaded!");
            setOpenSnackbar(true);
			LoadMp4();
			LoadFiles();
			setMP4Upload(null);
		})

	};

	//load MP4 links into mp4FileList
	function LoadMp4() {
		setMp4FileList([]);
		const tempFunc = async () => { 
			
			var mp4ListRef = ref(storage, fileLocation + '/mp4Videos/')
			const allFiles = await list(mp4ListRef);
			
			allFiles.items.forEach(async item => {
				var temp = await getDownloadURL(item)
				setMp4FileList((prev) => [...prev, temp]);
			});
		}

		tempFunc();
	}

	//check user role, called in ModifyFiledisplay()
	const [userRole, setUserRole] = useState("student");
	async function checkUserRoles() {
		getUserRole().then((newRole) => {
			setUserRole(newRole);

		});
		return userRole;
	}
	
	//display upload buttons if the user is not a student
	function ModifyFileDisplay() {
		checkUserRoles();
		
		if (userRole != "student") {
			return <div>

				{/*Display pdf file upload button*/}
				<input  
					type="file"  
					style={{display: 'none'}} 
					onChange={(event) => {setFileUpload(event.target.files[0]);}}
					id="file-input-button"
					multiple
				/>
				
				<label htmlFor="file-input-button">
	  				<Button className="Button" component="span">
						Choose PDF File
	  				</Button>
				</label> 
				<button onClick={uploadFile}>Upload File</button>  
		
		
				{/*Display video file upload button*/}
				<input 
					type="file"
					style={{display: 'none'}}
					onChange={(event) => {setMP4Upload(event.target.files[0]);}}
					id="mp4-input-button"
					multiple
				/>

				<label htmlFor="mp4-input-button">
					<Button className="Button" component="span">
						Choose MP4 File
					</Button>
				</label>
				<button onClick={uploadMP4}>Upload MP4</button>
		
			</div>
			} else {
				return <div>
					
				<button onClick={uploadMP4}>Load Info</button>
				</div>
			}
	} 

	//attempt to load video and pdf files onto page as soon as it is navigated to
	useEffect( () => {
		LoadFiles();
		LoadMp4();
	}, []); 

	const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

	
	//main return on page
	return(
   		<div>
			<ModifyFileDisplay /> 
			

			{/*Display uploaded pdfs*/}
			{fileList.map((newFile) => {
				//return <iframe className="Newimg" src={newFile} alt="this one is a pdf" width="5000" height="500" name="Test Name" allowFullScreen={true} />;
				//return   <p>Open a PDF file <a href={newFile}>example</a>.</p>;
				return <embed src={newFile} height="300" display="grid" />	
			})}

			{/*Display uploaded MP4s*/}
			{mp4FileList.map((newFile) => {
				//return <iframe className="Newimg" src={newFile} alt="this one is a pdf" width="5000" height="500" name="Test Name" allowFullScreen={true} />;
				//return <p>Open a PDF file <a href={newFile}>example</a>.</p>;
				return <embed src={newFile} height="300" display="grid" />	
			})}

				<Snackbar
                  open={openSnackbar}
                  autoHideDuration={2000}
                  onClose={handleCloseSnackbar}
                  message={snackbarMessage}
                />

			

   		</div>
	);
}

export default FileUpload

