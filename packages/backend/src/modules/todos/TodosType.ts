import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInterfaceType } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

import { ITodos } from './TodosModel';
import { nodeInterface } from '../../interfaces/nodeDefinitions';


const TodosType = new GraphQLObjectType<ITodos>({
    name: 'TodosType',
    description: 'Todos type',
    fields: {
        id: globalIdField('Todos'),
        title: {
            type: GraphQLString,
            resolve: (todos) => todos.title
        },
        description: {
            type: GraphQLString,
            resolve: (todos) => todos.description
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
        connectionDefinitions({nodeType: GraphQLNonNull(TodosType)});

export default TodosType;
