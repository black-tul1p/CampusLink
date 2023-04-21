import { getUserCourses } from "./course";
import { fetchQuizzes } from "./quiz";
import { getUserRole } from "./user";
import { getAssigmentsByCourse } from "./assigment";
import {collection, addDoc, getDocs} from "@firebase/firestore";

import { firestore } from "./firebase";


/**
 * Gets all assignment due dates for all courses for the current user.
 *
 * @returns {Promise<Array>} An array of objects, each representing an assignment due date, with properties for courseId, courseTitle, assignmentTitle, and dueDate.
 * @throws {Error} If there is an error fetching the assignment due dates.
 */
export const getAssignmentsWithDueDates = async () => {
  try {
    // Get the current user's courses
    const role = await getUserRole();
    const courses = await getUserCourses(role);

    // Get all assignments for each course
    const assignmentPromises = courses.map(async (course) => {
      console.log(course.databaseId);
      const hws = await getAssigmentsByCourse(course.databaseId);
      return hws.map((assignment) => {
        return {
          courseName: `${course.courseTitle} ${course.courseId}`,
          assignmentTitle: assignment.title,
          dueDate: assignment.dueDate.toDate(),
        };
      });
    });
    const assignmentsArray = await Promise.all(assignmentPromises);

    // Flatten all the course assignments into a single array
    const allAssignments = assignmentsArray.flat();

    // Sort the assignments by due date
    allAssignments.sort((a, b) => a.dueDate - b.dueDate);

    return allAssignments;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching assignment due dates:", error);
  }
};

/**
 * Get all quiz deadlines, along with quiz name and course name for all courses for the current user
 *
 * @returns {Promise<Array>} An array of objects containing quiz deadline, quiz name, and course name
 * @throws {Error} If there is an error fetching quizzes or user courses
 */
export async function getAllQuizDeadlines() {
  try {
    // Get the current user's courses
    const role = await getUserRole();
    const courses = await getUserCourses(role);

    // Get all quizzes for each course and map course name to each quiz
    const quizzesPromises = courses.map(async (course) => {
      const quizzes = await fetchQuizzes(course.databaseId);
      return quizzes.map((quiz) => {
        return {
          courseName: `${course.courseTitle} ${course.courseId}`,
          quizName: quiz.name,
          deadline: quiz.deadline,
        };
      });
    });
    const quizzesArray = await Promise.all(quizzesPromises);

    // Flatten all the quizzes into a single array
    const quizzes = quizzesArray.flat();

    return quizzes;
  } catch (error) {
    throw new Error(`Error getting all quiz deadlines: ${error}`);
  }
}

export async function getAllEvents() {
  try {
    // Get the current user's courses
    const role = await getUserRole();
    const courses = await getUserCourses(role);

    // Get all events for each course and map course name to each event
    const eventPromises = courses.map(async (course) => {
      //const events = await fetchQuizzes(course.databaseId);
      const events = await getDocs(collection(firestore, "courses", course.databaseId, "calendarEvents"));
      return events.docs.map((event) => {
        return {
          courseName: `${course.courseTitle} ${course.courseId}`,
          name: event.data().title,
          date: event.data().date.toDate(),
          desc: event.data().description
        };
      });
    });
    const eventArray = await Promise.all(eventPromises);

    // Flatten all the events into a single array
    const events = eventArray.flat();

    return events;
  } catch (error) {
    throw new Error(`Error getting all events: ${error}`);
  }
}

export async function createEvent(courseId, date, title, description) {
  try {
    const eventCollection = collection(
      firestore,
      "courses",
      courseId,
      "calendarEvents"
    );
    const event = {
      date: date,
      title: title,
      description: description
    }
    await addDoc(eventCollection, event);
  } catch (error) {
    throw new Error("Error adding event:", error);
  }
}