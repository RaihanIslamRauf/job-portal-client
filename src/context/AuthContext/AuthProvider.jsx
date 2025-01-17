import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';


const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();
    
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('state captured', currentUser)
            setLoading(false);
        })
        return () =>{
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser, 
        signOutUser,
        signInWithGoogle
    }

    return (
      <AuthContext.Provider value={authInfo}>
          {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;