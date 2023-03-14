import { firestore } from "./firebase";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
} from "@firebase/firestore";


export const addAssignment = async (title, description, dueDate) => {
    // get Date
    //July 21, 2023 01:15:00
    const d = new Date("July 21, 2023 01:15:00");
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
