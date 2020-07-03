import react, { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Disposable } from 'react-relay';
import jwt from 'jsonwebtoken';

import { useCreationMutation } from '@StreeterxsTodos/relay';
import { setAuthenticationFnState, getAuthenticationFnState } from '../Store';

type useAuthenticationReturnType = [(authToken: string) => void, () => void, () => boolean];

const useAuthentication = (): useAuthenticationReturnType => {

  // console.log('Rerender use authentication');

  const [setAuthentication] = useRecoilState(setAuthenticationFnState);
  const [getAuthentication] = useRecoilState(getAuthenticationFnState);

  const [userCreationCommitMutation, isInFlight] = useCreationMutation()();

  const logout = useCallback(() => {
      setAuthentication('');
      localStorage.removeItem('authToken');
  }, []);

  const login = useCallback((authToken: string) => {
      setAuthentication(authToken);
      localStorage.setItem('authToken', authToken);
  }, []);

  const isLogged = useCallback(() => {
    return getAuthentication() ? (getAuthentication() as string).length > 0 : false
  }, []);

  const commitUserCreation = (identifier: string) => {
    
    return userCreationCommitMutation({
      variables: {identifier},
      onCompleted: (data) => {

        if (data.UserCreation?.user.identifier) {
          login(data.UserCreation?.user.identifier);
        }
      },
      onError: (err) => {

        logout();
        console.log('error: ', err);
      }
    });
  }


  useEffect(() => {
    // console.log('isLogged: ', isLogged());
    if (!isLogged()) {

      let disposable: Disposable;

      (() => {

        const jwtReturn = jwt.sign({token: 'token'}, process.env.REACT_APP_PRIVATE_KEY as string);
        disposable = commitUserCreation(jwtReturn);
      })();

      if (disposable) {

        return () => disposable.dispose()
      }
    }
  }, []);

  return [
      login,
      logout,
      isLogged
  ];
};

export default useAuthentication;
