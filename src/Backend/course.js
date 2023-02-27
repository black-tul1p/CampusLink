import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    getDocs,
    query,
    where,
  } from "@firebase/firestore";
import { useEffect } from "react";
  import { firestore } from "./firebase";



  export async function getAllCourses() {
    const [loading, setLoading] = userState(true);
    const[courses, setCourses] = userState([]);

    useEffect(() => {
      const getCoursesFromFirebase = [];
      const getData = db
      .collection("courses")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getCoursesFromFirebase.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setCourses(getCoursesFromFirebase);
        setLoading(false);
      });

      return () => getData();
    }, []);

    return courses;

  }
  
  export async function createCourse(title, id, credit, department, capacity, registeredStudents, description) {
    let data = {
        courseTitle: title,
        courseId: id,
        credit: credit,
        department: department,
        capacity: capacity,
        registeredStudents: registeredStudents,
        description: description,
    };
  
    try {
      const docRef = await addDoc(collection(firestore, "courses"), data);
      console.log("Course added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding course: ", data);
    }
  }
  
  export async function removeCourse(courseId) {
    try {
      await deleteDoc(doc(collection(firestore, "courses"), courseId));
      console.log("Course removed with ID: ", courseId);
    } catch (e) {
      console.error("Error removing course with ID ", courseId, ": ", e);
    }
  }
  
  // export async function getCourseIdByDetails(courseTitle, courseId) {
  //   const coursesRef = collection(firestore, "courses");
  //   const q = query(coursesRef, where("courseTitle", "==", courseTitle), where("courseId", "==", courseId));
  //   const querySnapshot = await getDocs(q);
  
  //   if (querySnapshot.docs.length === 0) {
  //     console.log("No course found with course details: ", courseId);
  //     return null;
  //   }
  
  //   const courseId = querySnapshot.docs[0].id;
  //   console.log("Found a course with ID: ", courseId);
  //   return courseId;
  // }