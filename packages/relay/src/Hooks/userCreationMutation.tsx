import React, { useEffect, useCallback } from 'react';
import { graphql, Disposable } from 'react-relay';
import { useMutation } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { userCreationMutation } from './__generated__/userCreationMutation.graphql';


const userCreationMutationGraphQL = graphql`
    mutation userCreationMutation($identifier: String!) {
        UserCreation (input: {identifier: $identifier, clientMutationId: "1"}) {
            user {
                identifier
                createdAt
                updatedAt
            }
        }
    }
`;

const userCreationMutationHook = () => {
    const userCreationMutationCallback = useCallback(() => useMutation<userCreationMutation>(userCreationMutationGraphQL), []);

    useEffect(() => {
        console.log('useEffect useCreationMutation');
    });

    return userCreationMutationCallback;

};

export default userCreationMutationHook;
