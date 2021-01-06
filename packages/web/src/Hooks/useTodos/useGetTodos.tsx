import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useTodosList } from '@StreeterxsTodos/relay';
import { todosState } from '../../Store';
import { todosParser } from '../../Services';

const useGetTodos = () => {
    const fetchTodos = useTodosList();
    const myTodosResponse = fetchTodos();

    const [todos, setTodos] = useRecoilState(todosState);

    useEffect(() => {
        console.log('myTodosResponse: ', myTodosResponse);
        setTodos(todosParser(myTodosResponse));
    }, [myTodosResponse]);

    return [todos];
};

export default useGetTodos;
