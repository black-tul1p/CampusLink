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
  
  export async function createCourse(title, id, credit, department, capacity, registeredStudents) {
    let data = {
        courseTitle: title,
        courseId: id,
        credit: credit,
        department: department,
        capacity: capacity,
        registeredStudents: registeredStudents,
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
  
  export async function getCourseIdByDetails(courseTitle, courseId) {
    const coursesRef = collection(firestore, "courses");
    const q = query(coursesRef, where("courseTitle", "==", courseTitle), where("courseId", "==", courseId));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.docs.length === 0) {
      console.log("No course found with course details: ", email);
      return null;
    }
  
    const courseId = querySnapshot.docs[0].id;
    console.log("Found a course with ID: ", courseId);
    return courseId;
  }