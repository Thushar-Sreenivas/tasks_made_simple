import React, {useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import {useRecoilValue} from 'recoil';
import {tasksAtom} from '../state/atoms';

import {PlusIcon} from '../assets/icons';
import {isUpcoming} from '../utils/dateHelpers';
import {useTheme} from '../hooks/useTheme';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {ListEmptyComponent} from '../components/ListEmptyComponent';

const UpcomingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const tasks = useRecoilValue(tasksAtom);
  const upcomingTasks = useMemo(
    () =>
      tasks.filter(task => task.dueDate && isUpcoming(new Date(task.dueDate))),
    [tasks],
  );

  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.todayText, {color: colors.secondaryText}]}>
          Upcoming
        </Text>
      </View>
      <FlatList
        data={upcomingTasks}
        renderItem={({item}) => <TaskCard task={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <ListEmptyComponent text="No upcoming tasks" color={colors.text} />
        }
      />
      <TouchableOpacity
        style={[styles.createTaskButton, {backgroundColor: colors.accent}]}
        onPress={() =>
          navigation.navigate('CreateEditTask', {taskId: undefined})
        }>
        <PlusIcon color={colors.background} width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  todayText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 20,
  },
  createTaskButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  iconContainer: {width: 240, height: 240},
});

export default UpcomingScreen;
