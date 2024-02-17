// src/components/TaskCard.tsx
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Task} from '../types';
import {useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import {useSetRecoilState} from 'recoil';
import {tasksAtom} from '../state/atoms';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
  const navigation = useNavigation();
  const isOverdue = task.dueDate ? task.dueDate < new Date() : false;
  const setTasks = useSetRecoilState(tasksAtom);

  const handlePress = () => {
    navigation.navigate('TaskEdit', {taskId: task.id});
  };

  const handleDeleteTask = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () =>
            setTasks(currentTasks =>
              currentTasks.filter(t => t.id !== task.id),
            ),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={handleDeleteTask} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.card, isOverdue && styles.overdue]}
        accessibilityLabel="Tap to view task details"
        accessibilityRole="button">
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        {task.dueDate && (
          <Text style={styles.dueDate}>
            {task.dueDate.toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overdue: {
    backgroundColor: '#FF69B4',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E5E5',
  },
  description: {
    fontSize: 14,
    color: '#E5E5E5',
  },
  dueDate: {
    fontSize: 14,
    color: '#FFD700',
  },
  deleteButton: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default TaskCard;
