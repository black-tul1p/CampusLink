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
  Timestamp,
} from "@firebase/firestore";
import { auth, firestore } from "./firebase";

export async function getAssignmentById(assignmentDocId) {
    const ref = collection(firestore, "assignments");
    const snapshot = await getDoc(doc(ref, assignmentDocId));
    const assignment = snapshot.data();
    return {...snapshot.data(), id: snapshot.id};
  }

  export const getAssigmentsByCourse = async (courseDocId) => {
    try {
      const assignments = [];
  
      let getData = collection(firestore, "courses");
  
      const ref = await getDoc(doc(getData, courseDocId));
  
      if (ref === null) {
        throw new Error(`No course found with ID: ${courseDocId}`);
      }
      const coursesData = ref.data().assignments;
          await Promise.all(
            coursesData.map(async (assignment) => {
              const assignDocId = assignment.path.split("/")[1].trim();
              const res = await getAssignmentById(assignDocId);
              if (res) assignments.push(res);
            })
          );
  
      console.log("All assignments fetched:", assignments[0].id);
      return assignments;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching assignments:", error);
    }
  };

  export const getAssigmentSubmissions = async (assignmentDocId) => {
    try {
      const submissions = await getDocs(collection(firestore, "assignments", assignmentDocId, "submissions"));
      return submissions.docs.map(doc => {
          let assigmentSubmissions = {...doc.data()};
          console.log("score:" + assigmentSubmissions[0].score);
          return assigmentSubmissions;
      });
    } catch (error) {
      throw new Error("Error getting assignment submissions:", error);
    }
  };

  export const getAssigmentSubmission = async (assignmentDocId, studentDocId) => {
    try {
      let getData = collection(firestore, "assignments", assignmentDocId, "submissions");
      const ref = await getDoc(doc(getData, studentDocId));
      const submission =  {...ref.data(), id: assignmentDocId};
      return submission;
    } catch (error) {
      throw new Error("Error getting student's assignment submission: " + error);
    }
  };
  export async function updateCourseWeight(courseId, weight) {
    try {
      const courseRef = doc(collection(firestore, "courses"), courseId);
      await updateDoc(courseRef, { weight });
      console.log("Course weight updated for course ID: ", courseId);
    } catch (e) {
      console.error("Error updating course weight with ID ", courseId, ": ", e);
    }
  }