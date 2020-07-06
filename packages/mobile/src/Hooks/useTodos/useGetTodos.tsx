import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useTodosQuery } from '@StreeterxsTodos/relay';
import { todosState, deviceSelector } from '../../Store';
import { todosParser } from '../../Services';

const useGetTodos = () => {

    
    const fetchTodos = useTodosQuery();
    let myTodosResponse = fetchTodos();

    const device = useRecoilValue(deviceSelector);

    const [todos, setTodos] = useRecoilState(todosState);

    useEffect(() => {
        console.log('device: ', device);
    }, [device]);

    useEffect(() => {
        console.log('myTodosResponse: ', myTodosResponse);
        setTodos(todosParser(myTodosResponse));
    }, [myTodosResponse]);

    return [todos];
};

export default useGetTodos;
