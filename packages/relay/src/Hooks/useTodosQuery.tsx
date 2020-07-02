import React, { useEffect, useCallback } from 'react';
import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useTodosQuery } from './__generated__/useTodosQuery.graphql';


const todosFetchQuery = graphql`
    query useTodosQuery {
        myTodos {
            edges {
                cursor
                node {
                    id
                    content
                    createdAt
                    updatedAt
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
`;

const useTodosQueryHook = () => {
    const commitQueryFetch = useCallback(() => useLazyLoadQuery<useTodosQuery>(todosFetchQuery, {}, {fetchPolicy: 'store-or-network'}), []);

    useEffect(() => {
        console.log('useEffect useTodosQuery');
    });

    return commitQueryFetch;

};

export default useTodosQueryHook;
