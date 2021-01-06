import React, { useCallback } from 'react';
import { RecordProxy, ConnectionHandler } from 'relay-runtime';

import { useTodoDelete } from '@StreeterxsTodos/relay';

const useDeleteTodo = (): [(id: string) => void, boolean] => {

    const [todoCommitDeleteMutation, todoDeleteIsInFlight] = useTodoDelete()();


    const deleteTodo = useCallback((id: string) => {

        todoCommitDeleteMutation({
            variables: {
                id
            },
            onCompleted: (data) => {
                console.log('data created: ', data);
            },
            onError: (err) => {
                console.log('error: ', err);
            },
            updater: store => {

                const root = store.getRootField('TodosDelete') as RecordProxy<{}>;
                const todoEdge = root.getLinkedRecord('todo') as RecordProxy<{}>;
                const conn = ConnectionHandler.getConnection(store.getRoot() as RecordProxy<{}>, 'connection_myTodos') as RecordProxy<{}>;
                
                if (!conn) {
                    // eslint-disable-next-line
                    console.log('maybe this connection is not in relay store: ');
                    return;
                }
                
                if (todoEdge) {

                    ConnectionHandler.deleteNode(conn, todoEdge.getValue('cursor') as string);
                }
            }
        })
    }, []);

    return [deleteTodo, todoDeleteIsInFlight];
};

export default useDeleteTodo;