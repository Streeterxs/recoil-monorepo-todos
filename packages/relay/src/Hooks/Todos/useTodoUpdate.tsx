import React, { useEffect, useCallback } from 'react';
import { graphql, Disposable } from 'react-relay';
import { useMutation } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useTodoUpdateMutation } from './__generated__/useTodoUpdateMutation.graphql';


const todoUpdateMutation = graphql`
    mutation useTodoUpdateMutation($content: String!, $id: String!) {
        TodosUpdate (input: {content: $content, id: $id, clientMutationId: "3"}) {
            todo {
                cursor
                node {
                    id
                    content
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const useTodoUpdate = () => {
    const useTodoUpdateMutationCallback = useCallback(() => useMutation<useTodoUpdateMutation>(todoUpdateMutation), []);

    useEffect(() => {
        console.log('useEffect useTodoUpdateMutation');
    });

    return useTodoUpdateMutationCallback;

};
