import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './pages/OnboardingScreen';
import HomeScreen from './pages/HomeScreen';

const AppStack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [appIsFirst, setAppIsFirst] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 700));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);        
      }
    }
    prepare();
  }, []); 
  const showHome = useCallback(async () => {
    try {
      await AsyncStorage.setItem("@trippian_first", "true");
      setAppIsFirst(false);
    }
    catch (e) {
      console.warn(e);
    }
  })
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {      
      try {
        // uncomment code to test first time running
        // await AsyncStorage.clear();
        const value = await AsyncStorage.getItem("@trippian_first");
        if (value!==null) {
          setAppIsFirst(false);          
        } else {
          await AsyncStorage.setItem("@trippian_first", "true");
        }
        await SplashScreen.hideAsync();
      }
      catch (e) {
        console.warn(e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  if (appIsFirst) {
    return (<OnboardingScreen onLayout={onLayoutRootView} showHome={showHome}/>);
  } else {
    return (
      <NavigationContainer onLayout={onLayoutRootView} >
        <AppStack.Navigator headermode="none">
          <AppStack.Screen  name="Home" component={HomeScreen} />
        </AppStack.Navigator>
      </NavigationContainer>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
