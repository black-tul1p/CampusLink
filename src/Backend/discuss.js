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
        topic: doc.data().topic,
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
      topic: discussion.topic,
    };

    console.log(newBoard);

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
        reply,
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

export const createTopic = async (topicName, courseId) => {
  try {
    const newTopic = {
      name: topicName,
      courseId: courseId,
      discussions: [],
    };

    const docRef = await addDoc(collection(firestore, "topics"), newTopic);

    return { id: docRef.id, ...newTopic };
  } catch (error) {
    throw new Error("Error creating topic: ", error);
  }
};

export const getCourseTopics = async (courseId) => {
  try {
    const topicsRef = collection(firestore, "topics");
    const q = query(topicsRef, where("courseId", "==", courseId));

    const querySnapshot = await getDocs(q);
    const topicsData = [];
    querySnapshot.forEach((doc) =>
      topicsData.push({ id: doc.id, ...doc.data() })
    );

    return topicsData;
  } catch (error) {
    throw new Error("Error fetching topics for course", error);
  }
};

export const updateTopicName = async (topicId, newName) => {
  try {
    const topicRef = doc(firestore, "topics", topicId);

    await updateDoc(topicRef, {
      name: newName
    });

    return "Topic name successfully updated!";
  } catch (error) {
    throw new Error("Failed to update topic name");
  }
};

export const getEnrolledStudents = async (courseId) => {
  try {
    const courseRef = doc(firestore, "courses", courseId);
    const courseSnapshot = await getDoc(courseRef);

    if (courseSnapshot.exists()) {
      const enrolledStudents = courseSnapshot.data().enrolledStudents;
      const studentsData = [];

      for (const studentPath of enrolledStudents) {
        const studentRef = doc(firestore, studentPath);
        const studentSnapshot = await getDoc(studentRef);
        studentsData.push({ id: studentSnapshot.id, ...studentSnapshot.data() });
      }

      return studentsData;
    } else {
      throw new Error("Course does not exist.");
    }
  } catch (error) {
    console.error("Error fetching enrolled students: ", error);
    throw error;
  }
};

export const updateDiscussionPrivacy = async (discussionId, newValue) => {
  try {
    const discussionRef = doc(firestore, "discussions", discussionId);
    await updateDoc(discussionRef, {
      privacy: newValue,
    });
    return "Discussion privacy successfully updated!";
  } catch (error) {
    throw new Error("Failed to update discussion privacy:", error);
  }
};

export const sendUpdateEmail = async (discussionId) => {
  try {
    const discussionRef = doc(firestore, "discussions", discussionId);
    const discussionSnapshot = await getDoc(discussionRef);
    const replyList = discussionSnapshot.data().replies;
    const postStudents = collection(firestore, "students");
    const studentQuerySnapshot = await getDocs(postStudents);
    let emailList = "mailto:";
    for (let i = 0; i < replyList.length; i++) {
      let stdnt = doc(studentQuerySnapshot, replyList[i].creator_id);
      const email = stdnt.data().email;
      if (emailList.includes(email)) {
        console.log("Duplicate ID");
        continue;
      }
      if (i === 0) {
        emailList = emailList + email;
      } else {
        emailList = emailList + ";" + email;
      }      
    }
    console.log(emailList);
  } catch (error) {
    console.error("Error sending update email: ", error);
    throw error;
  }
};