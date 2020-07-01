import React, { useEffect } from 'react';
import { graphql } from 'react-relay';
import { useMutation } from 'react-relay/hooks';


const userCreationMutation = graphql`
  mutation AppUserCreationMutation($identifier: String!) {
      UserCreation (input: {identifier: $identifier, clientMutationId: '1'}) {
          user {
            identifier
            todos
            createdAt
            updatedAt
          }
      }
  }
`;

const useCreationMutation = () => {
    const [commitMutation, isInFlight] = useMutation(userCreationMutation);

    useEffect(() => {
        console.log('useEffect useCreationMutation');
    });

    return [
        commitMutation,
        isInFlight
    ];

};

export default useCreationMutation;
