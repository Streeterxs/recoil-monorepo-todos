import React, { Suspense, useEffect } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import {TextInput, View} from 'react-native';

import environmentModule from '@StreeterxsTodos/relay';
import { TodoCreation } from '@StreeterxsTodos/shared';

import config from './config';

function App() {
  console.log('TodoCreation: ', TodoCreation);
  return (
    <div className="App">
      <TodoCreation onNewTodo={() => {}} onTodoEdit={() => {}}/>
      <View>
        <TextInput/>
      </View>
    </div>
  );
}

const AppRoot = () => {
  const environment = environmentModule(`${config.GRAPHQL_URL}`, '123')

  useEffect(() => {
    console.log('environment: ', environment);
  });

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="is loading...">
        <App/>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
