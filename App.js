import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './pages/OnboardingScreen';
import HomeScreen from './pages/HomeScreen';

const AppStack = createStackNavigator();



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []); 

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    
    <NavigationContainer onLayout={onLayoutRootView} >

      <AppStack.Navigator headermode="none">
        
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
