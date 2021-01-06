import React, { Suspense, useEffect } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { RecoilRoot, useRecoilState } from 'recoil';

import { TodoCreation, Todos } from '@StreeterxsTodos/shared';
import { useAuthentication } from './Hooks';
import { environmentState, todoToEditState } from './Store';
import useTodos from './Hooks/useTodos';

function App() {
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

  // useEffect(() => {console.log('useEffect app')});

  return (
    <div className="App">
      <TodoCreation
      onNewTodo={createTodo}
      onTodoEdit={(edited) => {

        console.log(edited);
        if (todoToEdit) {

          updateTodo(edited, todoToEdit.id)
        }
        setTodoToEdit(undefined);
      }}
      onClear={() => {
        setTodoToEdit(undefined)
      }}
      todoToEdit={todoToEdit}/>
      <div>
        <Todos onTodoDelete={(todo) => {
          deleteTodo(todo.id)
        }} onTodoEdit={(todo) => {
          console.log('todo: ', todo);
          setTodoToEdit(todo)
          }} todos={todos}/>
      </div>
    </div>
  );
}

const AppRoot = () => {

  useEffect(() => {
    // console.log('Carregou app root!!');
  });

  return (
    <RecoilRoot>
      <AppRelayEnvironmentMidware/>
    </RecoilRoot>
  );
}

const AppRelayEnvironmentMidware = () => {
  //console.log('Rerender relay environment app');
  const [environment] = useRecoilState(environmentState);

  useEffect(() => {
    // console.log('Carregou app relay midware!!');
  });

  // useEffect(() => {console.log('environment change');}, [environment]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="is loading...">
        <App/>
      </Suspense>
    </RelayEnvironmentProvider>
  );

}

export default AppRoot;
