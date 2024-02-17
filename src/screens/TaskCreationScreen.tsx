// src/screens/TaskCreationScreen.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {tasksAtom} from '../state/atoms';
import {useNavigation} from '@react-navigation/native';
import {Task} from '../types';

const TaskCreationScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const setTasks = useSetRecoilState(tasksAtom);
  const navigation = useNavigation();

  const handleSaveTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority: 'low',
    };

    setTasks(oldTasks => [...oldTasks, newTask]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter task title"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textarea}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter task description"
        multiline
      />
      <Button title="Save Task" onPress={handleSaveTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 5,
  },
  textarea: {
    height: 100,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});

export default TaskCreationScreen;
