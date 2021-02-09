import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/InitialStackScreens/LoginScreen';
import {LoadingScreen} from "../screens/InitialStackScreens/LoadingScreen";
import {ForgotPasswordScreen} from '../screens/InitialStackScreens/ForgotPasswordScreen';
import {useDispatch} from 'react-redux';
import ToastNotification from '../components/ToastNotification';
import {KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import {CustomBackButton} from "../components/CustomBackButton";
import ErrorBoundary from '../components/ErrorBoundary';
import messaging from '@react-native-firebase/messaging';
import { NotificationList } from "../screens/Notification/NotificationList";
import {FirstLoginScreen} from "../screens/InitialStackScreens/FirstLoginScreen";
import { MainStack } from "./DrawerStack";
import {StudentNotificationList} from "../screens/Student/StudentNotificationList";


const InitialStack = createStackNavigator();

export function InitialStackNavigator({navigation}) {
  const refNotification = useRef();
  const dispatch = useDispatch();

  const handleListenForNotifications = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      messaging().onMessage(async remoteMessage => {
        dispatch({type: 'new_notification'});
        refNotification.current.showToast(remoteMessage);
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        dispatch({type: 'new_notification'});
      });
    }
  }

  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,

    },

  });

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  useEffect(() => {
    handleListenForNotifications()
  }, []);

  return (
    <ErrorBoundary screenType={'initialStack'}>
      <KeyboardAvoidingView
        behavior={"padding"}
        enabled={Platform.OS === "ios"}
        style={{flex: 1}}
      >
        <ToastNotification ref={refNotification} navigation={navigation} />
        <InitialStack.Navigator initialRouteName={'LoadingScreen'}>
          <InitialStack.Screen name={'LoadingScreen'} component={LoadingScreen} options={{
            headerShown: false,
            gesturesEnabled: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}/>

          <InitialStack.Screen name={'LoginScreen'} component={LoginScreen} options={{
            headerShown: false,
            gesturesEnabled: false,
            animationEnabled: false,
          }}/>
          <InitialStack.Screen name={'MainStack'} component={MainStack} options={{
            headerShown: false,
            gesturesEnabled: false,
            animationEnabled: false,
          }}/>

        </InitialStack.Navigator>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
}
