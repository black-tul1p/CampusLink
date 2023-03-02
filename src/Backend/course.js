import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    getDocs,
    query,
    where,
  } from "@firebase/firestore";
import { firestore } from "./firebase";



  export const getAllCourses = async() => {
    try {
      const getData = collection(firestore, "courses");
      const snapshot = await getDocs(getData);
      const course = [];
      snapshot.forEach((doc) => {
        course.push({
          courseTitle: doc.data().courseTitle,
          courseId: doc.data().courseId,
          credit: doc.data().credit,
          department: doc.data().department,
          capacity: doc.data().capacity,
          registeredStudents: doc.data().registeredStudents,
          description: doc.data().description,
        });
      });
      console.log("All courses fetched:", course);
      return course;
    } catch (error) {
      throw new Error("Error fetching courses:", error);
    }
  };
  
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