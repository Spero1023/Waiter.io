import React from 'react';
import styled from '@emotion/styled';
import { auth, provider, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { Link } from 'react-router-dom';

import './loginCss.css';

function Login() {
  const [user] = useAuthState(auth);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithPopup(provider);
      const uid = result.user.uid;
      const username = result.user.displayName;
  
      // Check if a user document with that UID exists
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        // Save the user's information in Firestore
        await setDoc(userRef, {
          outputs: {
            username: username,
          },
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };  

  return (
    <LoginContainer className='Container '>
      <LoginInnerContainer>
        {user ? (
          <div>
            <div>
            <Link to='/user'>
            <img src={user.photoURL} alt='Profile' className='pfp' />
            </Link>
            </div>
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
