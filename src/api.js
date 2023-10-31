
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    updateDoc
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyB8dfLuNe_rJl-uYIc7JONZdgmhdbgOiJc",
  authDomain: "vans-978fe.firebaseapp.com",
  projectId: "vans-978fe",
  storageBucket: "vans-978fe.appspot.com",
  messagingSenderId: "971844573766",
  appId: "1:971844573766:web:d4c4d560ef04a417d98847"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

 

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

export async function postVan(vanData) {
    await setDoc(doc(db, "vans", vanData.id), vanData);
}

export async function delVan(vanId) {
    await deleteDoc(doc(db, "vans", vanId));
}

export async function priceVan(van) {
    const { id, price } = van
    const priceDoc = doc(db, "vans", id);
    await updateDoc(priceDoc, {
        price: price
    })
    
}







