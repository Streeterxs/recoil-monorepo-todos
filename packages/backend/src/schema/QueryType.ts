import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import { connectionFromArray } from "graphql-relay";

import { TodosConnection } from "../modules/todos/TodosType";
import { IUser } from "../modules/user/UserModel";
import { todosLoader } from "../modules/todos/TodosLoader";
import { nodeField, nodesField } from "../interfaces/nodeDefinitions";

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Graphql type for queries',
    // TODO correct types
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        myTodos: {
            type: TodosConnection.connectionType,
            args: {
                first: {
                    type: GraphQLInt
                },
                last: {
                    type: GraphQLInt
                },
                before: {
                    type: GraphQLString
                },
                after: {
                    type: GraphQLString
                }
            },
            resolve: (value, args, {me}: {me: IUser}) => {
                console.log('me: ', me);
                return connectionFromArray(me.todos.map(async todo => await todosLoader(todo)), args)
            }
        }
    })
});

export default QueryType;
