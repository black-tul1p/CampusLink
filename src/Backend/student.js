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
  
  export async function createStudent(first, last, email, password) {
    let data = {
      firstName: first,
      lastName: last,
      email: email,
      pass: password,
    };
  
    try {
      const docRef = await addDoc(collection(firestore, "students"), data);
      console.log("Student added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding student: ", data);
    }
  }
  
  export async function removeStudent(studentId) {
    try {
      await deleteDoc(doc(collection(firestore, "students"), studentId));
      console.log("Student removed with ID: ", studentId);
    } catch (e) {
      console.error("Error removing student with ID ", studentId, ": ", e);
    }
  }
  
  export async function getStudentIdByEmail(email) {
    const studentsRef = collection(firestore, "students");
    const q = query(studentsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.docs.length === 0) {
      console.log("No student found with email: ", email);
      return null;
    }
  
    const studentId = querySnapshot.docs[0].id;
    console.log("Found a student with ID: ", studentId);
    return studentId;
  }