import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  BookmarksPage,
  VotePage,
} from 'page';

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
          options={{ title: 'Do you like cat?' }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksPage}
          options={{ title: 'I like cats' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
