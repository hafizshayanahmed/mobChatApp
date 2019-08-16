import * as firebase from "firebase"
import "firebase/firestore"
import * as Facebook from 'expo-facebook';

var firebaseConfig = {
    apiKey: "AIzaSyBIfUQYZg7r-Rd4d7d4X0_S582we0BdMwc",
    authDomain: "chatrooms-3df34.firebaseapp.com",
    databaseURL: "https://chatrooms-3df34.firebaseio.com",
    projectId: "chatrooms-3df34",
    storageBucket: "chatrooms-3df34.appspot.com",
    messagingSenderId: "613351789094",
    appId: "1:613351789094:web:d582d9bc400e7f07"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

async function logIn() {
    try {
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync("334881447238473", {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            return auth.signInWithCredential(credential)
                .then((result) => {
                    let currentUser = firebase.auth().currentUser;
                    db.collection("users").doc(currentUser.uid).set({ email: result.user.email, createdAt: Date.now(), username: result.user.displayName, photo: result.user.photoURL, uid: currentUser.uid }).then(() => {
                        resolve({ message: "Registration successfully" })
                    })
                        .catch((e) => {
                            reject(e)
                        })
                })
                .catch((error) => {
                    alert(error.message)
                });
        } else {
            type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
}

function register(email, password, username) {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password).then(user => {
            db.collection("users").doc(user.user.uid).set({ email, createdAt: Date.now(), username }).then(() => {
                resolve({ message: "Registration successfully" })
            })
                .catch((e) => {
                    reject(e)
                })
        })
            .catch((e) => {
                reject(e)
            })
    })
}

function getAllUsers() {
    const arr = []
    return new Promise((resolve, reject) => {
        db.collection("users").get().then((e) => {
            e.forEach((elem) => {
                arr.push({
                    data: elem.data(),
                    _id: elem.id
                })
            })
            resolve(arr)
        })
    })
}

function getStory() {
    let mystr = []
    return new Promise((resolve, reject) => {
        db.collection("story").get().then((e) => {
            e.forEach((elem) => {
                mystr.push(elem.data())
            })
            resolve(mystr)
        })
    })
}

function addStory(e, name) {
    let currentUser = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
        db.collection("story").doc(currentUser.uid).set({ story: e, createdAt: Date.now(), uid: currentUser.uid, username: name }).then(() => {
            resolve({ message: "Story added" })
        })
            .catch((e) => {
                reject(e)
            })
    })
}

function createRoom(friendId) {
    const userId = firebase.auth().currentUser.uid
    let chatExists = false;

    return new Promise((resolve, reject) => {
        db.collection('chatrooms')
            .where('users.' + userId, '==', true)
            .where('users.' + friendId, '==', true).get().then(snapshot => {
                snapshot.forEach(elem => {
                    chatExists = { data: elem.data(), _id: elem.id };
                })
                if (!chatExists) {
                    const obj = {
                        createdAt: Date.now(),
                        users: {
                            [friendId]: true,
                            [firebase.auth().currentUser.uid]: true
                        }
                    }
                    db.collection('chatrooms').add(obj).then(snapshot => {
                        resolve({ data: obj, _id: snapshot.id }) 
                    })
                } else {
                    resolve(chatExists);
                }
            })
    })
}

function getMyUid() {
    let currentUser = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
        db.collection("users").doc(currentUser.uid).get().then((e) => {
            resolve(e.data())
        })
            .catch((e) => {
                reject(e)
            })
    })
}

function sendMessageToDb(message, roomId) {
    const obj = {
        message,
        userId: firebase.auth().currentUser.uid,
        timestamp: Date.now()
    }
    db.collection("chatrooms").doc(roomId).collection("messages").add(obj);
}

function deleteStoryFromDatabase(){
    return new Promise((resolve, reject) => {
        db.collection("story").doc(firebase.auth().currentUser.uid).delete().then((e) => {
            resolve({ message: "Story has been deleted" })
        })
            .catch((e) => {
                reject(e)
            })
    })
}

export {
    firebase,
    login,
    register,
    getAllUsers,
    createRoom,
    sendMessageToDb,
    logIn,
    getStory,
    addStory,
    getMyUid,
    deleteStoryFromDatabase,
}