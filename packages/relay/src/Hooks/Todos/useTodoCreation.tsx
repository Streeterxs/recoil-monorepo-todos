import React, { useEffect, useCallback } from 'react';
import { graphql } from 'react-relay';
import { useMutation } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useTodoCreationMutation } from './__generated__/useTodoCreationMutation.graphql';


const todoCreationMutation = graphql`
    mutation useTodoCreationMutation($content: String!) {
        TodosCreation (input: {content: $content, clientMutationId: "2"}) {
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

export const useTodoCreation = () => {
    const useTodoCreationMutationCallback = useCallback(() => useMutation<useTodoCreationMutation>(todoCreationMutation), []);

    useEffect(() => {
        console.log('useEffect useCreationMutation');
    });

    return useTodoCreationMutationCallback;
};
