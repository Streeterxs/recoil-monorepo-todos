import React from 'react';

import { ITodo } from '../Models/todo';
import { View, Text, StyleSheet } from 'react-native';

type TodoProps = {
    todo: ITodo
}
const Todo = ({todo}: TodoProps) => {
    return (
        <View style={styles.todo}>
            <Text style={styles.todoContent}>{todo.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    todo: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      fontSize: 30
    },
    todoContent: {
        fontSize: 20
    }
});

export default Todo;
