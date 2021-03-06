import React, { useCallback } from 'react';

import { useTodoCreation } from '@StreeterxsTodos/relay';
import { RecordProxy, ConnectionHandler } from 'relay-runtime';

const useCreateTodo = (): [(content: string) => void, boolean] => {

    const [todoCommitCreationMutation, todoCreationIsInFlight] = useTodoCreation()();


    const createTodo = useCallback((content: string) => {

        todoCommitCreationMutation({
            variables: {
                content
            },
            onCompleted: (data) => {
                console.log('data created: ', data);
            },
            onError: (err) => {
                console.log('error: ', err);
            },
            updater: store => {

                const todoEdge = (store.getRootField('TodosCreation') as RecordProxy<{}>).getLinkedRecord('todo') as RecordProxy<{}>;
                const conn = ConnectionHandler.getConnection(store.getRoot() as RecordProxy<{}>, 'connection_myTodos') as RecordProxy<{}>;
                
                if (!conn) {
                    // eslint-disable-next-line
                    console.log('maybe this connection is not in relay store: ');
                    return;
                }
                if (todoEdge) {
                    ConnectionHandler.insertEdgeBefore((conn), todoEdge);
                }
            }
        })
    }, []);

    return [createTodo, todoCreationIsInFlight]
};

export default useCreateTodo;
