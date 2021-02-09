import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import ToastNotification from '../components/ToastNotification';
import ErrorBoundary from '../components/ErrorBoundary';
import { HomeScreen } from "../screens/HomeScreen";
const MainStack = createStackNavigator();

export function MainStackNavigator({navigation}) {
  const refNotification = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  return (
    <ErrorBoundary screenType={'initialStack'}>
      <ToastNotification ref={refNotification} navigation={(e) => navigation.navigate(e)} />
      <MainStack.Navigator initialRouteName={'HomeScreen'}>

        <MainStack.Screen name={'HomeScreen'} component={HomeScreen} options={{
          headerShown: false,
          gesturesEnabled: false,
          animationEnabled: false,
        }}/>
      </MainStack.Navigator>
    </ErrorBoundary>
  );
}
