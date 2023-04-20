import React from "react";
import { firestore } from "../../Backend/firebase";
import { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { getCourseDetailsById, createAnnouncement } from "../../Backend/course";
import "../../Styles/Assignments.css";
import { getUserRole } from "../../Backend/user";
import CourseNavBar from "../CourseNavBar";
import {
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";


function Announcements() {
 
  const location = useLocation();
  const courseID = location.state?.courseId;
  const [description, setDescription] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();

  }, [location]);

  async function fetchData() {
    getUserRole().then(role => {
      setRole(role);
    })
    const course = await getCourseDetailsById(courseID);
    setAnnouncements(course.announcements);
  }

  const clickPost = async () => {
    try {
      await createAnnouncement(title, description, courseID);
      alert("Announcement Successfully Posted!");
      setTitle("");
      setDescription("");
      fetchData();
    } catch(error) {
      alert("Error occurred, try again.");
      console.log("error adding announcement: " + error);
    }
    
    
  }
  return (
    <div style={{ width: "100%", maxHeight:"100vh", overflow:"auto"}}>
      <CourseNavBar />
      <div style={{padding: "1.5em"}}>
        <div className ="header-box" >
            <div className="header-titles">
              <p>Announcements</p>
            </div>
            <div className="header-divider"></div>
        </div>
        {role === "instructor" && 
        <div style={{backgroundColor:"#132b3d", borderRadius:"1em",border: "1px solid #fff", padding:"0.5em"}}>
          <p style={{ fontSize:"1.3em", color: "white" }}>
              Create New Announcement
          </p>
          <form style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <div>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                label="Announcement"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <Button
              onClick={clickPost}
              variant="contained"
              color="primary"
              style={{
                padding: "1em",
                borderRadius: "1em",
              }}
            >
              Post Announcement
            </Button>
          </form>
        </div>
        }
        <div style={{paddingTop: "1em"}}>
        {role === "instructor" && 
        <>
        <p style={{fontSize:"1.6em", color:"teal"}}>Past Announcements</p>
        <div className="header-divider"></div>
        </>
        }
        {announcements.map((announcement)=>
        <div style={{backgroundColor:"#132b3d", borderRadius:"1em",border: "1px solid #fff", paddingLeft:"0.9em",paddingRight:"0.9em", marginBottom:"1em"}}>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <p style={{fontSize:"1.4em", paddingBottom:"0.2em"}}>{announcement.title}</p>
            <p style={{fontSize:"1.1em", paddingBottom:"0.2em"}}>{announcement.timestamp.toDate().toLocaleTimeString('en-US')+", "+announcement.timestamp.toDate().toDateString()}</p>
          </div>
          <p style={{fontSize:"1.2em", color:"rgb(174, 192, 208)"}}>{announcement.description}</p>
        </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Announcements;
