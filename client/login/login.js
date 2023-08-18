import React from 'react';
import styled from '@emotion/styled';
import { auth, provider, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, doc, getDocs, setDoc } from '@firebase/firestore';
import { storage } from '../firebase';
import './loginCss.css';

function Login() {
  const [user] = useAuthState(auth);

  const signIn = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(provider).catch((error) => alert(error.message));
    const uid = result.user.uid;
    const username = result.user.displayName;
    
    // Create a user document with the UID
    const userRef = db.collection('users').doc(uid);
    const userDoc = await getDocs(userRef);

    if (!userDoc.exists()){
      const imageFile = e.target.files[0];

      const storageRef = storage.ref();
      const imageRef = storageRef.child('menuImages/' + imageFile.name);
    }
  };

  return (
    <LoginContainer className='Container '>
      <LoginInnerContainer>
        {user ? (
          <div>
            <img src={user.photoURL} alt='Profile' className='pfp' />
            <button
              onClick={() => auth.signOut()}
              alt={user?.displayName}
              title='Click to sign out'
              className='Login'
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button className='Login' onClick={signIn}>
              Login/SignUp
            </button>
          </div>
        )}
      </LoginInnerContainer>
    </LoginContainer>
  );
}
export default Login;

const LoginContainer = styled.div`
  display: grid;
  justify-content: end;
  place-items: center;
  text-transform: lowercase;
`;

const LoginInnerContainer = styled.div``;
