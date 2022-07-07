import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';
import Home from '../screens/Home/Home';
import Details from '../screens/Details/Details';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const routeNameRef = React.useRef<string>('');
  const navigationRef = React.useRef<NavigationContainerRef<any> | null>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef!.current =
          navigationRef.current?.getCurrentRoute()?.name ?? '';
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_class: currentRouteName,
            screen_name: currentRouteName,
          });
        }

        routeNameRef!.current = currentRouteName;
      }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
