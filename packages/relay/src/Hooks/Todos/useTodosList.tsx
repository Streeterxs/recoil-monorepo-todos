import React, { useEffect, useCallback } from 'react';
import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';

// to generate this file, yarn relay:build root package.json script must be executed
import { useTodosListQuery } from './__generated__/useTodosListQuery.graphql';


const todosFetchQuery = graphql`
    query useTodosListQuery ($first: Int, $last: Int, $before: String, $after: String) {
        myTodos(
            first: $first,
            last: $last,
            before: $before,
            after: $after
        ) @connection(key: "connection_myTodos") {
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

export const useTodosList = () => {
    const commitQueryFetch = useCallback(() => useLazyLoadQuery<useTodosListQuery>(todosFetchQuery, {
        first: 30,
        last: null,
        before: null,
        after: "opaqueCursor"
    }, {fetchPolicy: 'store-or-network'}), []);

    useEffect(() => {
        console.log('useEffect useTodosQuery');
    });

    return commitQueryFetch;

};
