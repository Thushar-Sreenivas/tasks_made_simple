// src/screens/TaskDetailScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {tasksAtom} from '../state/atoms';
import {Task} from '../types';
import {
  useNavigation,
  useRoute,
  RouteProp,
  Theme,
} from '@react-navigation/native';
import {priorityColors} from '../utils/constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {useTheme} from '../hooks/useTheme';

type ParamList = {
  TaskDetail: {
    taskId: string;
  };
};

const TaskDetailScreen: React.FC = () => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksAtom);
  const [task, setTask] = useState<Task | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<ParamList, 'TaskDetail'>>();
  const {colors} = useTheme();
  const styles = getStyles(colors);

  useEffect(() => {
    const taskFound = tasks.find(t => t.id === route.params.taskId);
    if (taskFound) {
      setTask({...taskFound});
    }
  }, [tasks, route.params.taskId]);

  const handleEdit = () => {
    if (task) {
      navigation.navigate('CreateEditTask', {taskId: task.id});
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const updatedTasks = tasks.filter(t => t.id !== task?.id);
          setTasks(updatedTasks);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formatDate = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const getCompletionStatusText = (isCompleted: boolean): string => {
    return isCompleted ? 'Completed' : 'Not Completed';
  };

  const formattedDueDate: string = task.dueDate
    ? formatDate(task.dueDate)
    : 'No due date set';
  const formattedDueTime: string = task.dueDate ? formatTime(task.dueDate) : '';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerLabel}>Title:</Text>
      <Text style={styles.textValue}>{task.title}</Text>

      {task.description ? (
        <>
          <Text style={styles.headerLabel}>Description:</Text>
          <Text style={styles.textValue}>{task.description}</Text>
        </>
      ) : null}
      <Text style={styles.headerLabel}>Status:</Text>
      <Text
        style={[
          styles.textValue,
          task.completed ? styles.completedText : styles.notCompletedText,
        ]}>
        {getCompletionStatusText(task.completed)}
      </Text>

      <Text style={styles.headerLabel}>Priority:</Text>
      <View style={styles.priorityContainer}>
        <View
          style={[
            styles.priorityIndicator,
            {backgroundColor: priorityColors[task.priority]},
          ]}
        />
        <Text style={styles.textValue}>{task.priority}</Text>
      </View>

      <Text style={styles.headerLabel}>Due Date:</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.textValue}>{formattedDueDate}</Text>
        <Text style={styles.textValue}>{formattedDueTime}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.editButton, styles.button]}
          onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteButton, styles.button]}
          onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (colors: Theme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      marginTop: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: colors.background,
    },
    timeContainer: {
      flexDirection: 'row',
    },
    headerLabel: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
      marginTop: 8,
    },
    textValue: {
      fontSize: 16,
      color: colors.text,
      marginRight: 4,
    },
    priorityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    priorityIndicator: {
      width: 20,
      height: 20,
      borderRadius: 12,
      marginRight: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      paddingBottom: 80,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: colors.secondaryText,
    },
    notCompletedText: {
      fontWeight: 'bold',
      color: colors.primaryText,
    },
    button: {
      width: 120,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
      elevation: 3,
    },
    editButton: {
      backgroundColor: '#4CAF50',
    },
    deleteButton: {
      backgroundColor: '#F44336',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
  });

export default TaskDetailScreen;
