import React, { useEffect, useState } from 'react';

import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ITodo } from '../Models';

export type TodoCreationProps = {
    onNewTodo(text: string): void;
    onTodoEdit(text: string): void;
    todoToEdit?: ITodo
};

export type TodoCreationComponent = (props: TodoCreationProps) => any;

const TodoCreation: TodoCreationComponent = ({onNewTodo, onTodoEdit, todoToEdit}) => {

    const [content, setContent] = useState('');

    let textInput: TextInput | null;

    useEffect(() => {
        if (todoToEdit) {
            setContent(todoToEdit?.content);
        }
    }, [todoToEdit])

    const handleOutput = () => {

        if (todoToEdit) {

            onTodoEdit(content);
            setContent('');
            return;
        }

        setContent('');
        onNewTodo(content);
    }
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            ref={input => textInput = input}
            value={content}
            onChangeText={setContent}/>
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
