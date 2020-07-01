import { GraphQLObjectType } from "graphql";
import { connectionFromArray } from "graphql-relay";

import { TodosConnection } from "../modules/todos/TodosType";
import { IUser } from "../modules/user/UserModel";
import { todosLoader } from "../modules/todos/TodosLoader";

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Graphql type for queries',
    // TODO correct types
    fields: () => ({
        myTodos: {
            type: TodosConnection,
            resolve: (value, args, {me}: {me: IUser}) => me.todos.map(todo => todosLoader(todo))
        }
    })
});

export default QueryType