import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
} from "@firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "./firebase";

/**
 * Creates a new user with an email address and password, adds a custom claim to indicate their role,
 * and creates a new document for them in the appropriate collection in Firestore.
 *
 * @param {string} email - The email address of the user to create.
 * @param {string} password - The password of the user to create.
 * @param {string} firstName - The first name of the user to create.
 * @param {string} lastName - The last name of the user to create.
 * @param {string} role - The role of the user to create (either "student" or "instructor").
 * @throws {Error} - If there was an error creating the user or creating the appropriate document.
 */
export async function createUser(email, password, firstName, lastName, role) {
  const auth = getAuth();

  // create user with email and password
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        throw new Error("Email already in use");
      case "auth/invalid-email":
        throw new Error("Invalid email format");
      case "auth/weak-password":
        throw new Error("Password too weak");
      default:
        throw new Error(`Error creating user: ${error.code}`);
    }
  });
  const user = userCredential.user;

  // set display name for user
  const displayName = firstName + " " + lastName;
  await updateProfile(user, { displayName: displayName });

  // create document for user in the appropriate collection
  const userRef = doc(firestore, role + "s", user.uid);
  if (role === "instructor") {
    await setDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      preferredName: "",
      courses: [],
      accepted: false,
    });
  } else {
    await setDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      preferredName: "",
      courses: [],
    });
  }
}

/**
 * Authenticates a user with an email address and password and stores an access token in local storage.
 *
 * @param {string} email - The email address of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @param {string} role - The role that the user should have in order to be authenticated.
 * @returns {boolean} - True if the user is authenticated successfully.
 * @throws {Error} - If there was an error during authentication, or if the authenticated user has an invalid role.
 */
export async function loginUser(email, password) {
  await getUserRoleByEmail(email).then(async (role) => {
    if (role === "instructor") {
      await isAcceptedInstructor(email).then((accepted) => {
        if (!accepted) {
          throw new Error(`Please wait for Instructor account approval`);
        }
      });
    }
  });
  try {
    // sign in user with the provided credentials
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      switch (error.code) {
        case "auth/user-not-found": // Handle both together for security
        case "auth/wrong-password":
          throw new Error("Incorrect email or password");
        case "auth/too-many-requests":
          throw new Error(
            "Too many attempts. Please reset password or try again later."
          );
        default:
          throw new Error(`Error logging in: ${error.code}`);
      }
    });
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Checks if the current logged in user has a document in the students or instructors collection.
 * Returns the role accordingly.
 *
 * @returns {Promise<string|boolean>} - A Promise that resolves to a string ("student" or "instructor") if the user is found, or false if not found.
 * @throws {Error} - If there was an error retrieving data from Firestore.
 */
export async function getUserRole() {
  const user = auth.currentUser;
  const studentRef = collection(firestore, "students");
  const instructorRef = collection(firestore, "instructors");

  try {
    const studentDoc = await getDoc(doc(studentRef, user.uid));
    if (studentDoc.exists()) {
      return "student";
    }

    const instructorDoc = await getDoc(doc(instructorRef, user.uid));
    if (instructorDoc.exists()) {
      return "instructor";
    }

    return false;
  } catch (error) {
    throw new Error(`Error checking user role: ${error.message}`);
  }
}

/**
 * Checks if the user with the specified email has a document in the students or instructors collection.
 * Returns the role accordingly.
 *
 * @param {string} email - The email of the user to check.
 * @returns {Promise<string>} - A Promise that resolves to a string ("student" or "instructor") if the user is found, or false if not found.
 * @throws {Error} - If there was an error retrieving data from Firestore.
 */
export async function getUserRoleByEmail(email) {
  const instructorsRef = collection(firestore, "instructors");
  const instQuery = query(instructorsRef, where("email", "==", email));

  const studentsRef = collection(firestore, "students");
  const studQuery = query(studentsRef, where("email", "==", email));

  try {
    const instSnapshot = await getDocs(instQuery);
    if (instSnapshot.docs.length > 0) return "instructor";

    const studSnapshot = await getDocs(studQuery);
    if (studSnapshot.docs.length > 0) return "student";
  } catch (error) {
    throw new Error(`Error checking user role: ${error.message}`);
  }
}

/**
 * Signs out the currently logged-in user from Firebase Authentication.
 *
 * @throws {Error} - If there was an error signing out the user.
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out user:", error);
    throw error;
  }
}

/**
 * Retrieves the ID of the currently logged-in user from Firebase Authentication.
 *
 * @returns {string|null} - The ID of the currently logged-in user, or null if no user is logged in.
 */
export function getLoggedInUserId() {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  return user.uid;
}

/**
 * Retrieves user information from the Firestore database by their email
 *
 * @param {string} email - The email of the user to retrieve
 * @returns {Promise<Object>} - A promise that resolves to the user fields object, or null if not found
 * @throws {Error} Throws an error if there is an issue finding the user doc in the database
 */
export async function getUserByEmail(email) {
  const instructorsRef = collection(firestore, "instructors");
  const q1 = query(instructorsRef, where("email", "==", email));

  const studentsRef = collection(firestore, "students");
  const q2 = query(studentsRef, where("email", "==", email));

  try {
    const querySnapshot1 = await getDocs(q1);
    const instructorDoc = querySnapshot1.docs[0];
    if (instructorDoc) return instructorDoc.data();

    const querySnapshot2 = await getDocs(q2);
    const studentDoc = querySnapshot2.docs[0];
    if (studentDoc) return studentDoc.data();

    return null;
  } catch (error) {
    throw new Error(`Error finding user doc in DB: ${error.message}`);
  }
}

/**
 * Retrieves the currently logged in user's information from Firestore
 *
 * @returns {boolean|Object} Returns the user's document if found, false otherwise
 * @throws {Error} Throws an error if there is an issue finding the user doc in the database
 */
export async function getCurrentUser() {
  const user = auth.currentUser;
  const studentRef = collection(firestore, "students");
  const instructorRef = collection(firestore, "instructors");

  try {
    const instructorDoc = await getDoc(doc(instructorRef, user.uid));
    if (instructorDoc.exists()) {
      return instructorDoc.data();
    }

    const studentDoc = await getDoc(doc(studentRef, user.uid));
    if (studentDoc.exists()) {
      return studentDoc.data();
    }

    return false;
  } catch (error) {
    throw new Error(`Error finding user doc in DB: ${error.message}`);
  }
}

/**
 * Deletes the currently logged in user from Firebase Authentication.
 * Works, but not needed for anything right now.
 *
 * @throws {Error} - If there was an error deleting the user.
 */
export async function delCurrentUser() {
  try {
    await deleteUser(auth.currentUser);
    console.log("User deleted successfully");
  } catch (error) {
    console.log("Error deleting user:", error);
    throw error;
  }
}

/**
 * Verifies if an email is of the format [username]@[university].edu
 *
 * @param {string} email - The email to verify
 * @returns {boolean} - Returns true if the email is of the correct format, false otherwise.
 */

export function verifyEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const universityRegex = /@[a-zA-Z0-9.-]+\.(edu)$/;

  if (!emailRegex.test(email)) {
    return false; // Email does not match standard email format
  }

  if (!universityRegex.test(email)) {
    return false; // Email domain is not a valid university domain
  }

  return true;
}

/**
 * Checks if the user with the specified email is an approved instructor
 *
 * @param {string} email - The email of the user to check.
 * @returns {Promise<boolean>|string} - A promise that resolves to true if the user is an accepted instructor,
 * false otherwise.
 * @throws {Error} - If there was an error querying the Firestore database.
 */
async function isAcceptedInstructor(email) {
  const instructorsRef = collection(firestore, "instructors");
  const querySnapshot = await getDocs(
    query(instructorsRef, where("email", "==", email))
  );
  const docs = querySnapshot.docs;

  if (docs.length === 0) {
    return "none"; // no instructor with this email exists
  }

  const instructorDoc = docs[0];
  const data = instructorDoc.data();

  if (data.accepted !== true) {
    return false; // instructor's accepted field is not true
  }

  return true; // instructor exists and accepted field is true
}

/**
 * Updates the user's first and last name in Firestore
 *
 * @param {string} firstName - The user's first name
 * @param {string} lastName - The user's last name
 * @throws {Error} Throws an error if there is an issue updating the user's profile in the database
 */
export async function updateUserProfile(firstName, lastName) {
  try {
    const role = await getUserRole();
    const userRef = doc(firestore, role + "s", getLoggedInUserId());
    await setDoc(userRef, { firstName, lastName }, { merge: true });
    console.log("User profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
