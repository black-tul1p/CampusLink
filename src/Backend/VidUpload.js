import { UploadFile } from "@mui/icons-material";
import React from "react";
import { useState, useEffect } from 'react'
import {storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import {v4} from 'uuid'
import ReactPlayer from "react-player"
import { getUserRole } from "./user";
import "./TempFile.css";
import "../Styles/App.css"
import { Button, Snackbar } from "@mui/material";
import { color } from "@mui/system";
import "../Styles/Announcements.css";

function VidUpload() {

    const sourceVid = "https://www.youtube.com/watch?v=iGWyN2Lq36M&t=795s"
    const [newVid, setNewVid] = useState();
    var newVal
    var buffer

    //https://www.youtube.com/watch?v=wy21xalf6_Y

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleUrl = async () => {
        //if buffer != null ?
        
        
        if (buffer == null) {
            //alert("No video selected")
            setSnackbarMessage("No video selected!");
            setOpenSnackbar(true);
            return;
        }

        const bufferTest = buffer + "";

        if (!bufferTest.includes("youtube")) {
            //alert("Error please enter a url containing a video");
            setSnackbarMessage("Error please enter a url containing a video!");
            setOpenSnackbar(true);
            return;
        }

        setNewVid(buffer);
        buffer = null
        //alert("Video uploaded!")
        setSnackbarMessage("Video Uploaded!");
        setOpenSnackbar(true);
        
       
    }

    const [userRole, setUserRole] = useState("student");
    
	function modifyFiles() {
		getUserRole().then((newRole) => {
			setUserRole(newRole);
		});
		//console.log(userRole)
		return userRole;
	}

	function ModifyFileDisplay() {
		modifyFiles();
		//console.log(userRole)
		if (userRole != "student") {
            return  <label>
            Video Url:
            <input type="text" value={newVal} onChange={e => {buffer = e.target.value}} ></input>
            <button onClick={handleUrl}>Submit</button>
        </label>
		}

	} 

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
        <div className="classInfo">
           <ModifyFileDisplay />
           

            <ReactPlayer url={newVid} />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            
        </div>
    );



}

export default VidUpload