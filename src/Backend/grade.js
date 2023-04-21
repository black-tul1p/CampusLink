import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    getDocs,
    getDoc,
    updateDoc,
    query,
    where,
    FieldValue,
    arrayUnion,
    setDoc,
  } from "@firebase/firestore";
import { auth, firestore } from "./firebase";

export async function updateCourseWeight(courseId, weight) {
  try {
    const courseRef = doc(collection(firestore, "courses"), courseId);
    await updateDoc(courseRef, { weight });
    console.log("Course weight updated for course ID: ", courseId);
  } catch (e) {
    console.error("Error updating course weight with ID ", courseId, ": ", e);
  }
}
