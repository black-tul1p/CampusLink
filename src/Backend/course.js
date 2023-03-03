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
} from "@firebase/firestore";
import { auth, firestore } from "./firebase";

export const getAllCourses = async () => {
  try {
    const getData = collection(firestore, "courses");
    const snapshot = await getDocs(getData);
    const course = [];
    snapshot.forEach((doc) => {
      course.push({
        courseTitle: doc.data().courseTitle,
        courseId: doc.data().courseId,
        credit: doc.data().credit,
        department: doc.data().department,
        capacity: doc.data().capacity,
        registeredStudents: doc.data().registeredStudents,
        description: doc.data().description,
      });
    });
    console.log("All courses fetched:", course);
    return course;
  } catch (error) {
    throw new Error("Error fetching courses:", error);
  }
};

/**
 * Creates a new course and adds it to a Firestore collection named "courses".
 *
 * @param {string} title - The title of the course.
 * @param {string} id - The ID of the course.
 * @param {number} credit - The credit of the course.
 * @param {string} department - The department of the course.
 * @param {number} capacity - The maximum capacity of the course.
 * @param {Array<string>} registeredStudents - The IDs of the students registered in the course.
 * @param {string} description - The description of the course.
 * @returns {Promise<void>} A promise that resolves when the course is successfully added to Firestore.
 * @throws {Error} If an error occurs while adding the course to Firestore.
 */
export async function createCourse(
  title,
  id,
  credit,
  department,
  capacity,
  registeredStudents,
  description,
  instructorId
) {
  let data = {
    courseTitle: title,
    courseId: id,
    credit: credit,
    department: department,
    capacity: capacity,
    registeredStudents: registeredStudents,
    description: description,
  };

  try {
    const docRef = await addDoc(collection(firestore, "courses"), data);
    const instructorRef = collection(firestore, "instructors");
    await updateDoc(doc(instructorRef, instructorId), {
      courses: arrayUnion(docRef),
    });
    console.log("Course added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding course: ", data);
  }
}

/**
 * Removes a course from the Firestore collection named "courses" with the specified ID.
 *
 * @param {string} courseId - The ID of the course to be removed.
 * @returns {Promise<void>} A promise that resolves when the course is successfully removed from Firestore.
 * @throws {Error} If an error occurs while removing the course from Firestore.
 */

export async function removeCourse(courseId) {
  try {
    await deleteDoc(doc(collection(firestore, "courses"), courseId));
    console.log("Course removed with ID: ", courseId);
  } catch (e) {
    console.error("Error removing course with ID ", courseId, ": ", e);
  }
}

// export async function getCourseIdByDetails(courseTitle, courseId) {
//   const coursesRef = collection(firestore, "courses");
//   const q = query(coursesRef, where("courseTitle", "==", courseTitle), where("courseId", "==", courseId));
//   const querySnapshot = await getDocs(q);

//   if (querySnapshot.docs.length === 0) {
//     console.log("No course found with course details: ", courseId);
//     return null;
//   }

//   const courseId = querySnapshot.docs[0].id;
//   console.log("Found a course with ID: ", courseId);
//   return courseId;
// }

export async function getCourseDetailsById(coursesRef) {
  const coursesData = collection(firestore, "courses");
  const snapshot = await getDoc(doc(coursesData, coursesRef));

  const actualCourse = snapshot.data();
  return { ...actualCourse, databaseId: snapshot.id };
}

export const getUserCourses = async (role) => {
  try {
    const courses = [];

    let getData = collection(firestore, "students");
    if (role === "instructor") {
      getData = collection(firestore, "instructors");
    }

    const snapshot = await getDocs(
      query(getData, where("email", "==", auth.currentUser.email))
    );

    if (snapshot.docs.length === 0) {
      throw new Error("No instructor found with email");
    }

    await Promise.all(
      snapshot.docs.map(async (doc) => {
        const coursesData = doc.data().courses;
        await Promise.all(
          coursesData.map(async (course) => {
            const courseIDF = course.path.slice(8);
            const res = await getCourseDetailsById(courseIDF);
            if (res) courses.push(res);
          })
        );
      })
    );

    console.log("All courses fetched:", courses.length);
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching courses:", error);
  }
};
