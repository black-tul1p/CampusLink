import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "@firebase/firestore";
import { firestore } from "./firebase";

export async function createQuiz( courseId, quiz ) {
    try {
        const quizCollection = collection(firestore, "courses", courseId, "quizzes");
        await addDoc(quizCollection, quiz);
    } catch (error) {
        throw new Error("Error adding quiz:", error);
    }
}

export async function fetchQuizzes (courseId) {
    const quizzes = await getDocs(collection(firestore, "courses", courseId, "quizzes"));
    return quizzes.docs.map(doc => {
        let quiz = {...doc.data(), quizId: doc.id};
        
        //Convert firestore timestamp to JS Date
        if (quiz.deadline != null) quiz.deadline = quiz.deadline.toDate(); 
        return quiz;
    });
}

export async function deleteQuiz(courseId, quizId) {
    try {
        await deleteDoc(doc(collection(firestore, "courses", courseId, "quizzes"), quizId));
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