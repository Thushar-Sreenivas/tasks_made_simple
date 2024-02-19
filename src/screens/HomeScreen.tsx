import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import useClock from '../hooks/useClock';
import {useRecoilValue} from 'recoil';
import {tasksAtom} from '../state/atoms';
import {useTheme} from '@react-navigation/native';
import {PlusIcon} from '../assets/icons';
import {isToday} from '../utils/dateHelpers';

const HomeScreen: React.FC = () => {
  const currentTime = useClock();
  const navigation = useNavigation();
  const tasks = useRecoilValue(tasksAtom);
  const todaysTasks = tasks.filter(task => isToday(new Date(task.dueDate)));
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.todayText, {color: colors.secondaryText}]}>
          Today
        </Text>
        <Text style={[styles.dateText, {color: colors.secondaryText}]}>
          {currentTime}
        </Text>
      </View>
      <FlatList
        data={todaysTasks}
        renderItem={({item}) => <TaskCard task={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.createTaskButton, {backgroundColor: colors.accent}]}
        onPress={() => navigation.navigate('CreateEditTask')}>
        <PlusIcon size={24} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    marginLeft: 7,
    marginTop: 2,
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
});

export default HomeScreen;
