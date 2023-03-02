import { firestore } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "@firebase/firestore";

/**
 * Updates the FAQ collection in Firestore with a new question-answer pair.
 * If the question already exists, the answer is updated with the new answer.
 * @param {string} question - The question to be added or updated in the FAQ.
 * @param {string} answer - The answer to the corresponding question.
 * @throws Will throw an error if there is an issue updating the FAQ.
 */
export const updateFAQ = async (question, answer) => {
  if (!question || !answer) {
    console.error("Error updating FAQ: missing data");
  }

  // Create a query to find the Q&A entry with the given question
  const qnaQuery = query(
    collection(firestore, "faq"),
    where("question", "==", question)
  );

  try {
    // Execute the query to find the matching Q&A entry
    const qnaSnapshot = await getDocs(qnaQuery);

    if (qnaSnapshot.empty) {
      // If no Q&A entry with the given question exists, create a new one
      const newQna = {
        question: question,
        answer: answer,
      };
      await addDoc(collection(firestore, "faq"), newQna);
      console.log("Q&A added successfully.");
    } else {
      // If a Q&A entry with the given question exists, update its answer with the new answer
      const qnaDoc = doc(firestore, "faq", qnaSnapshot.docs[0].id);
      await updateDoc(qnaDoc, { answer: answer });
      console.log("Answer updated successfully.");
    }
  } catch (error) {
    console.error("Error updating FAQ:", error);
  }
};

/**
 * Adds a new question to the FAQ collection in Firestore with an empty answer field.
 * @param {string} question - The question to be added to the FAQ.
 * @throws Will throw an error if there is an issue adding the question to the FAQ.
 */
export const sendSuggestion = async (question) => {
  // Check database to see if question already exists
  const faqRef = collection(firestore, "faq");
  const qRef = query(faqRef, where("question", "==", question));
  const qSnapshot = await getDocs(qRef);

  if (!qSnapshot.empty) {
    throw new Error("Your question will be answered soon");
  }

  let qna = {
    id: Date.now(),
    question: question,
    answer: "",
  };

  try {
    await addDoc(collection(firestore, "faq"), qna);
    console.log("Question added to FAQ successfully.");
  } catch (error) {
    console.error("Error adding question to FAQ:", error);
  }
};

/**
 * Fetches the frequently asked questions (FAQ) from the Firestore database.
 * @returns {Promise<Array>} An array of FAQ objects, each containing an id, question, and answer.
 * @throws {Error} If there is an error fetching the FAQ from the database.
 */
export const fetchFAQ = async () => {
  try {
    const faqRef = collection(firestore, "faq");
    const snapshot = await getDocs(faqRef);
    const faq = [];
    snapshot.forEach((doc) => {
      faq.push({
        id: doc.id,
        question: doc.data().question,
        answer: doc.data().answer,
      });
    });
    console.log("FAQ fetched successfully:", faq);
    return faq;
  } catch (error) {
    throw new Error("Error fetching FAQ:", error);
  }
};
