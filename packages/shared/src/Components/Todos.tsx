import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

import { ITodo } from '../Models/todo';
import Todo from './Todo'

type TodosProps = {
    todos: ITodo[];
    onTodoDelete: (todo: ITodo) => void,
    onTodoEdit: (todo: ITodo) => void
}
const Todos = ({todos, onTodoDelete, onTodoEdit}: TodosProps) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({item}) => <Todo onDeleteButtonClick={onTodoDelete} onEditButtonClick={onTodoEdit} todo={item}/>}
          keyExtractor={item => item.id}/>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: '100%'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

export default Todos;
