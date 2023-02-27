import { firestore } from "./firebase";
import { collection, addDoc } from "@firebase/firestore";

/**
 * Updates the FAQ collection in Firestore with a new question-answer pair.
 * @param {string} question - The question to be added to the FAQ.
 * @param {string} answer - The answer to the corresponding question.
 * @throws Will throw an error if there is an issue updating the FAQ.
 */
export const updateFAQ = async (question, answer) => {
  let qna = {
    question: question,
    answer: answer,
  };

  try {
    await addDoc(collection(firestore, "faq"), qna);
    console.log("FAQ updated successfully.");
  } catch (error) {
    console.error("Error updating FAQ:", error);
  }
};

/**
 * Fetches the frequently asked questions (FAQ) from the Firestore database.
 * @returns {Promise<Array>} An array of FAQ objects, each containing an id, question, and answer.
 * @throws {Error} If there is an error fetching the FAQ from the database.
 */
export const fetchFAQ = async () => {
  try {
    const faqRef = collection(firestore, "FAQ");
    const snapshot = await faqRef.get();
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
    console.error("Error fetching FAQ:", error);
  }
};
