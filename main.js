import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

//Log In Functions

let singOutForm = document.getElementById("sing-out-form");
singOutForm.style.display = "none";

let signInForm = document.getElementById("sign-in-form");

let buttonSignIn = document.getElementById("sign-in-button");
buttonSignIn.addEventListener("click", (e) => logIn(e));

let buttonSingOut = document.getElementById("sign-out-button");
buttonSingOut.addEventListener("click", (e) => logOut(e));

function logIn(e) {
  e.preventDefault();
  let user = [{ email: "" }, { password: "" }];

  user.email = document.getElementById("loginName")?.value;
  user.password = document.getElementById("loginPassword")?.value;

  singInUser(user.email, user.password);
}

function logOut(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("Log Out succesfully");
      signInForm.style.display = "block";
      singOutForm.style.display = "none";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

let buttonRegister = document.getElementById("register-button");
buttonRegister.addEventListener("click", (e) => register(e));

function register(e) {
  e.preventDefault();
  let user = [{ email: "" }, { password: "" }];

  user.email = document.getElementById("registerEmail")?.value;
  user.password = document.getElementById("registerPassword")?.value;

  //Call firebase function
  newUser(user.email, user.password);
}

//FIREBASE FUNCTIONS

//Firebase register

function newUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

//Firebase Log In

function singInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      console.log("Log in succesfull");
      checkUserStatus(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Log in error");
    });
}

//Firebase Check user status

function checkUserStatus(user) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      signInForm.style.display = "none";
      singOutForm.style.display = "block";
      const uid = user.uid;
      // ...
    } else {
      // ...
    }
  });
}
