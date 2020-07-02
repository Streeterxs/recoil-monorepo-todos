import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInterfaceType } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

import { ITodos } from './TodosModel';
import { nodeInterface } from '../../interfaces/nodeDefinitions';


const TodosType = new GraphQLObjectType<ITodos>({
    name: 'TodosType',
    description: 'Todos type',
    fields: {
        // TODO correct types
        id: globalIdField('Todos'),
        content: {
            type: GraphQLString,
            resolve: (todos) => todos.content
        },
        createdAt: {
            type: GraphQLString,
            resolve: (todos) => todos.createdAt
        },
        updatedAt: {
            type: GraphQLString,
            resolve: (todos) => todos.updatedAt
        }
    },
    interfaces: [nodeInterface as GraphQLInterfaceType]
});

export const {connectionType: TodosConnection} =
        // TODO correct types
        // Don't use GraphQLNonNull or 'undefinedConnection' is created
        connectionDefinitions({nodeType: TodosType});

export default TodosType;
