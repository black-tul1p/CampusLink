require("dotenv").config({ path: "../.env.local" });
import {
  getAssignmentsWithDueDates,
  getAllQuizDeadlines,
} from "../Backend/calendar";

// Mock functions used by getAssignmentsWithDueDates
jest.mock("../Backend/user", () => ({ getUserRole: jest.fn() }));
jest.mock("../Backend/course", () => ({ getUserCourses: jest.fn() }));
jest.mock("../Backend/assigment", () => ({
  getAssigmentsByCourse: jest.fn(),
}));

describe("getAllQuizDeadlines", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of all quiz deadlines for the current user", async () => {
    // Set up mock functions to return expected values
    const role = "student";
    const courses = [
      {
        courseId: "course1",
        courseTitle: "Course 1",
        databaseId: "course1-db",
      },
      {
        courseId: "course2",
        courseTitle: "Course 2",
        databaseId: "course2-db",
      },
    ];
    const quizzesByCourse = {
      "course1-db": [
        {
          name: "Quiz 1",
          deadline: new Date("2023-04-30T23:59:59Z"),
        },
        {
          name: "Quiz 2",
          deadline: new Date("2023-05-31T23:59:59Z"),
        },
      ],
      "course2-db": [
        {
          name: "Quiz 3",
          deadline: new Date("2023-05-15T23:59:59Z"),
        },
      ],
    };

    getUserRole.mockResolvedValueOnce(role);
    getUserCourses.mockResolvedValueOnce(courses);
    fetchQuizzes.mockImplementation((courseId) => quizzesByCourse[courseId]);

    // Call the function and wait for it to complete
    const result = await getAllQuizDeadlines();

    // Assert that mock functions were called with the correct arguments
    expect(getUserRole).toHaveBeenCalled();
    expect(getUserCourses).toHaveBeenCalledWith(role);
    expect(fetchQuizzes).toHaveBeenCalledWith("course1-db");
    expect(fetchQuizzes).toHaveBeenCalledWith("course2-db");

    // Assert that the function returned the correct result
    expect(result).toEqual([
      {
        courseName: "Course 1 course1",
        quizName: "Quiz 1",
        deadline: new Date("2023-04-30T23:59:59Z"),
      },
      {
        courseName: "Course 1 course1",
        quizName: "Quiz 2",
        deadline: new Date("2023-05-31T23:59:59Z"),
      },
      {
        courseName: "Course 2 course2",
        quizName: "Quiz 3",
        deadline: new Date("2023-05-15T23:59:59Z"),
      },
    ]);
  });

  it("should throw an error if there is an error fetching the quiz deadlines", async () => {
    // Set up mock functions to throw an error
    const error = new Error("Failed to fetch quiz deadlines");
    getUserRole.mockRejectedValueOnce(error);

    // Call the function and wait for it to complete
    await expect(getAllQuizDeadlines()).rejects.toThrowError(
      `Error getting all quiz deadlines: ${error}`
    );

    // Assert that the mock functions were called with the correct arguments
    expect(getUserRole).toHaveBeenCalled();
    expect(getUserCourses).not.toHaveBeenCalled();
    expect(fetchQuizzes).not.toHaveBeenCalled();
  });
});

describe("getAssignmentsWithDueDates", () => {
  beforeEach(() => {
    // Reset mock functions before each test
    jest.clearAllMocks();
  });

  it("should return an array of assignment due dates", async () => {
    // Mock functions to return expected values
    const role = "student";
    const courses = [
      {
        courseId: "course1",
        courseTitle: "Course 1",
        databaseId: "course1-db",
      },
      {
        courseId: "course2",
        courseTitle: "Course 2",
        databaseId: "course2-db",
      },
    ];
    const assignmentsByCourse = {
      "course1-db": [
        {
          title: "Assignment 1",
          dueDate: { toDate: jest.fn(() => new Date(2023, 3, 25)) },
        },
        {
          title: "Assignment 2",
          dueDate: { toDate: jest.fn(() => new Date(2023, 4, 5)) },
        },
      ],
      "course2-db": [
        {
          title: "Assignment 3",
          dueDate: { toDate: jest.fn(() => new Date(2023, 4, 1)) },
        },
      ],
    };

    getUserRole.mockResolvedValueOnce(role);
    getUserCourses.mockResolvedValueOnce(courses);
    getAssigmentsByCourse.mockImplementation(
      (courseId) => assignmentsByCourse[courseId]
    );

    // Call the function and wait for it to complete
    const result = await getAssignmentsWithDueDates();

    // Assert that mock functions were called with the correct arguments
    expect(getUserRole).toHaveBeenCalled();
    expect(getUserCourses).toHaveBeenCalledWith(role);
    expect(getAssigmentsByCourse).toHaveBeenCalledWith("course1-db");
    expect(getAssigmentsByCourse).toHaveBeenCalledWith("course2-db");

    // Assert that the function returned the correct result
    expect(result).toEqual([
      {
        courseName: "Course 1 course1",
        assignmentTitle: "Assignment 1",
        dueDate: new Date(2023, 3, 25),
      },
      {
        courseName: "Course 2 course2",
        assignmentTitle: "Assignment 3",
        dueDate: new Date(2023, 4, 1),
      },
      {
        courseName: "Course 1 course1",
        assignmentTitle: "Assignment 2",
        dueDate: new Date(2023, 4, 5),
      },
    ]);
  });

  it("should throw an error if there is an error fetching the assignment due dates", async () => {
    // Mock functions to throw an error
    const error = new Error("Failed to fetch assignment due dates");
    getUserRole.mockRejectedValueOnce(error);

    // Call the function and wait for it to complete
    await expect(getAssignmentsWithDueDates()).rejects.toThrowError(
      "Error fetching assignment due dates:" + error
    );

    // Assert that the mock functions were called with the correct arguments
    expect(getUserRole).toHaveBeenCalled();
    expect(getUserCourses).not.toHaveBeenCalled();
    expect(getAssigmentsByCourse).not.toHaveBeenCalled();
  });
});
