import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc
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

export async function getQuizAttempt(courseId, studentDocId, quizId) {
    try {
        const snapshot = await getDoc(doc(firestore, "courses", courseId, "quizAttempts", studentDocId, "takenQuizzes", quizId));
        const attempt = snapshot.data();
        return attempt;
    } catch (error) {
        throw new Error("Error getting quiz attempt:", error);
    }
}
export async function getQuizAttempts(courseId, studentDocId) {
    try {
        const takeQuizzes = await getDocs(collection(firestore, "courses", courseId, "quizAttempts", studentDocId, "takenQuizzes"));
        return takeQuizzes.docs.map(doc => {
            let attempts = {...doc.data(), quizId: doc.id};
            return attempts;
        });
    } catch (error) {
        throw new Error("Error getting quiz attempt:", error);
    }
}
export const getEnrolledStudents = async (courseId) => {
    
    try {
        const course = await getDoc(doc(firestore, "courses", courseId));
        console.log("reached enrolled 1");
        const enrolledNames = [];
        const studentpaths = course.data().enrolledStudents;
        console.log("reached enrolled 3");
        await Promise.all (
            studentpaths.map(async (path) => {
                console.log("reached enrolled 2" + path.path);
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
        const snapshot = await getDoc(doc(firestore, "courses", courseId, "quizzes", quizId));
        const quiz = snapshot.data();
        return quiz;
    } catch (error) {
        throw new Error("Error getting quiz:", error);
    }
}

