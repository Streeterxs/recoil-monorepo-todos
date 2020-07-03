import { GraphQLObjectType, GraphQLString } from 'graphql';

import { IUser } from './UserModel';
import { TodosConnection } from '../todos/TodosType';
import { todosLoader } from '../todos/TodosLoader';
import { connectionArgs, connectionFromArray } from 'graphql-relay';


const userType = new GraphQLObjectType<IUser>({
    name: 'UserType',
    description: 'User type',
    // TODO correct types
    fields: () => (
        {
            identifier: {
                type: GraphQLString,
                resolve: (user) => user.identifier
            },
            todos: {
                type: TodosConnection.connectionType,
                args: connectionArgs,
                resolve: (user, args) => connectionFromArray(user.todos.map(todo => todosLoader(todo)), args)
            },
            createdAt: {
                type: GraphQLString,
                resolve: (user) => user.createdAt
            },
            updatedAt: {
                type: GraphQLString,
                resolve: (user) => user.updatedAt
            }
        }
    )
});

export default userType;
