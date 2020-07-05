import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useTodosQuery } from '@StreeterxsTodos/relay';
import { todosState } from '../../Store';
import { todosParser } from '../../Services';

const useGetTodos = () => {
    const fetchTodos = useTodosQuery();
    const myTodosResponse = fetchTodos();

    const [todos, setTodos] = useRecoilState(todosState);

    useEffect(() => {
        console.log('myTodosResponse: ', myTodosResponse);
        setTodos(todosParser(myTodosResponse));
    }, [myTodosResponse]);

    return [todos];
};

export default useGetTodos;
