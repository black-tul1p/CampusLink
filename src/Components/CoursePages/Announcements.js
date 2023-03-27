import React from "react";
import ClasslistStudent from "./ClasslistStudent";
import { doc, getDoc, collection } from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import ProfilePic from "../../Assets/user_logo.jpg";
//import LogoBanner from '../Components/LogoBanner.js'
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getCourseDetailsById } from "../../Backend/course";
import "../../Styles/Announcements.css";
import CourseNavBar from "../CourseNavBar";

function Announcements() {
  //useEffect(async () => {
  //const courseDetails = await getCourseDetailsById("iR8l666mgOfQLNUXjjLO");
  //});

  const [cDetails, setCourseData] = useState([]);

  const location = useLocation();
  const courseID = location.state?.courseId;
  //const courseID = "iR8l666mgOfQLNUXjjLO";

  //lines 20 and 21 of Announcement.js are for
  //pulling course dynammically.
  //If not does not work then comment out and uncomment line 22

  const course = doc(firestore, "courses", courseID);

  useEffect(() => {
    try {
      getDoc(course).then((courseDoc) => {
        console.log(courseDoc.data());
        setCourseData(courseDoc.data());
      });
      //const courseDoc = await getDoc(course)
      //setCourseData(courseDoc.data())
    } catch (error) {}
  }, []);

  // console.log(cDetails.courseID);

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <div className="courseInfo">
        <h2>
          Course Name: {cDetails.courseTitle} {cDetails.courseId}
        </h2>
        <h2>Course Description: {cDetails.description}</h2>
        <h2>Course Credits: {cDetails.credit}</h2>
        <h2>Course Capacity:{cDetails.capacity}</h2>
      </div>
    </div>
  );
}

export default Announcements;