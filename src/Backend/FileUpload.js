import { UploadFile } from "@mui/icons-material";
import React from "react";
import { useState, useEffect } from 'react'
import {storage } from "./firebase";
import { ref, uploadBytes, listAll, list,  getDownloadURL, deleteObject } from "firebase/storage"
import {v4} from 'uuid'
import { getUserRole } from "./user";

import "./TempFile.css";
import "../Styles/App.css"
import { Button } from "@mui/material";
import { color } from "@mui/system";
import { Document, Page } from "react-pdf"
import { doc, getDoc, collection } from "@firebase/firestore";
import { firestore } from "./firebase";
import { useLocation} from "react-router-dom";
import { getCourseDetailsById } from "./course";

function FileUpload() {
	//get course info for correct file storage location
	//const [cDetails, setCourseData] = useState([]);

  	const location = useLocation();
  	const courseDocId = location.state?.courseId;

	console.log(courseDocId)

  	//const courseStuff = doc(firestore, "courses", courseID);

  	
	  
	  const [courseTitle, setCourseTitle] = useState("");
	  const [courseId, setCourseId] = useState("");
	
	//Get courseTitle and courseId from courseDocId
	  const getCourseDetails = async () => {
        const course = await getCourseDetailsById(courseDocId);
        const courseTitleT = course.courseTitle;
        setCourseTitle(courseTitleT);
        const courseIdT = course.courseId;
        setCourseId(courseIdT);
    }
    getCourseDetails();

    var fileLocation = courseTitle + courseId + "/LectureNotes";

	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([])
	
	var fileListRef = ref(storage, fileLocation + '/')

	//upload file to firebase
	
	const uploadFile = () => {
		if (fileUpload == null) {
			alert("No file selected");
			LoadFiles();
			return;
		}

		//very rough but temp file type checker
		var fileCheck = "" + fileUpload.type;

		if (!fileCheck.includes("pdf")) {
			alert("Error: Only PDF files are accepted. Please try again with a pdf file");
			return;
		}

 

		//use + v4() for random chars
		const fileRef = ref(storage, fileLocation + '/' + fileUpload.name);
		
		uploadBytes(fileRef, fileUpload).then(() => {
			alert("File Uploaded!");
			setFileUpload(null);
			LoadFiles();
			//console.log(fileUpload)
		})

	};

	//display files on page
	function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

	useEffect( () => {
		//console.log(fileListRef)
		setFileList([]);
		const tempFunc = async () => { 


			var allFiles = await listAll(fileListRef);
			//console.log(allFiles.items.length)
			
			if (allFiles.items.length == 0) {
				LoadFiles()
				//console.log("no dice")
			} 
			
			allFiles.items.forEach(async item => {
				var temp = await getDownloadURL(item)
				setFileList((prev) => [...prev, temp]);
			});

			/*listAll(fileListRef).then( (response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setFileList((prev) => [...prev, url]);
				});
			});
			}); */
		}

		tempFunc();

	}, []); 

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

	
	/**/
	//check user role
	
	const [userRole, setUserRole] = useState("student");

	async function modifyFiles() {
	//console.log("huh")
		getUserRole().then((newRole) => {
			setUserRole(newRole);

		});


		
		//console.log(userRole)
		return userRole;
	}

	
	const [mp4File, setMP4Upload] = useState([]);
	//upload file to firebase  (change function)
	const uploadMP4 = () => {
		if (mp4File == null) {
			alert("No MP4 selected");
			return;
		}

		//very rough but temp file type checker
		var fileCheck = "" + mp4File.type;

		if (!fileCheck.includes("mp4")) {
			alert("Error: Only mp4 files are accepted. Please try again with a mp4 file");
			console.log(mp4File);
			//return;
		}

 

		//use + v4() for random chars
		const fileRef = ref(storage, fileLocation + '/mp4Videos/' + mp4File.name);
		
		uploadBytes(fileRef, mp4File).then(() => {
			alert("File Uploaded!");
			setFileUpload(null);
			//console.log(fileUpload)
		})

	};

	 function ModifyFileDisplay() {
		modifyFiles();
		//console.log(userRole)
		if (userRole != "student") {
			return <div><input  
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



		}

	} 

	return(
   <div>
	<ModifyFileDisplay /> 


	{/*console.log(fileList)*/}
	{fileList.map((newFile) => {
		//console.log(newFile);
		//return <iframe className="Newimg" src={newFile} alt="this one is a pdf" width="5000" height="500" name="Test Name" allowFullScreen={true} />;
		//return   <p>Open a PDF file <a href={newFile}>example</a>.</p>;
		return <embed src={newFile} height="300" display="grid" />
		
	})} 

   </div>
	);
}

export default FileUpload

