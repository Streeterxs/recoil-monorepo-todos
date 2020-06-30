import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { pubsub } from '../../../app';
import TodosType from '../TodosType';
import Todos from '../TodosModel';
import { IUser } from '../../user/UserModel';

const todosCreation = mutationWithClientMutationId({
    name: 'todosCreation',
    description: 'todos Creation',
    inputFields: {
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        todos: {
            type: new GraphQLNonNull(TodosType),
            resolve: (todos) => todos
        }
    },
    mutateAndGetPayload: async ({title, description}, {user}: {user: IUser}) => {
        try {

            const todosCreated = new Todos({title, description});
            await todosCreated.save();

            user.todos.push(`${todosCreated.id}`);
            await user.save();
            pubsub.publish('newTodos', todosCreated);
            return todosCreated;
        } catch (err) {

            console.log(err);
        }
    }
});

export default todosCreation;