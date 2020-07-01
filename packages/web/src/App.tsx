import React, { Suspense, useEffect } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import jwt from 'jsonwebtoken';

import {environmentModule, useCreationMutation} from '@StreeterxsTodos/relay';
import { TodoCreation } from '@StreeterxsTodos/shared';

import config from './config';

const {environment, setAuthentication} = environmentModule(`${config.GRAPHQL_URL}`, JSON.stringify(localStorage.getItem('authToken')));

const authTokenState = atom({
  key: 'authToken',
  default: JSON.stringify(localStorage.getItem('authToken')),
});

function App() {
  const [userCreationCommitMutation, userCreationIsInFlight] = useCreationMutation();
  const [token, setToken] = useRecoilState(authTokenState);

  const commitUserCreation = () => {}

  useEffect(() => {
    setAuthentication(token);
  }, [token]);

  useEffect(() => {
    if (!token) {
      (() => {
        const jwtReturn = jwt.sign({token: 'token'}, process.env.REACT_APP_PRIVATE_KEY as string);
        setToken(jwtReturn);
      })();
    }
  }, []);

  return (
    <div className="App">
      <TodoCreation onNewTodo={() => {}} onTodoEdit={() => {}}/>
    </div>
  );
}

const AppRoot = () => {

  useEffect(() => {
    console.log('Carregou app root!!');
  });

  return (
    <RelayEnvironmentProvider environment={environment}>
      <RecoilRoot>
        <Suspense fallback="is loading...">
          <App/>
        </Suspense>
      </RecoilRoot>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
