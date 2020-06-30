import React from 'react';

import { View, TextInput } from 'react-native';

export type TodoCreationProps = {
    onNewTodo(): void;
    onTodoEdit(): void;
    todoToEdit?: string
};

export type TodoCreationComponent = (props: TodoCreationProps) => any;

const TodoCreation: TodoCreationComponent = ({onNewTodo, onTodoEdit, todoToEdit}) => {
    console.log('textinput: ', TextInput);

    return (
        <View>
            <TextInput/>
        </View>
    );
};

export default TodoCreation;
