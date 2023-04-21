import {getDoc, } from 'firebase/firestore';
import { firestore } from 'firebase/app';
import { getAssignmentById } from '../Backend/assigment';
import { getUserIdByEmail } from '../Backend/user';

// Mock the necessary dependencies
jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  firestore: jest.fn(),
}));

export async function getBookmarkedAssignments(role, courseDocId)  {
  try {
    const assignments = [];
    const bookmarks = [];

    const ref = await getDoc(doc(firestore, "courses", courseDocId));
 
    console.log(ref);
    const coursesData = ref.data().assignments;
        await Promise.all(
          coursesData.map(async (assignment) => {
            const assignDocId = assignment.path.split("/")[1].trim();
            const res = await getAssignmentById(assignDocId);
            if (res) assignments.push(res);
          })
        );

        const userId = await getUserIdByEmail(auth.currentUser.email);
        let userDoc = await getDoc(doc(firestore, "students", userId));
          if (role === "instructor") {
            userDoc = await getDoc(doc(firestore, "instructors", userId));
          }

    const userBookmarks = userDoc.data().bookmarks;

    console.log(userBookmarks);
    
    await Promise.all(
      assignments.map(async (assignment) => {
        console.log(assignment.id);
        if (userBookmarks.includes(assignment.id)) bookmarks.push(assignment);
      })
    );

    console.log("All assignments fetched:", bookmarks);
    return bookmarks;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching bookmarks:", error);
  }
};

describe('getBookmarkedAssignments', () => {
  // mock the necessary functions
  const mockGetDoc = jest.fn();
  const mockGetAssignmentById = jest.fn();
  const mockGetUserIdByEmail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of bookmarked assignments', async () => {
    // mock the firestore documents
    const courseDocId = 'test-course-id';
    const assignmentsData = [      { path: `courses/${courseDocId}/assignments/1` },      { path: `courses/${courseDocId}/assignments/2` },      { path: `courses/${courseDocId}/assignments/3` },    ];
    const userDocData = {
      bookmarks: ['2', '3'],
    };

    // mock the firestore queries
    mockGetDoc.mockResolvedValueOnce({
      data: () => ({ assignments: assignmentsData }),
    });
    mockGetAssignmentById.mockImplementation(async (assignDocId) => {
      if (assignDocId === '1') {
        return null; // simulate a missing assignment
      }
      return { id: assignDocId }; // simulate a valid assignment
    });
    mockGetUserIdByEmail.mockResolvedValueOnce('test-user-id');
    mockGetDoc.mockResolvedValueOnce({
      data: () => userDocData,
    });

    // invoke the function and assert the results
    const bookmarks = await getBookmarkedAssignments('student', courseDocId);
    expect(mockGetDoc).toHaveBeenCalledTimes(2);
    expect(mockGetDoc).toHaveBeenCalledWith(expect.anything(), 'courses/test-course-id');
    expect(mockGetDoc).toHaveBeenCalledWith(expect.anything(), 'students/test-user-id');
    expect(mockGetAssignmentById).toHaveBeenCalledTimes(3);
    expect(mockGetAssignmentById).toHaveBeenCalledWith('1');
    expect(mockGetAssignmentById).toHaveBeenCalledWith('2');
    expect(mockGetAssignmentById).toHaveBeenCalledWith('3');
    expect(mockGetUserIdByEmail).toHaveBeenCalledTimes(1);
    expect(mockGetUserIdByEmail).toHaveBeenCalledWith(expect.any(String));
    expect(bookmarks).toEqual([{ id: '2' }, { id: '3' }]);
  });

  it('should handle errors and throw an error', async () => {
    // mock the firestore queries to throw an error
    mockGetDoc.mockRejectedValueOnce(new Error('Firestore error'));

    // invoke the function and assert the error
    await expect(getBookmarkedAssignments('student', 'test-course-id')).rejects.toThrow(
      'Error fetching bookmarks:'
    );
    expect(mockGetDoc).toHaveBeenCalledTimes(1);
    expect(mockGetDoc).toHaveBeenCalledWith(expect.anything(), 'courses/test-course-id');
  });
});
