import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BookmarksPage,
  VotePage,
} from 'page';
import { ImageViewerPage } from 'page/ImageViewerPage';

const Tab = createBottomTabNavigator();

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
          component={BookmarksPage}
          options={{ tabBarIcon: (props) => <Ionicons name="heart-circle-outline" {...props} />, tabBarLabel: () => <></>, title: 'I like cats' }}
        />
        <Tab.Screen
          name="ImageViewer"
          component={ImageViewerPage}
          options={{ tabBarIcon: (props) => <Ionicons name="ios-list" {...props} />, headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
