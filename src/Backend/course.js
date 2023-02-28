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

export async function createCourse(capacity, title, number, credit, dept, description) {
  let data = {
    capacity: capacity,
    courseTitle: title,
    courseId: number,
    credit: credit,
    department: dept,
    description: description
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
    await deleteDoc(doc(collection(firestore, "course"), courseId));
    console.log("Course removed with ID: ", courseId);
  } catch (e) {
    console.error("Error removing course with ID ", courseId, ": ", e);
  }
}
