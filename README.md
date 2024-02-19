This is a Task Organiser App called TasksMadeSimple, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Implementation Spec for TasksMadeSimple

## Overview
TasksMadeSimple is a productivity app designed to help users manage their daily tasks efficiently. The app provides a clean, intuitive interface that supports light and dark modes and features two main views: Today and Upcoming, to categorize tasks by their due dates. 

## Features
- **Today View**: Displays tasks due today, allowing users to view and complete tasks in a timely manner.
- **Upcoming View**: Shows tasks with future due dates, helping users plan ahead.
- **Swipe to Delete**: Users can easily delete tasks by swiping, providing a smooth, interactive task management experience.
- **Long Press Animation**: Offers a hint animation on long press, suggesting the swipe action for task completion.
- **Task Completion**: Tasks can be marked as completed with an animation changing the task's color to signify its status.
- **Task Creation**: Users can add new tasks using a floating action button.
- **Task Detail View**: Provides detailed information about the task and allows users to edit or delete the task.
- **Dark Mode Toggle**: A drawer feature enabling users to switch between light and dark mode for better visibility according to preference.
- **Feature Roadmap**: A list of upcoming features is provided in the drawer to inform users about future updates.

## Technical Architecture
- **React Native**: The app is built using React Native, enabling cross-platform compatibility while maintaining high performance.
- **Recoil**: Used for state management to handle the app’s dynamic data efficiently.
- **React Navigation**: Manages the app's navigation stack, providing seamless transitions between screens.
- **React Native Reanimated**: Powers the smooth animations throughout the app.
- **DateTimePicker**: Allows users to select due dates for their tasks.

## Future Enhancements
- User Authentication: To enable personalized task management.
- Reminders and Notifications: For timely alerts on task deadlines.
- Customizable Dashboard: Allowing users to personalize their task management interface.
- Collaboration and Sharing: To manage tasks with other users.
- Search and Filters: For efficient retrieval of tasks.
- Analytics and Task Insights: Offering overviews of task completion trends.
- Widget Support: Quick access to tasks from the home screen.
- Cloud Sync: To ensure task data is available across multiple devices.
- Voice Commands: For hands-free task management.
- Internationalization: To support multiple languages.

## Dependencies
- "@react-native-community/datetimepicker": "^7.6.2"
- "@react-navigation/bottom-tabs": "^6.5.12"
- "@react-navigation/drawer": "^6.6.7"
- "@react-navigation/native": "^6.1.10"
- "@react-navigation/native-stack": "^6.9.18"
- "@react-navigation/stack": "^6.3.21"
- "react": "18.2.0"
- "react-native": "0.73.4"
- "react-native-gesture-handler": "^2.15.0"
- "react-native-mmkv": "^2.12.1"
- "react-native-reanimated": "^3.7.0"
- "react-native-safe-area-context": "^4.9.0"
- "react-native-screens": "^3.29.0"
- "react-native-svg": "^14.1.0"
- "react-native-svg-transformer": "^1.3.0"
- "recoil": "^0.7.7"