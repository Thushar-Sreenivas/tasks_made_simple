import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import TaskCard from '../components/TaskCard';
import useClock from '../hooks/useClock';
import {useRecoilValue} from 'recoil';
import {tasksAtom} from '../state/atoms';

const HomeScreen: React.FC = () => {
  const currentTime = useClock();
  const navigation = useNavigation();
  const tasks = useRecoilValue(tasksAtom);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
      <FlatList
        data={tasks}
        renderItem={({item}) => <TaskCard task={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <Button
        title="Create Task"
        onPress={() => navigation.navigate('CreateTask')}
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
