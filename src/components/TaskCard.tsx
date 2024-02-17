// src/components/TaskCard.tsx
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Task} from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
  const isOverdue = task.dueDate ? task.dueDate < new Date() : false;

  return (
    <TouchableOpacity
      style={[styles.card, isOverdue && styles.overdue]}
      accessibilityLabel="Tap to view task details"
      accessibilityRole="button">
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      {task.dueDate && (
        <Text style={styles.dueDate}>{task.dueDate.toLocaleDateString()}</Text>
      )}
    </TouchableOpacity>
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
});

export default TaskCard;
