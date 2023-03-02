import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    getDoc,
  } from "@firebase/firestore";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { auth, firestore } from "./firebase";

export async function createInstructor(first, last, email, password) {
    let data = {
        firstName: first, 
        lastName: last, 
        email: email, 
        pass: password, 
        accepted: false,
        courses: null
    };

    try {
        const docRef = await addDoc(collection(firestore, "instructors"), data);
        console.log("Instructor added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding instructor: ", data);
    }
}

export const getInstructorCourses = async() => {
    try {
      const getData = collection(firestore, "instructor");
      const snapshot = query(getData, where("email", "==", auth.currentUser.email));
      const course = [];
      const querySnapshot = await getDocs(snapshot);
      querySnapshot.forEach((doc) => {
        course.push({
          courseTitle: doc.data().courses.courseTitle,
          courseId: doc.data().courses.courseId,
          credit: doc.data().courses.credit,
          department: doc.data().courses.department,
          capacity: doc.data().courses.capacity,
          registeredStudents: doc.data().courses.registeredStudents,
          description: doc.data().courses.description,
        });
      });
      console.log("All courses fetched:", course);
      return course;
    } catch (error) {
      throw new Error("Error fetching courses:", error);
    }
  };


