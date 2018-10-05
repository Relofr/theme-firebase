import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDzuPDm7vA4v7SqXoxJBkV5E2Fwx-2i1lQ",
  authDomain: "theme-team.firebaseapp.com",
  databaseURL: "https://theme-team.firebaseio.com",
  projectId: "theme-team",
  storageBucket: "theme-team.appspot.com",
  messagingSenderId: "756033452517"
};

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore