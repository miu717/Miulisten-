import { auth } from "./firebase-config.js";
import {
  addView,
  likeAudio,
  addComment,
  listenComments,
} from "./db.js";

// 🔊 Play Audio with Preview/Full Access
export function playAudio(audio, isPaid = false, isUnlocked = false) {
  const audioPlayer = new Audio(audio.url);
  audioPlayer.play();
  addView(audio.id);

  if (isPaid && !isUnlocked) {
    setTimeout(() => {
      audioPlayer.pause();
      alert("⛔ This is a paid audio. Unlock to continue listening.");
    }, 5000); // 5-second preview
  }
}

// ❤️ Like Button Clicked
export function handleLike(audioId) {
  likeAudio(audioId);
  alert("Thanks for liking ❤️");
}

// 💬 Submit Comment
export function submitComment(audioId, commentText) {
  if (!commentText.trim()) return;
  addComment(audioId, commentText);
}

// 💬 Load Real-Time Comments
export function showComments(audioId, containerId) {
  listenComments(audioId, (comments) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    if (comments) {
      Object.values(comments).forEach((c) => {
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `<strong>${c.user}</strong>: ${c.comment}`;
        container.appendChild(div);
      });
    }
  });
}

// 🔓 Unlock Audio (fake logic here, real Razorpay/payment later)
export function unlockAudio(audioId) {
  alert("🎉 Audio unlocked successfully! Now you can listen full.");
  localStorage.setItem(`unlocked_${audioId}`, "true");
  location.reload();
}

// ✅ Check If Audio is Unlocked
export function isAudioUnlocked(audioId) {
  return localStorage.getItem(`unlocked_${audioId}`) === "true";
}
