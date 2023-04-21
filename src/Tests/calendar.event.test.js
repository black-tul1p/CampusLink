import { addDoc, deleteDoc, collection } from 'firebase/firestore';
import { firestore } from 'firebase/app';

// Mock the necessary dependencies
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  firestore: jest.fn(),
}));

// Functions to test
async function createEvent(courseId, date, title, description) {
  try {
    const eventCollection = collection(
      firestore,
      "courses",
      courseId,
      "calendarEvents"
    );
    const event = {
      date: date,
      title: title,
      description: description
    }
    const doc = await addDoc(eventCollection, event);
    return doc.id;
  } catch (error) {
    throw new Error("Error adding event:", error);
  }
}

async function removeEvent(courseId, eventId) {
  try {
    await deleteDoc(
      doc(collection(firestore, "courses", courseId, "calendarEvents"), eventId)
    );
  } catch (error) {
    throw new Error("Error removing event:", error);
  }
}

// Test calendar event creation
describe('createEvent', () => {
  // Define test case for successful event creation
  test('should create an event and return the doc id', async () => {
    // Mock Firestore collection and addDoc methods
    collection.mockReturnValueOnce('eventCollection');
    addDoc.mockReturnValueOnce({ id: 'eventId' });

    // Call the createEvent function
    const result = await createEvent('courseId', 'date', 'title', 'description');

    // Assert the result
    expect(result).toEqual('eventId');
    expect(collection).toHaveBeenCalledWith(firestore, 'courses', 'courseId', 'calendarEvents');
    expect(addDoc).toHaveBeenCalledWith('eventCollection', { date: 'date', title: 'title', description: 'description' });
  });

  // Define test case for error during event creation
  test('should throw an error when event creation fails', async () => {
    // Mock Firestore collection and addDoc methods to throw an error
    collection.mockReturnValueOnce('eventCollection');
    addDoc.mockRejectedValueOnce('error');

    // Call the createEvent function and expect it to throw an error
    await expect(createEvent('courseId', 'date', 'title', 'description')).rejects.toThrow('Error adding event:');
    expect(collection).toHaveBeenCalledWith(firestore, 'courses', 'courseId', 'calendarEvents');
    expect(addDoc).toHaveBeenCalledWith('eventCollection', { date: 'date', title: 'title', description: 'description' });
  });
});

// Test calendar event deletion
describe('removeEvent', () => {
  test('deleteDoc should not be called with invalid arguments', async () => {
    // Mock the deleteDoc function
    deleteDoc.mockImplementationOnce(() => Promise.resolve());

    // Define the input parameters to be invalid, expect removeEvent to throw error
    const courseId = 'courseId';
    const eventId = 'eventId';

    // Call the removeEvent function and expect it to throw an error
    try {
    await removeEvent(courseId, eventId);
    }catch (e) {
    }finally{
      expect(deleteDoc).not.toHaveBeenCalled();
    }

    // Check that deleteDoc was called with correct arguments
  });
});