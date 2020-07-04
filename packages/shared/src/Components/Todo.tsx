import React from 'react';

import { ITodo } from '../Models/todo';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TodoProps = {
    todo: ITodo,
    onDeleteButtonClick: (todo: ITodo) => void,
    onEditButtonClick: (todo: ITodo) => void
}
const Todo = ({todo, onDeleteButtonClick, onEditButtonClick}: TodoProps) => {
    return (
        <View style={styles.todo}>

            <View style={styles.todoActions}>
                
                <TouchableOpacity style={styles.actionDelete} onPress={() => {onDeleteButtonClick(todo)}}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionEdit} onPress={() => {onEditButtonClick(todo)}}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>

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
      fontSize: 30,
      display: 'flex',
      flexDirection: 'row'
    },
    todoActions: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 10

    },
    actionEdit: {
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6F00',
        borderRadius: 3,
        marginHorizontal: 10,
        width: 70,
        height: 40
    },
    actionDelete: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 3,
        width: 100,
        height: 40

    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    todoContent: {
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Todo;
