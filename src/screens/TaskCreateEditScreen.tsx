// src/screens/TaskCreateEditScreen.tsx
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {tasksAtom} from '../state/atoms';
import {
  RouteProp,
  Theme,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {priorityColors} from '../utils/constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {Task, TaskPriority} from '../types';

type ParamList = {
  CreateEditTask: {
    taskId: string;
  };
};

const TaskCreateEditScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'CreateEditTask'>>();
  const tasks = useRecoilValue(tasksAtom);
  const setTasks = useSetRecoilState(tasksAtom);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [task, setTask] = useState<Task>({
    id: route.params?.taskId || Date.now().toString(),
    title: '',
    description: '',
    priority: TaskPriority.Low,
    dueDate: new Date(),
    completed: false,
  });

  const isEditing = route.params && route.params.taskId;

  useEffect(() => {
    if (isEditing) {
      const taskToEdit = tasks.find(t => t.id === route.params.taskId);
      if (taskToEdit) {
        setTask({...taskToEdit});
      }
    }
  }, [isEditing, route.params, tasks]);

  const handleSaveTask = () => {
    if (!task.title.trim()) {
      Alert.alert('Error', 'Title cannot be empty.');
      return;
    }
    const newTaskList = isEditing
      ? tasks.map(t => (t.id === task.id ? task : t))
      : [...tasks, {...task, id: Date.now().toString()}];

    setTasks(newTaskList);
    navigation.goBack();
  };

  const handleChangeTitle = (text: string) => {
    setTask(prevTask => ({
      ...prevTask,
      title: text,
    }));
  };

  const handleChangeDescription = (text: string) => {
    setTask(prevTask => ({
      ...prevTask,
      description: text,
    }));
  };

  const handlePriorityPress = (newPriority: TaskPriority) => {
    setTask(prevTask => ({
      ...prevTask,
      priority: newPriority,
    }));
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate || task.dueDate;
    setShowDatePicker(Platform.OS === 'ios');
    setTask(prevTask => ({
      ...prevTask,
      dueDate: currentDate,
    }));
  };

  const minimumDate = new Date();
  const styles = getStyles(colors);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.label, {color: colors.text}]}>Title:</Text>
      <TextInput
        style={[styles.input, {borderColor: colors.border, color: colors.text}]}
        onChangeText={handleChangeTitle}
        value={task.title}
        placeholder="Enter task title"
        placeholderTextColor={colors.text}
        scrollEnabled
      />
      <Text style={[styles.label, {color: colors.text}]}>Description:</Text>
      <TextInput
        style={[
          styles.textarea,
          {borderColor: colors.border, color: colors.text},
        ]}
        onChangeText={handleChangeDescription}
        value={task.description}
        placeholder="Enter task description"
        placeholderTextColor={colors.text}
        scrollEnabled
        multiline
      />
      <Text style={[styles.label, {color: colors.text}]}>Priority:</Text>
      <View style={styles.priorityContainer}>
        {Object.keys(priorityColors).map(p => (
          <TouchableOpacity
            key={p}
            style={[
              styles.priorityButton,
              {
                backgroundColor:
                  task.priority === p ? priorityColors[p] : colors.background,
              },
            ]}
            onPress={() => handlePriorityPress(p)}>
            <Text style={{color: colors.text}}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.label, {color: colors.text}]}>Due Date:</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}>
        <Text style={{color: colors.text}}>
          {task.dueDate ? new Date(task.dueDate).toDateString() : 'No date set'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={task.dueDate || new Date()}
          mode="date"
          display={'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          textColor={colors.text}
          style={{backgroundColor: colors.background}}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: Theme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: colors.text,
    },
    input: {
      marginBottom: 20,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
    },
    textarea: {
      height: 100,
      marginBottom: 20,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderWidth: 1,
      borderRadius: 8,
      textAlignVertical: 'top',
      backgroundColor: colors.card,
      color: colors.text,
    },
    saveButton: {
      height: 48,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
      marginTop: 24,
    },
    saveButtonText: {
      fontSize: 14,
      color: 'white',
      fontFamily: 'Roboto-Medium',
    },
    priorityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    priorityButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 8,
      marginHorizontal: 4,
    },
  });
export default TaskCreateEditScreen;
