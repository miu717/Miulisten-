// ✅ Firebase DB & Storage Access
import { db, rtdb, storage, auth } from "./firebase-config.js";
import {
  ref as rtdbRef,
  set,
  push,
  onValue,
  update,
  increment,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment as fsIncrement,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";


// 🎧 Upload Audio to Firebase
export async function uploadAudio(file, title, category, price = 0) {
  const user = auth.currentUser;
  if (!user) return alert("Login first!");

  const fileRef = storageRef(storage, `audios/${user.uid}/${file.name}`);
  const snap = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  const audioData = {
    title,
    category,
    url,
    userId: user.uid,
    price,
    likes: 0,
    views: 0,
    timestamp: Date.now(),
  };

  await addDoc(collection(db, "audios"), audioData);
  alert("Audio Uploaded!");
}

// 👁️ Increase View Count
export function addView(audioId) {
  const audioRef = doc(db, "audios", audioId);
  updateDoc(audioRef, {
    views: fsIncrement(1),
  });
}

// ❤️ Like Audio
export function likeAudio(audioId) {
  const audioRef = doc(db, "audios", audioId);
  updateDoc(audioRef, {
    likes: fsIncrement(1),
  });
}

// 💬 Add Comment
export function addComment(audioId, comment) {
  const user = auth.currentUser;
  if (!user) return;

  const commentRef = rtdbRef(rtdb, `comments/${audioId}`);
  const newComment = push(commentRef);
  set(newComment, {
    user: user.displayName || user.email,
    comment,
    time: Date.now(),
  });
}

// 🧠 Get Real-Time Comments
export function listenComments(audioId, callback) {
  const commentRef = rtdbRef(rtdb, `comments/${audioId}`);
  onValue(commentRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// 📥 Get All Audios
export async function fetchAllAudios(callback) {
  const querySnap = await getDocs(collection(db, "audios"));
  const audioList = [];
  querySnap.forEach((doc) => {
    audioList.push({ id: doc.id, ...doc.data() });
  });
  callback(audioList);
}
