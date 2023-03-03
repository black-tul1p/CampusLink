import React from 'react'
import ClasslistStudent from './ClasslistStudent';
import {doc, getDoc, collection} from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import ProfilePic from '../../Assets/user_logo.jpg'
//import LogoBanner from '../Components/LogoBanner.js'
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from 'react-router-dom'
import { getCourseDetailsById } from '../../Backend/course';
import "./Announcements.css"

function Announcements() {

  //useEffect(async () => {
  //const courseDetails = await getCourseDetailsById("iR8l666mgOfQLNUXjjLO");
  //});

  const [cDetails, setCourseData] = useState([]);

  //const location = useLocation();
  //const courseID = location.state?.courseID;
  const courseID = "iR8l666mgOfQLNUXjjLO";

  const course = doc(firestore, 'courses', courseID);

  useEffect( () => {
    try {
    getDoc(course).then((courseDoc) => {

      console.log(courseDoc.data())
      setCourseData(courseDoc.data());
    });
    //const courseDoc = await getDoc(course)
    //setCourseData(courseDoc.data())
    
  } catch (error) {
    
  }   
  }, []);
  
  console.log(cDetails.courseID)
  
  
  return (
    <div className='courseInfo'>
      <h1>Course Name: {cDetails.courseTitle}  {cDetails.courseId}</h1>
      <h1>Course Description: {cDetails.description}</h1>
      <h1>Course Credits: {cDetails.credit}</h1>
      <h1>Course Capacity:{cDetails.capacity}</h1> 
       
       
       

    </div>
  )
}

export default Announcements