import React, { Suspense, useEffect } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { RecoilRoot, useRecoilState } from 'recoil';

import { useTodosQuery } from '@StreeterxsTodos/relay';
import { TodoCreation } from '@StreeterxsTodos/shared';
import { useAuthentication } from './Hooks';
import { environmentState } from './Store';

function App() {

  console.log('Rerender app');

  const [login, logout, isLogged] = useAuthentication();
  const fetchTodos = useTodosQuery();
  const { myTodos } = fetchTodos();

  // useEffect(() => {console.log('my todos change');}, [myTodos]);

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
    <RecoilRoot>
      <AppRelayEnvironmentMidware/>
    </RecoilRoot>
  );
}

const AppRelayEnvironmentMidware = () => {
  console.log('Rerender relay environment app');
  const [environment] = useRecoilState(environmentState);

  useEffect(() => {
    console.log('Carregou app relay midware!!');
  });

  useEffect(() => {console.log('environment change');}, [environment]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="is loading...">
        <App/>
      </Suspense>
    </RelayEnvironmentProvider>
  );

}

export default AppRoot;
