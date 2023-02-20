import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "./firebase";

export default function handleSubmitTest(info) {
  // Create Firebase collection
  const ref = collection(firestore, "test_data");

  // JSON for describing field for data storage
  let data = {
    info: info,
    testNum: Math.floor(Math.random() * 10000),
  };

  // Publish data to collection
  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
}
