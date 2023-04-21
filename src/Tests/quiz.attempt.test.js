import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "firebase/app";

// Mock Firestore functions
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
}));

// Functions to test
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
    throw new Error("Error getting quiz attempt data:" + error);
  }
}

// Tests
describe("setQuizAttempt", () => {
  const courseId = "course123";
  const studentDocId = "student123";
  const quizId = "quiz123";
  const data = { answers: [1, 2, 3], score: 0 };

  beforeEach(() => {
    // Reset Firestore mocks before each test
    jest.resetAllMocks();
  });

  it("should update quiz attempt data successfully", async () => {
    // Mock Firestore references and functions
    const quizAttemptRef = {
      path: "courses/course123/quizAttempts/student123/takenQuizzes/quiz123",
    };
    const setDocMock = jest.fn();

    doc.mockReturnValueOnce(quizAttemptRef);
    setDoc.mockImplementationOnce(setDocMock);

    // Call the function and wait for it to complete
    const result = await setQuizAttempt(courseId, studentDocId, quizId, data);

    // Assert that Firestore functions were called correctly
    expect(doc).toHaveBeenCalledWith(
      firestore,
      "courses",
      courseId,
      "quizAttempts",
      studentDocId,
      "takenQuizzes",
      quizId
    );
    expect(setDocMock).toHaveBeenCalledWith(quizAttemptRef, {
      ...data,
      isGraded: false,
    });

    // Assert that the function returned the correct result
    expect(result).toEqual("Quiz attempt data updated successfully");
  });

  it("should throw an error if there's an error submitting quiz attempt", async () => {
    // Mock Firestore functions to throw an error
    const error = new Error("Failed to submit quiz attempt");
    setDoc.mockRejectedValueOnce(error);

    // Call the function and wait for it to complete
    await expect(
      setQuizAttempt(courseId, studentDocId, quizId, data)
    ).rejects.toThrowError("Error submitting quiz attempt");
  });
});

describe("getQuizAttempt", () => {
  const courseId = "course123";
  const studentDocId = "student123";
  const quizId = "quiz123";
  const quizAttemptData = { answers: [1, 2, 3], score: 0 };

  beforeEach(() => {
    // Reset Firestore mocks before each test
    jest.resetAllMocks();
  });

  it("should return quiz attempt data if it exists", async () => {
    // Mock Firestore references and functions
    const quizAttemptRef = {
      path: "courses/course123/quizAttempts/student123/takenQuizzes/quiz123",
    };
    const quizAttemptSnapshot = {
      exists: jest.fn(() => true),
      data: jest.fn(() => quizAttemptData),
    };

    doc.mockReturnValueOnce(quizAttemptRef);
    getDoc.mockReturnValueOnce(Promise.resolve(quizAttemptSnapshot));

    // Call the function and wait for it to complete
    const result = await getQuizAttempt(courseId, studentDocId, quizId);

    // Assert that Firestore functions were called correctly
    expect(doc).toHaveBeenCalledWith(
      firestore,
      "courses",
      courseId,
      "quizAttempts",
      studentDocId,
      "takenQuizzes",
      quizId
    );
    expect(getDoc).toHaveBeenCalledWith(quizAttemptRef);

    // Assert that the function returned the correct result
    expect(result).toEqual(quizAttemptData);
  });

  it("should return null if quiz attempt data doesn't exist", async () => {
    // Mock Firestore references and functions
    const quizAttemptRef = {
      path: "courses/course123/quizAttempts/student123/takenQuizzes/quiz123",
    };
    const quizAttemptSnapshot = { exists: jest.fn(() => false) };

    doc.mockReturnValueOnce(quizAttemptRef);
    getDoc.mockReturnValueOnce(Promise.resolve(quizAttemptSnapshot));

    // Call the function and wait for it to complete
    const result = await getQuizAttempt(courseId, studentDocId, quizId);

    // Assert that Firestore functions were called correctly
    expect(doc).toHaveBeenCalledWith(
      firestore,
      "courses",
      courseId,
      "quizAttempts",
      studentDocId,
      "takenQuizzes",
      quizId
    );
    expect(getDoc).toHaveBeenCalledWith(quizAttemptRef);

    // Assert that the function returned null
    expect(result).toBeNull();
  });

  it("should throw an error if there's an error getting quiz attempt data", async () => {
    // Mock Firestore functions to throw an error
    const error = new Error("Failed to get quiz attempt data");
    getDoc.mockRejectedValueOnce(error);

    // Call the function and wait for it to complete
    await expect(
      getQuizAttempt(courseId, studentDocId, quizId)
    ).rejects.toThrowError("Error getting quiz attempt data:" + error);
  });
});
