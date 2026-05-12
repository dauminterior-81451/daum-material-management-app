import { useEffect, useState } from 'react';
import { collection, addDoc, doc, setDoc, deleteDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function useFirestoreCRUD(path: string) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const q = query(collection(db, path));
    const unsub = onSnapshot(q, snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [path]);

  const addItem = async (data = {}) => {
    await addDoc(collection(db, path), data);
  };
  const updateItem = async (id: string, data: any) => {
    await setDoc(doc(db, path, id), data, { merge: true });
  };
  const removeItem = async (id: string) => {
    await deleteDoc(doc(db, path, id));
  };

  return { items, addItem, updateItem, removeItem };
}
