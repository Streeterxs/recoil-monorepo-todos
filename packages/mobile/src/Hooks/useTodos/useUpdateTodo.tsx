import React, { useCallback } from 'react';

import { useTodoUpdateMutation } from '@StreeterxsTodos/relay';

const useUpdateTodo = (): [(content: string, id: string) => void, boolean] => {

    const [todoCommitUpdateMutation, todoUpdateIsInFlight] = useTodoUpdateMutation()();

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

    return [updateTodo, todoUpdateIsInFlight];
};

export default useUpdateTodo;
