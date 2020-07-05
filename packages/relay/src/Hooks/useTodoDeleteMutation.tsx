import React, { useEffect, useCallback } from 'react';
import { graphql } from 'react-relay';
import { useMutation } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useTodoDeleteMutation } from './__generated__/useTodoDeleteMutation.graphql';


const todoDeleteMutation = graphql`
    mutation useTodoDeleteMutation($id: String!) {
        TodosDelete (input: {id: $id, clientMutationId: "4"}) {
            todo {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

const useTodoDeleteMutationHook = () => {
    const useTodoDeleteMutationCallback = useCallback(() => useMutation<useTodoDeleteMutation>(todoDeleteMutation), []);

    useEffect(() => {
        console.log('useEffect useTodoDeleteMutation');
    });

    return useTodoDeleteMutationCallback;

};

export default useTodoDeleteMutationHook;
