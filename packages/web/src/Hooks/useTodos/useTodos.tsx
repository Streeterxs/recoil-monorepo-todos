import React, { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { RecordProxy, ConnectionHandler, ROOT_ID } from 'relay-runtime';

import {
    useTodosQuery,
    useTodoCreationMutation,
    useTodoUpdateMutation, 
    useTodoDeleteMutation} from '@StreeterxsTodos/relay';
import { ITodo } from '@StreeterxsTodos/shared/src';

import useCreateTodo from './useCreateTodo';
import useGetTodos from './useGetTodos';
import useDeleteTodo from './useDeleteTodo';
import useUpdateTodo from './useUpdateTodo';

const useTodos = (): [
        ITodo[],
        [(content: string) => void, boolean],
        [(content: string, id: string) => void, boolean],
        [(id: string) => void, boolean]
    ] => {

    const [todos] = useGetTodos();
    const [createTodo, todoCreationIsInFlight] = useCreateTodo();
    const [updateTodo, todoUpdateIsInFlight] = useUpdateTodo();
    const [deleteTodo, todoDeleteIsInFlight] = useDeleteTodo();


    return [
        todos,
        [createTodo, todoCreationIsInFlight],
        [updateTodo, todoUpdateIsInFlight],
        [deleteTodo, todoDeleteIsInFlight]
    ];
};

export default useTodos;
