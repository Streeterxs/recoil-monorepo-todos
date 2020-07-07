import React, { useEffect, useCallback } from 'react';
import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { userMeQuery } from './__generated__/userMeQuery.graphql';


const userMeQueryGraphql = graphql`
    query userMeQuery {
        me {
            identifier
        }
    }
`;

const userMeQueryHook = () => {
    const commitMeQuery = useCallback(() => useLazyLoadQuery<userMeQuery>(userMeQueryGraphql, {}, {fetchPolicy: 'store-or-network'}), []);

    useEffect(() => {
        console.log('useEffect userMeQuery');
    });

    return commitMeQuery;

};

export default userMeQueryHook;
