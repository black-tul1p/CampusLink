import {
<<<<<<< HEAD
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
          throw new Error("Error creating user: ", error.code);
      }
    });
    const user = userCredential.user;
  
    // // set custom claim to indicate role as student
    // await auth.setCustomUserClaims(user.uid, { role: role });
  
    // create document for student in the appropriate collection
    const userRef = doc(firestore, role + "s", user.uid);
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
            throw new Error("Error logging in: ", error.code);
        }
      });
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
=======
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
        throw new Error("Error creating user: ", error.code);
    }
  });
  const user = userCredential.user;

  // // set custom claim to indicate role as student
  // await auth.setCustomUserClaims(user.uid, { role: role });

  // create document for student in the appropriate collection
  const userRef = doc(firestore, role + "s", user.uid);
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
          throw new Error("Error logging in: ", error.code);
      }
    });
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
<<<<<<< HEAD
>>>>>>> f4f9525 (Added backend  functionality to get user role)
=======

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
>>>>>>> c76f171 (Added error handling and email verification)
