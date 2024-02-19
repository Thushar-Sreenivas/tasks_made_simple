import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import useClock from '../hooks/useClock';
import {useRecoilValue} from 'recoil';
import {tasksAtom} from '../state/atoms';
import {useTheme} from '@react-navigation/native';
import {DustBinIcon, ListEmptyIcon} from '../assets/icons';
import {isUpcoming} from '../utils/dateHelpers';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const tasks = useRecoilValue(tasksAtom);
  const upcomingTasks = tasks.filter(task =>
    isUpcoming(new Date(task.dueDate)),
  );
  const {colors} = useTheme();

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.iconContainer}>
          <ListEmptyIcon />
        </View>
        <Text style={[styles.emptyText, {color: colors.text}]}>
          No upcoming tasks
        </Text>
      </View>
    );
  };

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
        ListEmptyComponent={ListEmptyComponent}
      />
      <TouchableOpacity
        style={[styles.createTaskButton, {backgroundColor: colors.accent}]}
        onPress={() => navigation.navigate('CreateEditTask')}>
        <DustBinIcon size={24} />
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
  },
  iconContainer: {width: 240, height: 240},
});

export default HomeScreen;
