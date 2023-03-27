import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
} from "@firebase/firestore";
import { auth, firestore } from "./firebase";

export const getAllDiscussions = async () => {
  try {
    const getData = collection(firestore, "discussions");
    const snapshot = await getDocs(getData);
    const discussions = [];
    snapshot.forEach((doc) => {
      discussions.push({
        title: doc.data().title,
        description: doc.data().description,
        privacy: doc.data().privacy,
        courseId: doc.data().courseId,
        courseTitle: doc.data().courseTitle,
        createdAt: doc.data().created_at,
        creatorId: doc.data().creator_id,
        creatorName: doc.data().creator_name,
        replies: doc.data().replies,
      });
    });
    return discussions;
  } catch (error) {
    throw new Error("Error fetching discussions:", error);
  }
};

export const getCourseDiscussions = async (courseID) => {
  try {
    const discussionsRef = collection(firestore, "discussions");
    const q = query(discussionsRef, where("courseId", "==", courseID));

    const querySnapshot = await getDocs(q);
    const discussionsData = [];
    querySnapshot.forEach((doc) =>
      discussionsData.push({ id: doc.id, ...doc.data() })
    );

    return discussionsData;
  } catch (error) {
    throw new Error("Error fetching discussions for course", error);
  }
};

export const createDiscussion = async (discussion, courseID) => {
  try {
    const newBoard = {
      ...discussion,
      courseId: courseID,
      createdAt: new Date(),
      creatorID: auth.currentUser.uid,
      creatorName: auth.currentUser.displayName,
      replies: [],
    };

    const docRef = await addDoc(collection(firestore, "discussions"), newBoard);

    const courseRef = doc(firestore, "courses", courseID);
    await updateDoc(courseRef, {
      discussions: arrayUnion(docRef.id),
    });

    return "Discussion board successfully created!";
  } catch (error) {
    throw new Error("Error creating discussion board: ", error);
  }
};

export const createReply = async (discussionId, reply) => {
  try {
    const discussionRef = doc(firestore, "discussions", discussionId);
    const discussionSnapshot = await getDoc(discussionRef);

    if (discussionSnapshot.exists()) {
      const replies = discussionSnapshot.data().replies;
      const newReply = {
        ...reply,
        created_at: new Date(),
        creator_id: auth.currentUser.uid,
        creator_name: auth.currentUser.displayName,
      };

      await updateDoc(discussionRef, {
        replies: [...replies, newReply],
      });

      return newReply;
    } else {
      throw new Error("Discussion does not exist.");
    }
  } catch (error) {
    console.error("Error creating reply: ", error);
    throw error;
  }
};

export const updateDiscussion = async (discussion) => {
  try {
    const discussionRef = doc(firestore, "discussions", discussion.id);

    await updateDoc(discussionRef, {
      title: discussion.title,
      description: discussion.description,
    });

    return "Discussion board successfully updated!";
  } catch (error) {
    throw new Error("Failed to update discussion");
  }
};
