import { firestore } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "@firebase/firestore";


export const addAssignment = async (title, description, dueDate) => {
    const d = new Date(dueDate);
    const date = Timestamp.fromDate(d);
    // Check database to see if assignment already exists
    const faqRef = collection(firestore, "assignments");
    const qRef = query(faqRef, where("title", "==", title));
    const qSnapshot = await getDocs(qRef);
  
    if (!qSnapshot.empty) {
      throw new Error("Your question will be answered soon");
    }
  
    let assignment = {
      dueDate: date,
      title: title,
      description: description,
    };
  
    try {
      await addDoc(collection(firestore, "assignments"), assignment);
      console.log("Assignment added successfully!");
    } catch (error) {
      console.error("Error adding assignment", error);
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




