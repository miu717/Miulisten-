// ✅ Import Firebase Auth
import { auth } from "./firebase-config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ✅ Google Login
export function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert("Welcome " + user.displayName);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Google login failed");
      console.error(error);
    });
}

// ✅ Email Signup
export function emailSignup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup Successful");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// ✅ Email Login
export function emailLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Successful");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// ✅ Logout
export function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged Out");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Logout Failed");
    });
}

// ✅ Auto Redirect if Not Logged In
onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;
  const loginPage = currentPage.includes("login.html");

  if (!user && !loginPage) {
    window.location.href = "login.html";
  }
});
