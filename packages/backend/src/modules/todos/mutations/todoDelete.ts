import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, globalIdField } from 'graphql-relay';

import { pubsub } from '../../../app';
import { TodosConnection } from '../TodosType';
import { IUser } from '../../user/UserModel';
import { todosLoader } from '../TodosLoader';

const TodosDelete = mutationWithClientMutationId({
    name: 'TodosDelete',
    description: 'todos delete',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        todo: {
            type: TodosConnection.edgeType,
            resolve: ({todo, id}) => {
                console.log('todo: ', todo);

                return {
                    cursor: id,
                    node: todo
                }
            }
        }
    },
    mutateAndGetPayload: async ({id}, {me}: {me: IUser}) => {
        try {
            const todoId = fromGlobalId(id);
            const todosFinded = await todosLoader(todoId.id);
            const todoIndex = me.todos.indexOf(todoId.id);

            console.log('todosFinded: ', todosFinded);
            console.log('todoIndex: ', todoIndex);

            if (todosFinded && todoIndex >= 0) {

                const todoDeleted = await todosFinded.deleteOne();

                me.todos.splice(todoIndex, 1);
                await me.save();

                console.log('todoDeleted: ', todoDeleted);

                pubsub.publish('todoDeleted', todoDeleted);

                return {todo: todoDeleted, id};
            }

            return;
        } catch (err) {

            console.log('error: ', err);
        }
    }
});

export default TodosDelete;
