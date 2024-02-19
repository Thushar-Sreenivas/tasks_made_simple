import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, TouchableOpacity, Animated, View} from 'react-native';
import {Task} from '../types';
import {useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import {useSetRecoilState} from 'recoil';
import {tasksAtom} from '../state/atoms';
import Checkbox from './CheckBox';
import {DustBinIcon} from '../assets/icons';
import {priorityColors} from '../utils/constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {useTheme} from '../hooks/useTheme';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({task}: TaskCardProps) => {
  const bgColorAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setTasks = useSetRecoilState(tasksAtom);
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const handlePress = () => {
    navigation.navigate('TaskDetail', {taskId: task.id});
  };

  useEffect(() => {
    Animated.timing(bgColorAnim, {
      toValue: task.completed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    return () => {
      bgColorAnim.stopAnimation();
    };
  }, [bgColorAnim, task.completed]);

  const handleToggleTask = () => {
    setTasks(currentTasks =>
      currentTasks.map(t =>
        t.id === task.id ? {...t, completed: !t.completed} : t,
      ),
    );
  };

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.cardBackground, '#D6F8D6'],
  });

  const swipeHintAnim = useRef(new Animated.Value(0)).current;

  const onLongPress = () => {
    Animated.sequence([
      Animated.timing(swipeHintAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(swipeHintAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDeleteTask = () => {
    setTasks(currentTasks => currentTasks.filter(t => t.id !== task.id));
  };

  const renderRightActions = (
    progress: any,
    dragX: {
      interpolate: (arg0: {inputRange: number[]; outputRange: number[]}) => any;
    },
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <Animated.View
        style={[styles.animatedContainer, {transform: [{translateX: trans}]}]}
      />
    );
  };

  const cardTranslateX = swipeHintAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  return (
    <>
      <Swipeable
        containerStyle={styles.container}
        onSwipeableOpen={direction =>
          direction === 'right' ? handleDeleteTask() : null
        }
        renderRightActions={renderRightActions}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: backgroundColor,
              transform: [{translateX: cardTranslateX}],
            },
          ]}>
          <View style={styles.content}>
            <Checkbox
              isChecked={task.completed}
              onPress={handleToggleTask}
              color={priorityColors[task.priority]}
            />
            <TouchableOpacity
              onPress={handlePress}
              onLongPress={onLongPress}
              delayPressIn={50}
              accessibilityLabel="Tap to view task details"
              accessibilityRole="button"
              style={styles.touchableArea}>
              <Text
                numberOfLines={3}
                style={[styles.title, task.completed && styles.titleCompleted]}>
                {task.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {task.description}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Swipeable>
      <View style={styles.dustbinIconContainer}>
        <DustBinIcon color={colors.primaryText} />
      </View>
    </>
  );
};

const getStyles = colors =>
  StyleSheet.create({
    container: {
      zIndex: 2,
    },
    animatedContainer: {
      flex: 1,
    },
    card: {
      borderRadius: 10,
      padding: 16,
      marginVertical: 8,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    touchableArea: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primaryText,
      textDecorationLine: 'none',
    },
    titleCompleted: {
      textDecorationLine: 'line-through',
      color: colors.secondaryText,
    },
    description: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    dustbinIconContainer: {
      position: 'absolute',
      right: 0,
      width: '12%',
      height: '100%',
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.priorityHigh,
      width: 100,
      height: '100%',
    },
    deleteButtonText: {
      color: colors.primaryText,
      fontWeight: 'bold',
    },
  });

export default TaskCard;
