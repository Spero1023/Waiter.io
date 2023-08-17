import React from 'react';
import styled from '@emotion/styled';
import { auth, provider, signOut } from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import './loginCss.css';

function Login() {
  const [user] = useAuthState(auth);

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
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
