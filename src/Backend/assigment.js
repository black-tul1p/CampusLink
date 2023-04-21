import { firestore } from "./firebase";

import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
} from "@firebase/firestore";


export const addAssignment = async (title, description, dueDate, submissionLimit, courseDocId) => {
  const d = new Date(dueDate);
  const date = Timestamp.fromDate(d);

  let assignment = {
    dueDate: date,
    title: title,
    description: description,
    submissionLimit: submissionLimit,
    courseDocId: courseDocId,
  };

  try {
    const assignmentDocRef = await addDoc(collection(firestore, "assignments"), assignment);
    const assignmentId = assignmentDocRef.id;
    console.log("Assignment added successfully:" + assignmentId);

    const updatedAssignment = { ...assignment, id: assignmentId };
    await updateDoc(doc(firestore, "assignments", assignmentId), updatedAssignment);

    addAssignmentToCourse(updatedAssignment, courseDocId);
  } catch (error) {
    console.error("Error adding assignment", error);
  }
};

export const addAssignmentToCourse = async (assignment, courseDocId) => {
  const faqRef = collection(firestore, "courses");
  const snapshot = await getDoc(doc(faqRef, courseDocId));
  if(snapshot === null) {
    console.error("Course Not found!");
    return;
  }
  const course = snapshot.data();
  if (course.assignments != null) {
    try {
      await updateDoc(doc(faqRef, courseDocId), {
        assignments: arrayUnion(doc(firestore, 'assignments/', assignment.id))
      });
      console.log("Assignment added to course!");
    } catch(error) {
      console.error("Error when adding assignment to course.", error);
    } 
  } else {
    console.log("Assigments field not found in Doc.")
  }
};
  export async function getAssignmentById(assignmentDocId) {
    const ref = collection(firestore, "assignments");
    const snapshot = await getDoc(doc(ref, assignmentDocId));
  
    const assignment = snapshot.data();
    return assignment;
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
              if (res) {
                res.id = assignDocId;
                assignments.push(res);
              }
            })
          );
  
      // console.log("All assignments fetched:", assignments.length);
      return assignments;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching assignments:", error);
    }
  };

  export function verifyInput(title, description, dueDate, time, submissionLimit) {
    const dateRegex = /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/;
    const timeRegex = /^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/;
    const nonEmptyRegex = /^.+$/;
    const submissionLimitRegex = /^\d+$/;
    if (!dateRegex.test(dueDate) || !timeRegex.test(time) || !nonEmptyRegex.test(title) || !submissionLimitRegex.test(submissionLimit)) {
      console.log(dueDate + dateRegex.test(dueDate) + "," + timeRegex.test(time) + "," + nonEmptyRegex.test(title) + "," + submissionLimitRegex.test(submissionLimit));
      return false;
    }
    return true;
  }

  export async function editAssignment(assignmentId, title, description, due, submissionLimit, courseId) {
    const assignmentsRef = collection(firestore, "assignments");
    const assignmentRef = doc(assignmentsRef, assignmentId);
    const dueDate = new Date(due);
    const updatedData = {
      title: title,
      description: description,
      dueDate: Timestamp.fromDate(dueDate),
      submissionLimit: parseInt(submissionLimit),
      courseId: courseId
    };
  
    await updateDoc(assignmentRef, updatedData);
    return {
      id: assignmentId,
      ...updatedData,
      dueDate: dueDate
    };
  }