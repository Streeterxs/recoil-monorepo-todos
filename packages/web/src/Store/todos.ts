import { atom } from "recoil";

import { ITodo } from "@StreeterxsTodos/shared/src";

console.log('entrou módulo store todo');


export const todosState = atom<ITodo[]>({
    key: 'todosState',
    default: []
});

export const todoToEditState = atom<ITodo | undefined>({
    key: 'todoToEditState',
    default: undefined
});
