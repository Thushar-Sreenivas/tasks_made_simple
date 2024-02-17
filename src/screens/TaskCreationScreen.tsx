// src/screens/TaskCreationScreen.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const TaskCreationScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveTask = () => {
    // Logic to save the task
    console.log('Task Saved:', title, description);
    // Navigate back to the Home Screen or show success message
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
