import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>{item}</Text>

            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 18,
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});