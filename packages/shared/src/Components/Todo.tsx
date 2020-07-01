import React from 'react';

import { ITodo } from '../Models/todo';
import { View, Text } from 'react-native';

type TodoProps = {
    todo: ITodo
}
const Todo = ({todo}: TodoProps) => {
    return (
        <View>
            <Text>{todo.content}</Text>
        </View>
    );
};

export default Todo;
