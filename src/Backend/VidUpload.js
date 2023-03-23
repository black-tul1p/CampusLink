import { UploadFile } from "@mui/icons-material";
import React from "react";
import { useState, useEffect } from 'react'
import {storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import {v4} from 'uuid'
import ReactPlayer from "react-player"

import "./TempFile.css";
import "../Styles/App.css"
import { Button } from "@mui/material";
import { color } from "@mui/system";

function VidUpload() {

    const sourceVid = "https://www.youtube.com/watch?v=iGWyN2Lq36M&t=795s"
    const [newVid, setNewVid] = useState(null);
    var newVal
    var buffer

    //https://www.youtube.com/watch?v=wy21xalf6_Y

    const handleUrl = () => {
        setNewVid(buffer);
        if (newVid == null) {
            alert("No video selected")
            return;
        }
        alert("Test text " + newVid)
    }

    return(
        <div>
            <h1>test</h1>
          
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7lw-2TLwn44" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <ReactPlayer url={sourceVid} />
            <label>
                Video Url:
                <input type="text" value={newVal} onChange={e => {buffer = e.target.value}} ></input>
                <button onClick={handleUrl}>Submit</button>
            </label>

            <ReactPlayer url={newVid} />
            
        </div>
    );



}

export default VidUpload