
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './types';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  complaints: { id: string; name: string; message: string; date: string }[];
  addComplaint: (name: string, message: string) => Promise<void>;
  removeComplaint: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [complaints, setComplaints] = useState<{ id: string; name: string; message: string; date: string }[]>([]);

  useEffect(() => {
    // جلب المنتجات بشكل لحظي من كولكشن products
    const qProducts = query(collection(db, 'products'), orderBy('brand', 'asc'));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    });

    // جلب الشكاوى بشكل لحظي من كولكشن complaints
    const qComplaints = query(collection(db, 'complaints'), orderBy('date', 'desc'));
    const unsubscribeComplaints = onSnapshot(qComplaints, (snapshot) => {
      const complaintsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      setComplaints(complaintsData);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeComplaints();
    };
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, 'products'), product);
    } catch (e) {
      console.error("Error adding product: ", e);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.error("Error removing product: ", e);
    }
  };

  const addComplaint = async (name: string, message: string) => {
    const newComplaint = {
      name,
      message,
      date: new Date().toISOString()
    };
    try {
      await addDoc(collection(db, 'complaints'), newComplaint);
    } catch (e) {
      console.error("Error adding complaint: ", e);
    }
  };

  const removeComplaint = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'complaints', id));
    } catch (e) {
      console.error("Error removing complaint: ", e);
    }
  };

  return (
    <StoreContext.Provider value={{ products, addProduct, removeProduct, complaints, addComplaint, removeComplaint }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
