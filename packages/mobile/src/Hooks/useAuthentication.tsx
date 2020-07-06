import react, { useEffect, useCallback } from 'react';
import { Disposable } from 'react-relay';

import { userCreationMutation } from '@StreeterxsTodos/relay';
import { setAuthentication, getAuthentication } from '../Store';
import { Device } from '../Services';

type useAuthenticationReturnType = [(authToken: string) => void, () => void, () => boolean];

const useAuthentication = (): useAuthenticationReturnType => {

  // console.log('Rerender use authentication');

  const [userCreationCommitMutation, isInFlight] = userCreationMutation()();

  const logout = useCallback(() => {
      setAuthentication('');
  }, []);

  const login = useCallback((authToken: string) => {
      setAuthentication(authToken);
  }, []);

  const isLogged = useCallback(() => {
    return getAuthentication() ? (getAuthentication() as string).length > 0 : false
  }, []);

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

    (() => {

      Device.getDevice().then(device => {
        disposable = commitUserCreation(device);
      })
    })();

      return () => {if (disposable) disposable.dispose()}

  }, []);

  return [
      login,
      logout,
      isLogged
  ];
};

export default useAuthentication;
