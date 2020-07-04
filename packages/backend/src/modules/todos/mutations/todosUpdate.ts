import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { pubsub } from '../../../app';
import { TodosConnection } from '../TodosType';
import { IUser } from '../../user/UserModel';
import { todosLoader } from '../TodosLoader';

const TodosUpdate = mutationWithClientMutationId({
    name: 'TodosUpdate',
    description: 'todos Update',
    inputFields: {
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        todo: {
            type: TodosConnection.edgeType,
            resolve: ({todo, id}) => {

                if (!todo) {

                    return null;
                };

                return {
                    cursor: id,
                    node: todo
                }
            }
        }
    },
    mutateAndGetPayload: async ({content, id}, {me}: {me: IUser}) => {
        try {
            const todoId = fromGlobalId(id);
            const todosFinded = await todosLoader(todoId.id);

            if (todosFinded) {

                todosFinded.content = content;
                await todosFinded.save();
                pubsub.publish('todoUpdated', todosFinded);
                return {todo: todosFinded, id};
            }

            return;
        } catch (err) {

            console.log(err);
        }
    }
});

export default TodosUpdate;
