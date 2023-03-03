import React from 'react'
import ClasslistStudent from './ClasslistStudent';
import {doc, getDoc, collection} from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import ProfilePic from '../../Assets/user_logo.jpg'
//import LogoBanner from '../Components/LogoBanner.js'
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom'
import { getCourseDetailsById } from '../../Backend/course';

function Announcements() {

  //useEffect(async () => {
  //const courseDetails = await getCourseDetailsById("iR8l666mgOfQLNUXjjLO");
  //});

  const [cDetails, setCourseData] = useState([]);

  const course = doc(firestore, 'courses', "iR8l666mgOfQLNUXjjLO");

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
    <div>
      <h1>Course Name: {cDetails.courseTitle} {cDetails.courseID}</h1>
      <h1>Course Description: {cDetails.description}</h1>
      <h1>Course Credits: {cDetails.credit}</h1>
      <h1>Course Capacity:{cDetails.capacity}</h1> 
       
       
       

    </div>
  )
}

export default Announcements