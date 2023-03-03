import { collection, getDocs, query, where, addDoc } from "@firebase/firestore";
import { firestore } from "./firebase";

export async function createInstructor(first, last, email, password) {
  let data = {
    firstName: first,
    lastName: last,
    email: email,
    pass: password,
    accepted: false,
    courses: [],
  };

  try {
    const docRef = await addDoc(collection(firestore, "instructors"), data);
    console.log("Instructor added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding instructor: ", data);
  }
}
