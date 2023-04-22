import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { firestore } from "./firebase";

export async function createQuiz(courseId, quiz) {
  try {
    const quizCollection = collection(
      firestore,
      "courses",
      courseId,
      "quizzes"
    );
    await addDoc(quizCollection, quiz);
  } catch (error) {
    console.log(error)
    throw new Error("Error adding quiz:", error);
  }
}

export async function fetchQuizzes(courseId) {
  const quizzes = await getDocs(
    collection(firestore, "courses", courseId, "quizzes")
  );
  return quizzes.docs.map((doc) => {
    let quiz = { ...doc.data(), quizId: doc.id };

    //Convert firestore timestamp to JS Date
    if (quiz.deadline != null) quiz.deadline = quiz.deadline.toDate();
    return quiz;
  });
}

export async function deleteQuiz(courseId, quizId) {
  try {
    await deleteDoc(
      doc(collection(firestore, "courses", courseId, "quizzes"), quizId)
    );
  } catch (error) {
    throw new Error("Error deleting quiz:", error);
  }
}

export async function updateQuiz(courseId, quizId, data) {
  try {
    const quiz = doc(firestore, "courses", courseId, "quizzes", quizId);
    await updateDoc(quiz, data);
  } catch (error) {
    throw new Error("Error updating quiz:", error);
  }
}

export async function getQuizAttempt(courseId, studentDocId, quizId) {
  try {
    const quizAttemptRef = doc(
      firestore,
      "courses",
      courseId,
      "quizAttempts",
      studentDocId,
      "takenQuizzes",
      quizId
    );

    const quizAttemptSnapshot = await getDoc(quizAttemptRef);

    if (quizAttemptSnapshot.exists()) {
      console.log("found quiz attempt");
      return quizAttemptSnapshot.data();
    } else {
      console.log("returning null");
      return null;
    }
  } catch (error) {
    throw new Error("Error getting quiz attempt data:"+ error);
  }
}
export async function updateQuizGrade(courseId, studentDocId, quizId, data) {
  try {
    const newData = {
      ...data,
      isGraded: true,
    };

    const quizAttemptRef = doc(
      firestore,
      "courses",
      courseId,
      "quizAttempts",
      studentDocId,
      "takenQuizzes",
      quizId
    );

    await setDoc(quizAttemptRef, newData);
    return "Quiz attempt data updated successfully";
  } catch (error) {
    throw new Error("Error submitting quiz attempt", error);
  }
}


export async function setQuizAttempt(courseId, studentDocId, quizId, data) {
  try {
    const newData = {
      ...data,
      isGraded: false,
    };

    const quizAttemptRef = doc(
      firestore,
      "courses",
      courseId,
      "quizAttempts",
      studentDocId,
      "takenQuizzes",
      quizId
    );

    await setDoc(quizAttemptRef, newData);
    return "Quiz attempt data updated successfully";
  } catch (error) {
    throw new Error("Error submitting quiz attempt", error);
  }
}
export async function getQuizAttemptById(courseId, studentDocId, quizId) {
    try {
        const takenQuiz = await getDoc(doc(firestore, "courses", courseId, "quizAttempts", studentDocId, "takenQuizzes", quizId));
        if (takenQuiz.exists()) {
          console.log("data: " + takenQuiz.data().points)
          return {...takenQuiz.data(), id:takenQuiz.id}
        } else {
          return null;
        }
    } catch (error) {
        throw new Error("Error getting quiz attempt by Id:" + error);
    }
}
export const getEnrolledStudents = async (courseId) => {
    try {
        const course = await getDoc(doc(firestore, "courses", courseId));
        const enrolledNames = [];
        const studentpaths = course.data().enrolledStudents;
        await Promise.all (
            studentpaths.map(async (path) => {
                const refId = path.path.split("/")[1].trim();
                const student = await getDoc(doc(firestore, "students", refId));
                if(student) {
                    enrolledNames.push({
                        id: student.id,
                        firstName: student.data().firstName,
                        lastName: student.data().lastName,
                    });
                  }
            })
        );
        return enrolledNames;
    } catch (error) {
        throw new Error("Error getting students enrolled: " + error);
    }
}
export const getAttemptedBy = async (courseId, quizId) => {
    try {
        const quiz = await getDoc(doc(firestore, "courses", courseId, "quizzes", quizId));
        const names = [];
        const studentIds = quiz.data().attemptedBy;
        await Promise.all (
            studentIds.map(async (studentId) => {
              const student = await getDoc(doc(firestore, "students", studentId));
              if(student) {
                names.push({
                    id: studentId,
                    firstName: student.data().firstName,
                    lastName: student.data().lastName,
                });
              }
        })
        );
        if (names.length > 0) {
            return names;
        }
        else {
            console.log("returning null");
            return names;
        }
        
    } catch (error) {
        throw new Error("Error getting students who attempted quiz:" + error);
    }
}

export async function getQuiz(courseId, quizId) {
  try {
    const snapshot = await getDoc(
      doc(firestore, "courses", courseId, "quizzes", quizId)
    );
    const quiz = snapshot.data();
    return quiz;
  } catch (error) {
    throw new Error("Error getting quiz:", error);
  }
}
