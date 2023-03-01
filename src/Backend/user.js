import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "./firebase";

// const admin = require("firebase-admin");

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
  // create user with email and password
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    console.error(error);
    throw new Error("Error creating user");
  });
  const user = userCredential.user;

  // // set custom claim to indicate role as student
  // await getAuth()
  //   .setCustomUserClaims(user.uid, { role: role })
  //   .catch((error) => {
  //     throw new Error(error);
  //   });

  // create document for student in the appropriate collection
  const userRef = doc(firestore, role.toLowerCase() + "s", user.uid);
  await setDoc(userRef, {
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
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
  try {
    // sign in user with the provided credentials
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // JWT
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Retrieves the role of the current authenticated user from Firebase Authentication.
 *
 * @returns {Promise<string>} The role of the user.
 * @throws {Error} If there is an error retrieving the role.
 */
export async function getUserRole() {
  try {
    // retrieve and return role
    const userClaims = await auth.currentUser.getIdTokenResult();
    return userClaims.claims.role;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Signs out the currently logged-in user from Firebase Authentication.
 *
 * @throws {Error} - If there was an error signing out the user.
 */
export async function signOutUser() {
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
 * Retrieves the ID of a student by their email address from the Firestore database.
 *
 * @param {string} email - Email address of the student to retrieve the ID for.
 * @returns {string|null} - The ID of the student, or null if no student was found with the given email address.
 */
export async function getUserIdByEmail(email) {
  const studentsRef = collection(firestore, "students");
  const q = query(studentsRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) {
    console.log("No student found with email: ", email);
    return null;
  }

  const studentId = querySnapshot.docs[0].id;
  console.log("Found a student with ID: ", studentId);
  return studentId;
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
