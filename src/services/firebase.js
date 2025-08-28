// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { collection, getFirestore, query, getDocs, addDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBeFwKOZCREd3_WdpLSjrRUXJr6i2b1E0I',
  authDomain: 'progetto-vue-liliana.firebaseapp.com',
  projectId: 'progetto-vue-liliana',
  storageBucket: 'progetto-vue-liliana.firebasestorage.app',
  messagingSenderId: '27333270917',
  appId: '1:27333270917:web:c91d4fbd159bd5d251b8ec',
  measurementId: 'G-ERTEEG3ME1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default {
  addComment: function (user, email, message) {
    let newComment = {
      user: user,
      email: email,
      message: message,
    }
    return addDoc(collection(db, 'comments'), newComment)
  },
  getComments: function () {
    const q = query(collection(db, 'comments'))
    return getDocs(q)
  },
}
