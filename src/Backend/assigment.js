import { firestore, auth } from "./firebase";
import { getCurrentUser, getUserIdByEmail } from "./user";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  getDocs,
  query, 
  where,
  arrayRemove, 
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
    console.log(assignments);
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

export const getBookmarkedAssignments = async (role, courseDocId) => {
  try {
    const assignments = [];
    const bookmarks = [];

    const ref = await getDoc(doc(firestore, "courses", courseDocId));
 
    console.log(ref);
    const coursesData = ref.data().assignments;
        await Promise.all(
          coursesData.map(async (assignment) => {
            const assignDocId = assignment.path.split("/")[1].trim();
            const res = await getAssignmentById(assignDocId);
            if (res) assignments.push(res);
          })
        );

        const userId = await getUserIdByEmail(auth.currentUser.email);
        let userDoc = await getDoc(doc(firestore, "students", userId));
          if (role === "instructor") {
            userDoc = await getDoc(doc(firestore, "instructors", userId));
          }

    const userBookmarks = userDoc.data().bookmarks;

    console.log(userBookmarks);
    
    await Promise.all(
      assignments.map(async (assignment) => {
        console.log(assignment.id);
        if (userBookmarks.includes(assignment.id)) bookmarks.push(assignment);
      })
    );

    console.log("All assignments fetched:", bookmarks);
    return bookmarks;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching bookmarks:", error);
  }
};

export const addBookmark = async (role, assignmentId) => {
  const userId = await getUserIdByEmail(auth.currentUser.email);
  let userDoc = (doc(firestore, "students", userId));
    if (role === "instructor") {
      userDoc = (doc(firestore, "instructors", userId));
    }
    await updateDoc(userDoc, {bookmarks: arrayUnion(assignmentId)});
};

export const removeBookmark = async (role, assignmentId) => {
  console.log(assignmentId);
  const userId = await getUserIdByEmail(auth.currentUser.email);
  let userDoc = (doc(firestore, "students", userId));
    if (role === "instructor") {
      userDoc = (doc(firestore, "instructors", userId));
    }
  console.log(userDoc);
  await updateDoc(userDoc, {bookmarks: arrayRemove(assignmentId)});
};

export const isBookmarked = async (assignmentId) => {
  try {
  let userDoc = await getCurrentUser();

    const userBookmarks = userDoc.bookmarks;

    if (userBookmarks.includes(assignmentId)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error checking if bookmarked:", error);
  }
};

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
};