import React, { useEffect, useCallback } from 'react';
import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useMeQuery } from './__generated__/useMeQuery.graphql';


const userMeQueryGraphql = graphql`
    query useMeQuery {
        me {
            identifier
        }
    }
`;

export const useMe = () => {
    const commitMeQuery = useCallback(() => useLazyLoadQuery<useMeQuery>(userMeQueryGraphql, {}, {fetchPolicy: 'store-or-network'}), []);

    useEffect(() => {
        console.log('useEffect userMeQuery');
    });

    return commitMeQuery;

};
