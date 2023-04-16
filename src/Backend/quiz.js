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
      return quizAttemptSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error getting quiz attempt data:", error);
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
export async function getQuizAttempts(courseId, studentDocId) {
    try {
        const takeQuizzes = await getDocs(collection(firestore, "courses", courseId, "quizAttempts", studentDocId, "takenQuizzes"));
        return takeQuizzes.docs.map(doc => {
            let attempts = {...doc.data(), quizId: doc.id};
            console.log("attempt points: " + attempts.points)
            return attempts;
        });
    } catch (error) {
        throw new Error("Error getting quiz attempt:", error);
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
