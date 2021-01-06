import React, { useEffect, useCallback } from 'react';
import { graphql, Disposable } from 'react-relay';
import { useMutation } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useUserCreationMutation } from './__generated__/useUserCreationMutation.graphql';


const userCreationMutationGraphQL = graphql`
    mutation useUserCreationMutation($identifier: String!) {
        UserCreation (input: {identifier: $identifier, clientMutationId: "1"}) {
            user {
                identifier
                createdAt
                updatedAt
            }
        }
    }
`;

export const useUserCreation = () => {
    const userCreationMutationCallback = useCallback(() => useMutation<useUserCreationMutation>(userCreationMutationGraphQL), []);

    useEffect(() => {
        console.log('useEffect useCreationMutation');
    });

    return userCreationMutationCallback;

};

