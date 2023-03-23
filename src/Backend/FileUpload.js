import { UploadFile } from "@mui/icons-material";
import React from "react";
import { useState, useEffect } from 'react'
import {storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import {v4} from 'uuid'

import "./TempFile.css";
import "../Styles/App.css"
import { Button } from "@mui/material";
import { color } from "@mui/system";

function FileUpload() {
	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([])
	
	const fileListRef = ref(storage, 'files/')

	//upload file to firebase
	const uploadFile = () => {
		if (fileUpload == null) {
			alert("No file selected")
			return;
		}
		const fileRef = ref(storage, 'newTest/' + fileUpload.name + v4());
		uploadBytes(fileRef, fileUpload).then(() => {
			alert("File Uploaded!");
		})

	};

	//display files on page
	useEffect(() => {
		listAll(fileListRef).then((response) => {
			setFileList([]);
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setFileList((prev) => [...prev, url]);
				});
			});
		});

	}, []);

	return(
   <div>
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
	<button onClick={uploadFile}>Upload File</button>

	{fileList.map((newFile) => {
		return <img className="Newimg" src={newFile} alt="this one is a pdf" />;
	})}

   </div>
	);
}

export default FileUpload