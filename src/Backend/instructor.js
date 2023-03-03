import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    getDoc,
    addDoc,
  } from "@firebase/firestore";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { auth, firestore } from "./firebase";
  import { getCourseDetailsById } from "./course";
import { async } from "@firebase/util";

export async function createInstructor(first, last, email, password) {
    let data = {
        firstName: first, 
        lastName: last, 
        email: email, 
        pass: password, 
        accepted: false,
        courses: []
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
    var course = [];
      
      const getData = collection(firestore, "instructors");
      
      const snapshot = query(getData, where("email", "==", "test@test.edu"));
      const querySnapshot = await getDocs(snapshot);

      if (querySnapshot.docs.length === 0) {
        alert("No instructor found with email");
      }
      
      
      querySnapshot.forEach(async (doc) => {
        //console.log(doc.data().courses)
        
        doc.data().courses.forEach(async (doc2) => {
          const sTest = new String(doc2.path);
          const courseIDF = sTest.slice(8);
          //console.log(courseIDF);
          //console.log(doc.data().courses[0].path);
        
          
            await getCourseDetailsById(courseIDF).then((res) => {
            //console.log(res);
            /*course.push({
              courseTitle: res.courseTitle,
              courseId: res.courseId,
              credit: res.credit,
              department: res.department,
              capacity: res.capacity,
              registeredStudents: res.registeredStudents,
              description: res.description,
            }); */
            if (res) course.push(res);
          });
          
          
         // console.log(course.length)
      });
      console.log(course );
      }); 
      //console.log("All courses fetched:", course.length);
      return course;
    } catch (error) {
      throw new Error("Error fetching courses:", error);
    }
  };



    try {
        const docRef = await addDoc(collection(firestore, "instructors"), data);
        console.log("Instructor added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding instructor: ", data);
    }
}