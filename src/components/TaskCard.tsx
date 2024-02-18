import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity, Animated, View} from 'react-native';
import {Task} from '../types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import {useSetRecoilState} from 'recoil';
import {tasksAtom} from '../state/atoms';
import Checkbox from './CheckBox';
import {DustBinIcon} from '../assets/icons';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({task}: TaskCardProps) => {
  const [bgColorAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const setTasks = useSetRecoilState(tasksAtom);
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const handlePress = () => {
    navigation.navigate('CreateEditTask', {taskId: task.id});
  };

  useEffect(() => {
    Animated.timing(bgColorAnim, {
      toValue: task.completed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [task.completed, bgColorAnim]);

  const handleToggleTask = () => {
    setTasks(currentTasks =>
      currentTasks.map(t =>
        t.id === task.id ? {...t, completed: !t.completed} : t,
      ),
    );
  };

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#8A2BE2', '#D6F8D6'],
  });

  const swipeHintAnim = useState(new Animated.Value(0))[0]; // Starting at 0

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

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}} />
    );
  };

  const cardTranslateX = swipeHintAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  return (
    <>
      <Swipeable
        containerStyle={{zIndex: 2}}
        onSwipeableOpen={direction =>
          direction === 'right' ? handleDeleteTask() : null
        }
        renderRightActions={renderRightActions}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBackground,
              transform: [{translateX: cardTranslateX}],
            },
          ]}>
          <View style={styles.content}>
            <Checkbox isChecked={task.completed} onPress={handleToggleTask} />
            <TouchableOpacity
              onPress={handlePress}
              onLongPress={onLongPress}
              delayPressIn={50}
              accessibilityLabel="Tap to view task details"
              accessibilityRole="button"
              style={styles.touchableArea}>
              <Text numberOfLines={3} style={styles.title}>
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
        <DustBinIcon />
      </View>
    </>
  );
};

const getStyles = colors =>
  StyleSheet.create({
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
