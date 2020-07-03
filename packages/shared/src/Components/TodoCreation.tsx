import React from 'react';

import { View, TextInput, Button } from 'react-native';

export type TodoCreationProps = {
    onNewTodo(text: string): void;
    onTodoEdit(text: string): void;
    todoToEdit?: string
};

export type TodoCreationComponent = (props: TodoCreationProps) => any;

const TodoCreation: TodoCreationComponent = ({onNewTodo, onTodoEdit, todoToEdit}) => {

    let textInput: TextInput | null;
    let content = '';

    const handleOutput = () => {

        if (todoToEdit) {

            onTodoEdit(content);
            textInput?.clear();
            todoToEdit = undefined;
            return;
        }

        textInput?.clear();
        onNewTodo(content);
    }
    return (
        <View>
            <TextInput
            ref={input => textInput = input}
            defaultValue={todoToEdit ? todoToEdit : ''}
            onChangeText={(event) => {
                content = event;
            }}/>
            <Button title='Submit' onPress={() => handleOutput()}/>
        </View>
    );
};

export default TodoCreation;
