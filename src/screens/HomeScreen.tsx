import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TaskCard from '../components/TaskCard';
import useClock from '../hooks/useClock';
import {Task} from '../types';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Finish React Native Project',
    description: 'Implement all pending features and fix bugs.',
    dueDate: new Date(new Date().getTime() + 86400000),
    priority: 'high',
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    description: 'Milk, Eggs, Bread, and Butter.',
    priority: 'low',
  },
  // Add more tasks as needed
];

const HomeScreen: React.FC = () => {
  const currentTime = useClock();

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
      <FlatList
        data={mockTasks}
        renderItem={({item}) => <TaskCard task={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
