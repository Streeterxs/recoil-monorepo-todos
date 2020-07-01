import React from 'react';
import { FlatList, Text } from 'react-native';

import { ITodo } from '../Models/todo';
import Todo from './Todo'

type TodosProps = {
    todos: ITodo[];
}
const Todos = ({todos}: TodosProps) => {
    return (
        <FlatList data={todos} renderItem={({item}) => <Todo todo={item}/>}/>
    );
};

export default Todos;
