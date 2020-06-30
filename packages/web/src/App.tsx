import React, { Suspense, useEffect } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import environmentModule from '@StreeterxsTodos/relay';

import logo from './logo.svg';
import './App.css';
import config from './config';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
