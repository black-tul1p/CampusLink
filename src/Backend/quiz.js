import {
  collection,
  addDoc,
  getDocs
} from "@firebase/firestore";
import { firestore } from "./firebase";

export async function createQuiz( courseId, name, description, points, deadline, questions ) {
    let data = {
        name: name,
        description: description,
        points: points,
        deadline: deadline,
        questions: questions
    };
    try {
        const quizCollection = collection(firestore, "courses", courseId, "quizzes");
        await addDoc(quizCollection, data);
    } catch (error) {
        throw new Error("Error adding quiz:", error);
    }
}

export async function fetchQuizzes (courseId) {
    const quizzes = await getDocs(collection(firestore, "courses", courseId, "quizzes"));
    return quizzes.docs.map(doc => doc.data());
}