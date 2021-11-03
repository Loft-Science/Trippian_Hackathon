import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './pages/OnboardingScreen';
import HomeScreen from './pages/HomeScreen';

const AppStack = createStackNavigator();

console.ignoredYellowBox = [
  'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
];



export default function App() {
  

  return (
    
    <NavigationContainer  >

      <AppStack.Navigator screenOptions={{
              headerShown: false
            }}>
        
        <AppStack.Screen  name="Onboarding" component={OnboardingScreen} />
        <AppStack.Screen  name="Home" component={HomeScreen} />

      </AppStack.Navigator>
    </NavigationContainer>  

    
    
    /* <View style={styles.container} onLayout={onLayoutRootView}>
        <Text>Open up App.js to start working on your app!</Text>
        
      </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
