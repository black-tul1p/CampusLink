import {
  collection,
  addDoc,
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