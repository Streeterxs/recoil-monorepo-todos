import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { pubsub } from '../../../app';
import TodosType, { TodosConnection } from '../TodosType';
import Todos from '../TodosModel';
import { IUser } from '../../user/UserModel';

const TodosCreation = mutationWithClientMutationId({
    name: 'TodosCreation',
    description: 'todos Creation',
    inputFields: {
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        todo: {
            type: TodosConnection.edgeType,
            resolve: (todo) => {

                if (!todo) {

                    return null;
                };

                return {
                    cursor: toGlobalId('Todos', todo._id),
                    node: todo
                }
            }
        }
    },
    mutateAndGetPayload: async ({content}, {me}: {me: IUser}) => {
        try {

            const todosCreated = new Todos({content});
            await todosCreated.save();

            me.todos.splice(0, 0, `${todosCreated.id}`);
            await me.save();
            pubsub.publish('newTodos', todosCreated);
            return todosCreated;
        } catch (err) {

            console.log(err);
        }
    }
});

export default TodosCreation;