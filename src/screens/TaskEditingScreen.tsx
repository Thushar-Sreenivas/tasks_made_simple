// src/screens/TaskEditingScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {tasksAtom} from '../state/atoms';
import {Task} from '../types';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

type ParamList = {
  TaskEdit: {
    taskId: string;
  };
};

const TaskEditingScreen: React.FC = () => {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'TaskEdit'>>();

  useEffect(() => {
    const task = tasks.find(t => t.id === route.params.taskId);
    if (task) {
      setEditedTask({...task});
    }
  }, [tasks, route.params.taskId]);

  const handleSave = () => {
    if (!editedTask) {
      return;
    }
    const updatedTasks = tasks.map(task =>
      task.id === editedTask.id ? editedTask : task,
    );
    setTasks(updatedTasks);
    navigation.goBack();
  };

  if (!editedTask) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={editedTask.title}
        onChangeText={text =>
          setEditedTask(prev => (prev ? {...prev, title: text} : null))
        }
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textarea}
        value={editedTask.description}
        onChangeText={text =>
          setEditedTask(prev => (prev ? {...prev, description: text} : null))
        }
        multiline
      />
      <Button title="Save" onPress={handleSave} />
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

export default TaskEditingScreen;
