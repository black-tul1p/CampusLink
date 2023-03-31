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
    const newQuiz = {
      ...quiz,
      attempted: false,
    };
    const quizCollection = collection(
      firestore,
      "courses",
      courseId,
      "quizzes"
    );
    await addDoc(quizCollection, newQuiz);
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
      console.log("No attempt found");
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
      attemptNumber: data.attemptNumber ? data.attemptNumber + 1 : 1,
      attemptedOn: new Date(),
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

    const quizAttemptSnapshot = await getDoc(quizAttemptRef);

    if (quizAttemptSnapshot.exists()) {
      await setDoc(quizAttemptRef, newData);
      return "Quiz attempt data updated successfully";
    } else {
      throw new Error("Quiz attempt not found");
    }
  } catch (error) {
    throw new Error("Error updating quiz attempt data:", error);
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
