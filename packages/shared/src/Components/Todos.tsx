import React from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';

import { ITodo } from '../Models/todo';
import Todo from './Todo'

type TodosProps = {
    todos: ITodo[];
}
const Todos = ({todos}: TodosProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={todos} renderItem={({item}) => <Todo key={item.id} todo={item}/>}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

export default Todos;
