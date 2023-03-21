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


export const addAssignment = async (title, description, dueDate, courseDocId) => {
    const d = new Date(dueDate);
    const date = Timestamp.fromDate(d);
  
    let assignment = {
      dueDate: date,
      title: title,
      description: description,
      courseDocId: courseDocId,
    };
  
    try {
      const assignmentDoc = await addDoc(collection(firestore, "assignments"), assignment);
      console.log("Assignment added successfully:" + assignmentDoc.id);
      addAssignmentToCourse (assignmentDoc, courseDocId);
    } catch (error) {
      console.error("Error adding assignment", error);
    }
  };

  export const addAssignmentToCourse = async (assignmentDocId, courseDocId) => {
    const faqRef = collection(firestore, "courses");
    const snapshot = await getDoc(doc(faqRef, courseDocId));
    if(snapshot === null) {
      console.error("Course Not found!");
      return;
    }
    const courseAssignments = snapshot.data();
    if (courseAssignments.assignments != null) {
      try {
        await updateDoc(doc(faqRef, courseDocId), {
          assignments: arrayUnion(assignmentDocId.id)
        });
        console.log("Assignment added to course!");
      } catch(error) {
        console.error("Error when adding assignment to course.", error);
      } 
    }
    else {
      console.log("Assigments field not found in Doc.")
    }

  };

  export function verifyInput(title, description, dueDate, time) {
    const dateRegex = /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/;
    const timeRegex = /^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/;
    const nonEmptyRegex = /^.+$/;
    if (!dateRegex.test(dueDate) || !timeRegex.test(time) || !nonEmptyRegex.test(title)) {
      console.log(dueDate + dateRegex.test(dueDate) + "," + timeRegex.test(time) + "," + nonEmptyRegex.test(title));
      return false;
    }
    return true;
  }




