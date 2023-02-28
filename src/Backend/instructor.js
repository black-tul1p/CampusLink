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

export async function createInstructor(accept, first, last, email, password) {
  let data = {
    accepted: accept,
    firstName: first,
    lastName: last,
    email: email,
    pass: password,
  };

  try {
    const docRef = await addDoc(collection(firestore, "instructors"), data);
    console.log("Instructor added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding instructor: ", data);
  }
}

export async function removeStudent(instructorId) {
  try {
    await deleteDoc(doc(collection(firestore, "instructors"), instructorId));
    console.log("Instructor removed with ID: ", instructorId);
  } catch (e) {
    console.error("Error removing instructor with ID ", instructorId, ": ", e);
  }
}

export async function getInstructorIdByEmail(email) {
  const instructorsRef = collection(firestore, "instructors");
  const q = query(instructorsRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) {
    console.log("No instructor found with email: ", email);
    return null;
  }

  const instructorId = querySnapshot.docs[0].id;
  console.log("Found an instructor with ID: ", instructorId);
  return instructorId;
}

