import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BookmarksPage,
  VotePage,
  ImageViewerPage,
} from 'page';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BookmarksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksPage}
        options={{ title: 'I like cats' }}
      />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewerPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Vote"
      >
        <Tab.Screen
          name="Vote"
          component={VotePage}
          options={{ tabBarIcon: (props) => <Ionicons name="ios-logo-octocat" {...props} />, tabBarLabel: () => <></>, title: 'Do you like cat?' }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksStack}
          options={{ tabBarIcon: (props) => <Ionicons name="heart-circle-outline" {...props} />, tabBarLabel: () => <></>, headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
