import react, { useEffect, useCallback, useMemo } from 'react';
import { Disposable } from 'react-relay';

import { useUserCreation, useMe } from '@StreeterxsTodos/relay';
import { setAuthentication, getAuthentication, deviceSelector } from '../Store';
import { Device } from '../Services';
import { useRecoilValue } from 'recoil';

type useAuthenticationReturnType = [(authToken: string) => void, () => void, () => boolean];

const useAuthentication = (): useAuthenticationReturnType => {

  // console.log('Rerender use authentication');

  const logout = useCallback(() => {
      setAuthentication('');
  }, []);

  const login = useCallback((authToken: string) => {
      setAuthentication(authToken);
  }, []);

  const isLogged = useCallback(() => {
    return getAuthentication() ? (getAuthentication() as string).length > 0 : false
  }, []);

  const device = useRecoilValue(deviceSelector);

  const [userCreationCommitMutation, isInFlight] = useUserCreation()();
  const { me } = useMe()();

  const commitUserCreation = useCallback((identifier: string) => {
    
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
  }, []);

  useEffect(() => {

    let disposable: Disposable;
    if (!me) {
  
      (() => {
        commitUserCreation(device);
      })();

    }

    return () => { if (disposable) disposable.dispose() }
  }, []);

  return [
      login,
      logout,
      isLogged
  ];
};

export default useAuthentication;
