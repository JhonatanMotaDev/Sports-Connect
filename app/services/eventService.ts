// services/eventService.ts
import { db } from "config/firebaseConfig"; // "../config" se services e config estiverem no mesmo nível
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const eventsCollection = collection(db, "events");

export async function getEvents() {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createEvent(event: { title: string; location: string; description: string }) {
  return await addDoc(eventsCollection, event);
}

export async function deleteEvent(id: string) {
  const docRef = doc(db, "events", id);
  return await deleteDoc(docRef);
}