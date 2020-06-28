import React, { Suspense } from 'react';
import { RelayEnvironmentProvider, useRelayEnvironment } from 'react-relay/hooks';

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
  return (
    <RelayEnvironmentProvider environment={environmentModule(`${config.GRAPHQL_URL}`, '123')}>
      <Suspense fallback="is loading...">
        <App/>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
