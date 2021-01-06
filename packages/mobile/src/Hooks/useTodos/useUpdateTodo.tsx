import React, { useCallback } from 'react';

import { useTodoUpdate } from '@StreeterxsTodos/relay';

const useUpdateTodo = (): [(content: string, id: string) => void, boolean] => {

    const [todoCommitUpdateMutation, todoUpdateIsInFlight] = useTodoUpdate()();

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
