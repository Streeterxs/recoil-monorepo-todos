import React from 'react';

import { View, TextInput, Button, StyleSheet } from 'react-native';

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
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            ref={input => textInput = input}
            defaultValue={todoToEdit ? todoToEdit : ''}
            onChangeText={(event) => {
                content = event;
            }}/>
            <Button title='Submit' onPress={() => handleOutput()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    input: {
        backgroundColor: '#e4e4e4',
        color: '#2a2a2a',
        height: 40,
        marginBottom: 20,
        padding: 20

    }
});

export default TodoCreation;
