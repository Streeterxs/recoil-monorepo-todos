import React, { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { RecordProxy, ConnectionHandler, ROOT_ID } from 'relay-runtime';

import {
    useTodosQuery,
    useTodoCreationMutation,
    useTodoUpdateMutation } from '@StreeterxsTodos/relay';
import { ITodo } from '@StreeterxsTodos/shared/src';

import { todosState } from '../Store';
import { todosParser, todoParser } from '../Services';

const useTodos = (): [ITodo[], (content: string) => void, boolean, (content: string, id: string) => void, boolean] => {
    const fetchTodos = useTodosQuery();
    const myTodosResponse = fetchTodos();

    const [todoCommitCreationMutation, todoCreationIsInFlight] = useTodoCreationMutation()();
    const [todoCommitUpdateMutation, todoUpdateIsInFlight] = useTodoUpdateMutation()();

    const [todos, setTodos] = useRecoilState(todosState);

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

    const updateTodo = useCallback((content: string, id: string) => {

        todoCommitUpdateMutation({
            variables: {
                content,
                id
            },
            onCompleted: (data) => {
                console.log('data created: ', data);
            },
            onError: (err) => {
                console.log('error: ', err);
            }
        })
    }, []);

    useEffect(() => {
        console.log('myTodosResponse: ', myTodosResponse);
        setTodos(todosParser(myTodosResponse));
    }, [myTodosResponse]);


    return [todos, createTodo, todoCreationIsInFlight, updateTodo, todoUpdateIsInFlight];
};

export default useTodos;
