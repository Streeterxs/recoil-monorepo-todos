// to generate this file, yarn relay:build root package.json script must be executed
import { useTodosQueryResponse } from "@StreeterxsTodos/relay/src/Hooks/__generated__/useTodosQuery.graphql";
import { ITodo } from "@StreeterxsTodos/shared/src";

export function todosParser(todosGraphql: useTodosQueryResponse): ITodo[] {
    
    return todosGraphql.myTodos?.edges ?
        todosGraphql.myTodos?.edges.map(edge => todoParser(edge?.node)) :
        []
};

export function todoParser(todoGraphql: {
        readonly id: string;
        readonly content: string | null;
        readonly createdAt: string | null;
        readonly updatedAt: string | null;
    } | null | undefined): ITodo {

        return {
            id: todoGraphql?.id ? todoGraphql?.id  : '',
            content: todoGraphql?.content ? todoGraphql?.content : '',
            createdAt: todoGraphql?.createdAt ? +todoGraphql?.createdAt : 0,
            updatedAt: todoGraphql?.updatedAt ? +todoGraphql?.updatedAt : 0
        }
    }