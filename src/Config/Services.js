import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "./Firebase";

// Creating new User
const createUser = async (payload) => {
  const { email, password, gender, weight, height, firstName, lastName, dob } =
    payload;

  try {
    const { user: cred } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = {
      firstName,
      lastName,
      gender,
      weight,
      height,
      email,
      uid: cred.uid,
      dob,
      avatarUrl:
        "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
    };
    const response = await AddData("users", newUser.uid, newUser);
    const date = new Date().getTime();
    const heightInMeter = newUser?.height / 100;
    const BMI = newUser?.weight / (heightInMeter * heightInMeter);
    const obj = {
      BMI: [{ value: Math.round(BMI), date }],
      calories: [{ value: 0, date }],
      protein: [{ value: 0, date }],
      weight: [{ value: newUser?.weight, date }],
    };
    const res2 = await AddData("graphdata", newUser.uid, obj);
    return { user: response, graphData: res2 };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage);
  }
};

// Sign in User
const signInUser = async (payload) => {
  const { email, password } = payload;
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const response = await getData("users", user.uid);
    const response2 = await getData("graphdata", user.uid);
    return { user: response, graphData: response2 };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage);
  }
};

// Adding New Data to the firebase
const AddData = async (collection, document, data) => {
  await setDoc(doc(db, collection, document), data);
  return data;
};

// Updating User Information
const updateUser = async (collection, document, user) => {
  const reference = doc(db, collection, document);
  await updateDoc(reference, {
    ...user,
  });

  return user;
};

// Update the Nested Data
const updateNestedData = async (collection, document, field, data) => {
  const reference = doc(db, collection, document);

  // Atomically add a new region to the "regions" array field.
  await updateDoc(reference, {
    [field]: arrayUnion(data),
  });

  return data;
};

const getData = async (collection, document) => {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};
// get all data from the collection
const getAllData = async (collectionName) => {
  return await getDocs(collection(db, collectionName));
};
// Password Reset
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};
export {
  createUser,
  signInUser,
  AddData,
  getData,
  updateUser,
  updateNestedData,
  sendPasswordReset,
  getAllData,
};
