import React, { Suspense, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { TodoCreation, Todos } from '@StreeterxsTodos/shared';

import { RecoilRoot, useRecoilState } from 'recoil';
import { environmentState, todoToEditState } from './Store';
import useTodos, { useAuthentication } from './Hooks';

declare const global: {HermesInternal: null | {}};

const App = () => {

  const [todoToEdit, setTodoToEdit] = useRecoilState(todoToEditState);
  const [login, logout, isLogged] = useAuthentication();

  const [
    todos,
    [
      createTodo,
      todoCreationIsInFlight
    ],
    [
      updateTodo,
      todoUpdateIsInFlight
    ],
    [
      deleteTodo,
      todoDeleteIsInFlight
    ]
  ] = useTodos();

  return (
    <>
      <TodoCreation
      onNewTodo={(todo) => {
        console.log('todo: ', todo);
        createTodo(todo)
      }}
      onTodoEdit={(edited) => {

        console.log(edited);
        if (todoToEdit) {

          updateTodo(edited, todoToEdit.id)
        }
        setTodoToEdit(undefined);
      }}
      todoToEdit={todoToEdit}/>
      <View>
        <Todos
          onTodoDelete={
          (todo) => {

            deleteTodo(todo.id)
          }}
          onTodoEdit={
            (todo) => {

              console.log('todo: ', todo);
              setTodoToEdit(todo)
            }} todos={todos}
          />
      </View>
    </>
  );
};

const AppRoot = () => {

  return (
    <RecoilRoot>
      <AppRelayEnvironmentMidware/>
    </RecoilRoot>
  );
}

const AppRelayEnvironmentMidware = () => {

  const [environment] = useRecoilState(environmentState);

  console.log('environment: ', environment);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={
          <Text>
            is loading...
          </Text>
        }>
        <App/>
      </Suspense>
    </RelayEnvironmentProvider>
  );

}

export default AppRoot;
